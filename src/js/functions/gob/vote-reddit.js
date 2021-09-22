export function mapSongsToComments(songs) {
   return songs.map(song => {
      const comment = {};
      comment.body = mapSongToComment(song);
      comment.instanceId = song.id;
      comment.stage = "song"
      return comment;
   })
}

function mapSongToComment(song) {
   const gobUrl = 'http://new.gameofbands.com/song/index.php?song=';
   const head = `[${song.title}](${gobUrl}${song.number} `;
   const tail = `[Soundcloud Link](${song.url} "RES-inline-song")`
   const middle = createParticipantsString(song.participants);
   return head + middle + tail;
}

function createParticipantsString(participants) {
   const head = `"by`;
   const tail = `")`;
   const strings = participants.map(participant => ` /u/${participant.username} - ${participant.part}`);
   const string = strings.join(",");
   return head + string + tail;
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
   if (string.includes('[](/t)')) array.push(createVote(comment, 'track'))
   if (string.includes('[](/m)')) array.push(createVote(comment, 'music'))
   if (string.includes('[](/l)')) array.push(createVote(comment, 'lyrics'))
   if (string.includes('[](/v)')) array.push(createVote(comment, 'vocals'))
   return array;
}

function createVote(comment, part) {
   return {
      parent: comment.parent_id,
      username: comment.author.name,
      part,
      source: comment.name,
      date: comment.edited === true ? formatDate(comment.edited) : formatDate(comment.created_utc)
   }
}

function formatDate(timestamp) {
   // reddit's precision is lousy
   return new Date(timestamp * 1000).toISOString();
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
   return { comment: comment.name, song: array[0] };
}