export default function createTeams(parts, participants, participantsByNumParts, experience) {
   console.log(participants, experience);
   const singles = divideIntoSingles(parts, participantsByNumParts[1]);
   const numParts = Object.keys(parts).length;
   const teams = [];
   const angels = [];
   mainLoop();
   console.log("Unplaced:", singles)
   return { teams, angels }


   function divideIntoSingles(parts, participants) {
      const singles = {};
      Object.keys(parts).forEach(part => singles[part] = [])
      participants.forEach(participant => singles[participant.part].push(participant));
      return singles;
   }

   function mainLoop() {
      // const singles = Object.values(singlesObj);
      while (Object.values(singles).every(entries => entries.length > 0)) {
         teams.push(assembleTeam())
      }
      // will need to be filter once it gets more sophisticated
      const empty = Object.keys(singles).find(
         key => singles[key].length === 0
      );
      const success = attemptPopulateEvent(empty, singles, numParts);
      if (success) mainLoop();
      return teams;
   }

   function attemptPopulateEvent(empty, singles, numParts) {
      for (let n = 2; n <= numParts; n++) {
         const scores = calculateUserScores(n);
         const success = populateSingle(empty, n, scores);
         if (success) return true;
      }
      return null;
   }

   // now find a user with the empty role and the highest score.
   // for this we need to get the empty key as well as the value
   function populateSingle(empty, n, scores) {
      const users = new Set();
      participantsByNumParts[n].forEach(participant => {
         if (participant.part === empty) users.add(participant.username)
      })
      let maxScore = Math.max(...Object.values(scores));
      let index = -1;
      while (index === -1) {
         index = participantsByNumParts[n].findIndex(
            participant => scores[participant.username] === maxScore && participant.part === empty
         )
         maxScore--;
         if (maxScore < 0) break;
      }
      if (index !== -1) {
         const [chosenOne] = participantsByNumParts[n].splice(index, 1);
         singles[empty].push(chosenOne);
         // Now remove all that user's other participant entries from participantsByNumParts[n] and add them to the angels participants array.
         const unusedEntries = participantsByNumParts[n].filter(participant => participant.username === chosenOne.username);
         participantsByNumParts[n] = participantsByNumParts[n].filter(participant => participant.username !== chosenOne.username);
         angels.push(...unusedEntries);
         return true;
      }
      console.log(index);
      return null;
   }

   // UP NEXT: Duet handling (or any number really)
   function assembleTeam() {
      const team = [];
      Object.values(singles).forEach(single => team.push(single.pop()));
      return team;
   }

   function calculateUserScores(n) {
      const scores = {};
      participantsByNumParts[n].forEach(participant => {
         if (!scores[participant.username]) scores[participant.username] = 0;
         scores[participant.username] += singles[participant.part].length;
      })
      return scores;
   }
}