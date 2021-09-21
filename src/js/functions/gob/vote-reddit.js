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
   console.log("Song comments:", comments);
   const array = [];
   comments.forEach(comment => {
      comment.replies.forEach(reply => {
         console.log(reply);
         array.push(...mapCommentToVotes(reply));
      })
   })
   return array;
}

function mapCommentToVotes(comment) {
   return mapVoteSyntaxToPart(comment.body.replaceAll(" ", ""), comment);
}

function mapVoteSyntaxToPart(string, comment) {
   if (comment.edited) console.log("Edited!", comment);
   const array = [];
   if (string.includes('[](/t)')) array.push(createVote(comment, 'self'))
   if (string.includes('[](/m)')) array.push(createVote(comment, 'music'))
   if (string.includes('[](/l)')) array.push(createVote(comment, 'lyrics'))
   if (string.includes('[](/v)')) array.push(createVote(comment, 'vocals'))
   return array;
}

function createVote(comment, part) {
   return {
      song_comment: comment.parent_id,
      username: comment.author.name,
      part,
      source: comment.name,
      date: comment.edited ? formatDate(comment.edited) : formatDate(comment.created)
   }
}

function formatDate(timestamp) {
   return new Date(timestamp).toISOString();
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