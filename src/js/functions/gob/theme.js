export function mapCommentsToNoms(comments) {
   const nominations = [];
   const votes = {};
   comments.forEach(comment => votes[comment.name] = comment.score);
   comments.forEach(comment => {
      if (comment.author.name !== '[deleted]' && comment.body !== '[deleted]')
         nominations.push(mapCommentToNoms(comment))
   })
   return [nominations, votes];
}

function mapCommentToNoms(comment) {
   return {
      user: comment.author.name,
      source: comment.name,
      description: comment.body,
      date: comment.created,
   }
}

export function determineWinningTheme(nominations, votes) {
   const scores = Object.values(votes);
   const highScore = Math.max(...scores);

   const highestNominations = nominations.filter(nom => votes[nom.source] === highScore);

   // sort best nominations by created date
   highestNominations.sort((a, b) => {
      return a.date - b.date;
   })
   return highestNominations[0];
}