// converts comment listing from reddit api to array of theme pool objects
export function mapCommentsToNoms(comments) {
  const array = [];
  comments.forEach(comment => {
    const nom = {
      user: comment.author.name,
      score: comment.score,
      url: comment.permalink,
      body: comment.body,
      date: comment.created,
    };
    array.push(nom);
  })
  return array;
}

export function determineWinningTheme(nominations) {
  // Find max score
  const highScore =
    Math.max.apply(Math, nominations.map((nomination) => nomination.score));

  // populate new array with equally highest scoring nominations
  let highestNominations = [];
  nominations.forEach((nomination) => {
    if (nomination.score == highScore) {
      highestNominations.push(nomination);
    }
  });

  // sort best nominations by created date
  highestNominations.sort((a, b) => {
    return a.date - b.date;
  })

  return highestNominations[0];
}