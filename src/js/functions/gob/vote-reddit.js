export function mapSongsToComments(songs) {
  const comments = [];
  songs.forEach(song => {
    const comment = {};
    comment.body = mapSongToComment(song);
    comment.number = song.id;
    comment.type = 'song';
    comments.push(comment);
  })
  return comments;
}
/*
[Watch Me Burn](http://beta.gameofbands.com/song/index.php?song=1756 
  "by /u/FreshLennon - music, /u/drv168 - lyrics, and /u/partyeefee - vocals")[Soundcloud Link](https://soundcloud.com/fresh-lennon/watch-me-burn "RES-inline-song")

[Streetlights Flickered Out](http://beta.gameofbands.com/song/index.php?song=2 "by Projekct - music, Grantimatter - lyrics, SeamusRyan - vocals")[Soundcloud Link](http://soundcloud.com/indiscipline87/streetlights-flickered-out "RES-inline-song")

  */

function mapSongToComment(song) {
  const gobUrl = 'http://beta.gameofbands.com/song/index.php?song=';
  return `[${song.name}](${gobUrl}${song.id} "by /u/${song.music} - music, /u/${song.lyrics} - lyrics, /u/${song.vocals} - vocals")[Soundcloud Link](${song.url} "RES-inline-song")`;
}