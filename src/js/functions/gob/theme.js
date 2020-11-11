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