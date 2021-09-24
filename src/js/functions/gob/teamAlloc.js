export default function createTeams(parts, multi, experience) {
   console.log(multi, experience);
   const singles = divideIntoSingles(parts, multi[1]);
   const singlesCopy = Object.assign({}, singles);
   console.log(singlesCopy);
   const numParts = Object.keys(parts).length;
   const teams = [];
   const angels = []; // list of unused participants where the user was placed on another team
   mainLoop();
   const unplaced = flattenObjectOfArrays(singles);
   console.log("unplaced");
   return { teams: buildTeamObjects(teams), unplaced };

   function mainLoop() {
      // this "> 0" expression actually needs to be the number of each part
      // need to use Object.entries, and reference number of that part using parts[key]
      while (Object.values(singles).every(entries => entries.length > 0)) {
         teams.push(assembleTeam())
      }
      const empty = Object.keys(singles).find(key => singles[key].length === 0); // this still probably needs to choose the best empty in case of multiple
      const success = attemptPopulateEvent(empty, numParts);
      if (success) mainLoop();
      return teams;
   }

   function attemptPopulateEvent(empty, numParts) {
      for (let n = 2; n <= numParts; n++) {
         const success = populateSingle(empty, n);
         if (success) return true;
      }
      return null;
   }

   function populateSingle(empty, n) {
      const users = new Set();
      const scores = calculateUserScores(n);
      multi[n].forEach(participant => {
         if (participant.part === empty) users.add(participant.username)
      })
      let maxScore = Math.max(...Object.values(scores));
      let index = -1;
      while (index === -1) {
         index = multi[n].findIndex(
            participant => scores[participant.username] === maxScore && participant.part === empty
         )
         maxScore--;
         if (maxScore < 0) break;
      }
      if (index !== -1) {
         const [chosenOne] = multi[n].splice(index, 1);
         singles[empty].push(chosenOne);
         // Now remove all that user's other participant entries from multi[n] and add them to the angels participants array.
         const unusedEntries = multi[n].filter(participant => participant.username === chosenOne.username);
         multi[n] = multi[n].filter(participant => participant.username !== chosenOne.username);
         angels.push(...unusedEntries);
         return true;
      }
      return null;
   }
   function assembleTeam() {
      const team = [];
      for (const [key, value] of Object.entries(parts)) {
         for (let i = 1; i <= value; i++) {
            team.push(singles[key].pop())
         }
      }
      return team;
   }

   // need to divide each singles array by the number of that role in the team
   function calculateUserScores(n) {
      const scores = {};
      multi[n].forEach(participant => {
         if (!scores[participant.username]) scores[participant.username] = 0;
         scores[participant.username] += singles[participant.part].length / parts[participant.part];
      })
      return scores;
   }
}

function divideIntoSingles(parts, array) {
   const singles = {};
   Object.keys(parts).forEach(part => singles[part] = [])
   array.forEach(participant => singles[participant.part].push(participant));
   return singles;
}

function flattenObjectOfArrays(obj) {
   const array = [];
   Object.values(obj).forEach(arr => array.push(...arr))
   return array;
}

function buildTeamObjects(teams) {
   const array = [];
   teams.forEach((team, index) => {
      array.push({ number: index + 1, members: team})
   })
   return array;
}