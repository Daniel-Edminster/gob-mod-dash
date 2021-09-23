export default function constructWinnersThread(winners, roundNum) {
   const url = `http://new.gameofbands.com/#/round/${roundNum}`;
   const usernames = new Set();
   const lines = constructHeader(url);
   winners.track.forEach(song => {
      lines.push(...constructTrackSection(song));
      song.participants.forEach(participant => usernames.add(participant.username))
   });
   for (const [part, songs] of Object.entries(winners)) {
      if (part !== 'track') {
         songs.forEach(song => lines.push(...constructPartWinners(song, part)))
      }
   }
   lines.push(...constructFooter(usernames));
   return lines.join("\n");

   // functions in scope for usernames set and url

   function constructTrackSection(song) {
      const lines = [];
      lines.push(constructTrackWinner(song));
      lines.push(constructTrackLink(song));
      lines.push(...separator);
      return lines;
   }
   
   function constructTrackWinner(song) {
      const participantString = constructParticipantsString(song.participants, false);
      return `[*${song.title}* ${participantString}](${url} "Award Track")`;
   }
   
   function constructTrackLink(song) {
      const participantString = constructParticipantsString(song.participants, true);
      return `[${song.title}](${url} ${participantString})[Soundcloud link](${song.url} "RES-inline-song")`;
   }

   function constructPartWinners(song, part) {
      const winningParticipants = getWinningParticipants(song.participants, part);
      const lines = [];
      winningParticipants.forEach(participant => {
         lines.push(constructPartWinner(song, participant))
         lines.push(...separator);
      })
      return lines;
   }

   function constructPartWinner(song, participant) {
      return `[**${participant.username}** for *${song.title}*](${url} "Award ${capitalise(participant.part)}")`;
   }
   
   function getWinningParticipants(participants, part) {
      const array = [];
      participants.forEach(participant => {
         if (participant.part === part) {
            array.push(participant)
            usernames.add(participant.username);
         }
      });
      return array;
   }
}

// inside scope not needed

function constructHeader(url) {
   const lines = [];
   lines.push(`Congratulations to the winners of [Round %num: %theme](${url})!`);
   lines.push('');
   lines.push(`As a reminder, all bandits and "fandits" past and present should vote, and you can't win if you don't play!`);
   lines.push('');
   lines.push(`And now we present to you the winners:`);
   lines.push(...separator);
   return lines;
}

function constructFooter(usernames) {
   const lines = [];
   lines.push(`### Congratulations to all of our winners! Flair incoming to:`);
   lines.push('');
   usernames.forEach(username => {
      lines.push(`* /u/${username}`)
      lines.push('');
   });
   return lines;
}

function constructParticipantsString(participants, isLink) {
   const quote = isLink ? `"` : ``;
   const style = !isLink ? "**" : "";
   const head = `${quote}by `;
   const tail = `${quote}`;
   const strings = participants.map(participant => {
      const suffix = isLink ? ` - ${participant.part}` : '';
      return `${style}/u/${participant.username}${style}${suffix}`
   });
   const string = strings.join(",");
   return head + string + tail;
}

function capitalise(string) {
   const array = string.split('');
   array[0] = array[0].toUpperCase();
   return array.join('');
}

const separator = ['', '---', ''];

