export function assignVotesToSongs(songs, votes) {
   songs.forEach(song => {
      if (song.voted === false || !song.voted) {
         votes.forEach(vote => {
            if (song.comment === vote[0]) addVotesToSong(song, vote[1]);
         })
      }
   })
}

export function clearVotesFromSongs(songs) {
   songs.forEach(song => {
      clearVotesFromSong(song);
   })
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

function clearVotesFromSong(song) {
   song.votes = 0;
   song.musicvote = 0;
   song.lyricsvote = 0;
   song.vocalsvote = 0;
   song.voted = false;
}