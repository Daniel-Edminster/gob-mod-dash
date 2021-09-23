<template>
   <button @click="tabulateVotes()">Tabulate Votes</button>
</template>

<script>
import { determineWinners, tabulateResults } from "@/js/functions/gob/vote";

export default {
   name: "TabulateVotes",
   props: {
      songs: {
         type: Array,
         required: true,
      },
      votes: {
         type: Array,
         required: true,
      }
   },
   inject: ["setProperty"],
   methods: {
      tabulateVotes() {
         const results = tabulateResults(this.votes);
         console.log(results);
         const winners = determineWinners(results, this.songs);
         this.setProperty("winners", winners);
      }
   },
};
</script>

<style scoped>
button {
   margin: 15px;
}
</style>