export function constructWinnersThread(winners, teams) {
  const lines = constructRoleWinners(winners, teams);
  console.log(lines);
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
  return `[*song.name*](${song.url} "Award ${key})`;
}

function constructTrackWinner(song, teams) {
  console.log(song, teams);
}

function constructTrackWinnerWithoutTeam(song) {
  return `[${song.name}](${song.url} "Award Track)`;
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