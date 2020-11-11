export function createTeams(participants) {
  const pools = initPools(participants);
  const singles = sortSingles(pools.singles);
  const doubles = sortDoubles(pools.doubles);
  const triples = pools.triples; // no need to sort these
  const lengths = new Map();
  lengths.set(singles, measureSingles(singles));
  // Singles mode - create as many teams as the least populated role.
  const teams = singlesMode(singles, lengths.get(singles));
  doublesMode(singles, doubles, teams, lengths);
  triplesMode(singles, doubles, triples, teams, lengths);
  const angels = compileAngels(singles);
  addTeamNumbers(teams);
  return {teams, angels};
}

function compileAngels(singles) {
  const array = [];
  Object.values(singles).forEach(list => {
    while(list.length > 0) array.push(list.pop())
  })
  return array;
}

function addTeamNumbers(teams) {
  teams.forEach((team, index) => {
    team.number = index + 1;
  })
}

function singlesMode(singles, lengths) {
  const array = [];
  while (singles[lengths.shortest].length > 0) {
    array.push(createTeamFromSingles(singles));
  }
  return array;
}

// While all singles > 0, create team
// If not, repopulate zero single with longest-alt double
// counting both singles and doubles. In a doubles tie, use the one with the most singles
// note this tie-break not implemented yet... might not be necessary?
function doublesMode(singles, doubles, teams, lengths) {
  while (singles.music.length > 0 && singles.lyrics.length > 0 && singles.vocals.length > 0) {
    const team = createTeamFromSingles(singles);
    teams.push(team);
  }
  // now a single is zero and needs to be repopulated from a double
  // identify most populated role from doubles
  // break tie using most singles
  const success = populateSingleFromDoubles(lengths, singles, doubles);
  // if sufficient doubles, recall doublesMode recursively, else return.
  if (success) doublesMode(singles, doubles, teams, lengths);
  return;
}

function triplesMode(singles, doubles, triples, teams, lengths) {
  // populateSingleFromTriple
  while (singles.music.length > 0 && singles.lyrics.length > 0 && singles.vocals.length > 0) {
    const team = createTeamFromSingles(singles);
    teams.push(team);
  }
  const success = populateSingleFromTriples(lengths, singles, doubles, triples)
  doublesMode(singles, doubles, teams, lengths);
  if (success) triplesMode(singles, doubles, triples, teams, lengths);
}

function populateSingleFromTriples(lengths, singles, doubles, triples) {
  lengths.set(singles, measureSingles(singles));
  const shortest = lengths.get(singles).shortest;
  if (triples.length > 0) {
    let user = triples.shift();
    user = removeUnusedRoles(user, shortest);
    singles[shortest].unshift(user);
    return true;
  } else {
    return false;
  }
}

function populateSingleFromDoubles(lengths, singles, doubles) {
  lengths.set(singles, measureSingles(singles));
  lengths.set(doubles, measureDoubles(doubles));
  const totals = measureTotals(lengths, singles, doubles);
  const shortest = lengths.get(singles).shortest;
  // still need a tiebreaker here... unsure if it matters yet though
  const longest = identifyMostCommonFromTotals(totals);
  let doubleKey = identifyDoubleFromShortestAndLongest(doubles, shortest, longest);
  if (doubles[doubleKey].length <= 0) doubleKey = identifyMiddlestDoubleFromShortestAndLongest(doubles, shortest, longest);
  if (doubles[doubleKey].length > 0) {
    let user = doubles[doubleKey].shift();
    user = removeUnusedRoles(user, shortest);
    singles[shortest].unshift(user);
    return true;
  } else {
    return false;
  }
}

function removeUnusedRoles(user, shortest) {
  const roles = user.roles.filter(role => role === shortest);
  user.roles = [roles[0]];
  return user;
}

// return total qtys for single + doubles
function measureTotals(lengths, singles, doubles) {
  const totals = {};
  for (const [key, value] of Object.entries(lengths.get(doubles))) {
    totals[key] = value;
  }
  for (const [key, value] of Object.entries(singles)) {
    totals[key] += value.length;
  }
  return totals;
}

function identifyMostCommonFromTotals(totals) {
  const longest = Object.entries(totals).reduce((a, b) => a[1] < b[1] ? b : a)[0];
  return longest;
}

function identifyDoubleFromShortestAndLongest(doubles, shortest, longest) {
  for (const key of Object.keys(doubles)) {
    if (key.includes(shortest) && key.includes(longest)) {
      return key;
    }
  }
}

function identifyMiddlestDoubleFromShortestAndLongest(doubles, shortest, longest) {
  for (const key of Object.keys(doubles)) {
    if (key.includes(shortest) && !key.includes(longest)) {
      return key;
    }
  }
}

// separate users by how many roles they signed up for
function initPools(participants) {
  const singles = [];
  const doubles = [];
  const triples = [];
  while (participants.length > 0) {
    const user = participants.shift();
    switch (user.roles.length) {
      case 1: singles.push(user); break;
      case 2: doubles.push(user); break;
      case 3: triples.push(user);
    }
  }
  return { singles, doubles, triples };
}

// sort singles by their role signed up for
function sortSingles(singles) {
  const obj = {
    music: [],
    lyrics: [],
    vocals: []
  }
  while (singles.length > 0) {
    const user = singles.shift();
    obj[user.roles[0]].push(user);
  }
  return obj;
}

// sort doubles by their roles signed up for
// 
function sortDoubles(doubles) {
  const obj = {
    musiclyrics: [],
    musicvocals: [],
    vocalslyrics: []
  }
  while (doubles.length > 0) {
    const user = doubles.shift();
    if (!user.roles.includes('vocals')) obj.musiclyrics.push(user);
    if (!user.roles.includes('lyrics')) obj.musicvocals.push(user);
    if (!user.roles.includes('music')) obj.vocalslyrics.push(user);
  }
  return obj;
}

// measure the length of each single role list
function measureSingles(singles) {
  const shortest = Object.entries(singles).reduce((a, b) => a[1].length < b[1].length ? a : b)[0];
  const longest = Object.entries(singles).reduce((a, b) => a[1].length < b[1].length ? b : a)[0];
  const [middlest] = Object.keys(singles).filter(key => key !== shortest && key !== longest);
  return { shortest: shortest, middlest: middlest, longest: longest };
}

function measureDoubles(doubles) {
  const roles = ['music', 'lyrics', 'vocals'];
  const lengths = {};
  roles.forEach(role => {
    lengths[role] = 0;
    for (const [key, value] of Object.entries(doubles)) {
      if (key.includes(role)) lengths[role] += value.length;
    }
  })
  return lengths;
}

function createTeamFromSingles(singles) {
  const pools = Object.values(singles);
  const team = { members: []};
  pools.forEach(pool => {
    const user = pool.pop();
    team.members.push(user);
  })
  return team;
}