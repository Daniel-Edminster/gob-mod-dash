export function determineWinners(songs) {
  const winners = {
    track: [],
    music: [],
    lyric: [],
    vocal: []
  };
  const max = {
    track: 0, music: 0, lyric: 0, vocal: 0
  }
  songs.forEach(song => {
    initZeroes(song);
    checkRoleVotes(song, 'track', max, winners);
    checkRoleVotes(song, 'music', max, winners);
    checkRoleVotes(song, 'lyric', max, winners);
    checkRoleVotes(song, 'vocal', max, winners);
  })
  addWinsToSongs(winners);
  return winners;
}

function checkRoleVotes(song, role, max, winners) {
  let key;
  switch (role) {
    case 'track': key = 'votes'; break;
    case 'music': key = 'musicvote'; break;
    case 'lyric': key = 'lyricsvote'; break;
    case 'vocal': key = 'vocalsvote'; break;
  }
  if (song[key] > max[role]) {
    winners[role] = [];
    winners[role].push(song)
    max[role] = song[key];
  } else if (song[key] == max[role]) {
    winners[role].push(song);
  }
}

function addWinsToSongs(winners) {
  for (const [role, songs] of Object.entries(winners)) {
    songs.forEach(song => {
      addWinToSong(song, role)
    })
  }
}

function addWinToSong(song, role) {
  let key;
  switch (role) {
    case 'track': key = 'winner'; break;
    case 'music': key = 'musicwin'; break;
    case 'lyric': key = 'lyricswin'; break;
    case 'vocal': key = 'vocalswin'; break;
  }
  song[key] = "1";
}

// this is just here to make sure no values are null
function initZeroes(song) {
  song.winner = "0";
  song.musicwin = "0";
  song.lyricswin = "0";
  song.vocalswin = "0";
}