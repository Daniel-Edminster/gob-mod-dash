export function mapSongsToComments(songs) {
   return songs.map(song => {
      const comment = {};
      comment.body = mapSongToComment(song);
      comment.number = song.id;
      comment.type = 'song';
      return comment;
   })
}

function mapSongToComment(song) {
   const gobUrl = 'http://beta.gameofbands.com/song/index.php?song=';
   return `[${song.name}](${gobUrl}${song.id} "by /u/${song.music} - music, /u/${song.lyrics} - lyrics, /u/${song.vocals} - vocals")[Soundcloud Link](${song.url} "RES-inline-song")`;
}

export function mapCommentsToVotes(comments) {
   const map = new Map();
   comments.forEach(comment => {
      map.set(comment.id, { track: 0, music: 0, lyrics: 0, vocals: 0 })
      comment.replies.forEach(reply => {
         const replyVotes = mapReplyToVotes(reply);
         const votes = map.get(comment.id);
         updateVotes(replyVotes, votes)
      })
   })
   return map;
}

function updateVotes(newVotes, votes) {
   votes.track += newVotes.track;
   votes.music += newVotes.music;
   votes.lyrics += newVotes.lyrics;
   votes.vocals += newVotes.vocals;
}

function mapReplyToVotes(reply) {
   const votes = { track: 0, music: 0, lyrics: 0, vocals: 0 };
   if (reply.body.includes('[](/t)')) votes.track++;
   if (reply.body.includes('[](/m)')) votes.music++;
   if (reply.body.includes('[](/l)')) votes.lyrics++;
   if (reply.body.includes('[](/v)')) votes.vocals++;
   return votes;
}

export function mapCommentsToIds(comments) {
   return comments.map(comment => extractSongId(comment));
}

function extractSongId(comment) {
   let string = comment.body;
   const searchTerm = "song=";
   const paramIndex = string.indexOf(searchTerm);
   string = string.substring(paramIndex);
   string = string.replaceAll(searchTerm, "");
   const array = string.split(" ");
   return { comment: comment.id, song: array[0] };
}