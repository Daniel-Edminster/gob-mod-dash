// export function mapTeamsToComments(teams) {
//   const comments = [];
//   teams.forEach(team => {
//     const comment = {};
//     comment.body = mapTeamToComment(team);
//     comment.number = team.number;
//     comment.type = 'team';
//     comments.push(comment);
//   })
//   return comments;
// }

export function mapTeamsToComments(teams) {
  return teams.map(team => {
    const comment = {};
    comment.body = mapTeamToComment(team);
    comment.number = team.number;
    comment.type = 'team';
    return comment;
  })
}

// we should make a template for this
function mapTeamToComment(team) {
  const lines = [];
  lines.push(`**Team ${team.number}**`);
  lines.push('');
  team.members.forEach(user => {
    lines.push(`* ${user.roles[0]}: [${user.name}](https://www.reddit.com/u/${user.name})`);
  })
  const string = lines.join('\n');
  return string;
}

export function mapCommentsToCheckIns(comments) {
  console.log(comments);
}