export function constructWinnersThread(winners, teams) {
  const lines = constructHeader();
  const awardLines = constructRoleWinners(winners, teams);
  lines.push(...awardLines);
  return lines.join('\n');
}

function constructRoleWinners(winners, teams) {
  const lines = [];
  for (const [role, songs] of Object.entries(winners)) {
    songs.forEach(song => {
      if (role === 'track') {
        if (+song.teamnumber > 0) {
          const line = constructTrackWinner(song, teams);
          addLineToLines(line, lines);
        } else {
          const line = constructTrackWinnerWithoutTeam(song);
          addLineToLines(line, lines);
        }
      } else {
        if (+song.teamnumber > 0) {
          const line = constructRoleWinner(song, role, teams);
          addLineToLines(line, lines);
        } else {
          const line = constructRoleWinnerWithoutUser(song, role);
          addLineToLines(line, lines);
        }
      }
    })
  }
  return lines;
}

function constructRoleWinner(song, role, teams) {
  console.log("With user", song, role, teams)
  return 'Not implemented yet';
}

function constructRoleWinnerWithoutUser(song, role) {
  const key = convertRoleToKey(role);
  console.log("Constructing a song without a user", song, role);
  return `[*${song.name}*](${song.url} "Award ${key}")`;
}

function constructTrackWinner(song, teams) {
  console.log(song, teams);
}

function constructTrackWinnerWithoutTeam(song) {
  return `[${song.name}](${song.url} "Award Track")`;
}

function convertRoleToKey(role) {
  let key;
  switch (role) {
    case 'track': key = 'Track'; break;
    case 'music': key = 'Music'; break;
    case 'lyric': key = 'Lyrics'; break;
    case 'vocal': key = 'Vocals'; break;
  }
  return key;
}

function addLineToLines(line, lines) {
  lines.push(line);
  lines.push('');
  lines.push('---');
  lines.push('');
}

function constructHeader() {
  const lines = [];
  lines.push(`Congratulations to the winners of [Round %num: %theme](http://beta.gameofbands.com/round/?round=%num)!`);
  lines.push('');
  lines.push(`As a reminder, all bandits and "fandits" past and present should vote, and you can't win if you don't play!`);
  lines.push('');
  lines.push(`And now we present to you the winners:`);
  lines.push('');
  lines.push('---');
  lines.push('');
  return lines;
}