export function mapTeamsToComments(teams, participants) {
   return teams.map(team => {
      const comment = {};
      const members = participants.filter(participant => participant.instance.number === team.number);
      comment.body = mapTeamToComment(team, members);
      comment.instanceId = team.id;
      comment.stage = 'team';
      return comment;
   })
}

// we should make a template for this
function mapTeamToComment(team, members) {
   const lines = [];
   lines.push(`**Team ${team.number}**`);
   lines.push('');
   members.forEach(participant => {
      lines.push(`* ${participant.part}: [${participant.username}](https://www.reddit.com/u/${participant.username})`);
   })
   const string = lines.join('\n');
   return string;
}

export function mapCommentsToCheckIns(comments) {
   console.log(comments);
}

export function mapCommentsToTeams(comments) {
   // Slightly poor form running the set this way, can fix if in future
   // it's deemed necessary to create a scanTeamsForUsers function.
   const placedUsers = new Set();
   const rawTeams = comments.map(comment => mapCommentToTeam(comment));

   const teams = rawTeams.filter(team => {
      return team.number && team.members.length > 0;
   })

   console.log(teams)

   return { placedUsers, teams };

   function mapCommentToTeam(comment) {
      const string = comment.body;
      const lines = string.split('\n');

      const members = [];
      let number = null;

      lines.forEach(line => {
         line = formatLine(line);

         if (line.toLowerCase().includes("team")) {
            number = extractTeamNumber(line);
         } else if (line.includes("/u/")) {
            members.push(extractNameAndPart(line));
         }
      })

      return { number, members, comment: comment.name }
   }

   function formatLine(line) {
      line = line.replaceAll('*', ''); // should save doing it in each function
      line = line.replaceAll('\t', ''); // because I found one comment with this
      line = line.replaceAll(' ', ''); // might as well save trimming later
      // line = line.toLowerCase();
      return line;
   }

   function extractTeamNumber(string) {
      string = string.toLowerCase();
      string = string.replace('team', '');
      string = string.trim();
      return string;
   }

   function extractNameAndPart(string) {
      // string = string.replace('*', '');
      const array = string.split('/u/');
      const username = array[1];
      placedUsers.add(username.toLowerCase()); // necessary for comparisons
      const part = array[0].toLowerCase().replaceAll(':', '');
      return { username, part };
   }
}
