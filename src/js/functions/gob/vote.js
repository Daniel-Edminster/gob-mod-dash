export function tabulateResults(votes) {
   const results = {};
   votes.forEach(vote => {
      if (!results[vote.part]) results[vote.part] = {};
      if (!results[vote.part][vote.instanceId]) results[vote.part][vote.instanceId] = 0;
      results[vote.part][vote.instanceId]++;
   })
   return results;
}

export function determineWinners(results, songs) {
   const highestScore = {};
   const winners = {};
   for (const [part, obj] of Object.entries(results)) {
      winners[part] = [];
      highestScore[part] = Math.max(...Object.values(obj));
      for (const [songId, score] of Object.entries(obj)) {
         if (score === highestScore[part]) {
            const winner = songs.find(song => song.id === songId);
            winners[part].push(winner);
         }
      }
   }
   return winners;
}