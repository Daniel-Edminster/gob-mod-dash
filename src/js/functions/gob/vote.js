export function assignVotesToSongs(songs, votes) {
  console.log(songs);
  console.log(votes);
  songs.forEach(song => {
    if (!song.voted) {
      votes.forEach(vote => {
        if (song.comment === vote[0]) addVotesToSong(song, vote[1]);
      })
    }
  })
  console.log(songs);
}

// this was just easier to do manually, rather than looping over the votes object.
function addVotesToSong(song, votes) {
  let track = +song.votes;
  let music = +song.musicvote;
  let lyrics = +song.lyricsvote;
  let vocals = +song.vocalsvote;
  track += votes.track;
  music += votes.music;
  lyrics += votes.lyrics;
  vocals += votes.vocals;
  song.votes = track.toString();
  song.musicvote = music.toString();
  song.lyricsvote = lyrics.toString();
  song.vocalsvote = vocals.toString();
  song.voted = true;
}