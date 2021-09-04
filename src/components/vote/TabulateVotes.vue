<template>
   <div>
      <button
         v-if="!allSongsVotedOn"
         @click="tabulateVotes()"
      >Tabulate Votes</button>
      <button @click="clearSongVotes()">Clear Votes</button>
   </div>
</template>

<script>
import {
   assignVotesToSongs,
   clearVotesFromSongs,
} from "@/js/functions/gob/vote";

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
      },
      allSongsVotedOn: {
         type: Boolean,
         required: true,
      },
   },
   methods: {
      tabulateVotes() {
         console.log(this.songs);
         console.log(this.votes);
         assignVotesToSongs(this.songs, this.votes);
      },
      clearSongVotes() {
         clearVotesFromSongs(this.songs);
         console.log("Songs: ", this.songs);
      },
   },
};
</script>

<style scoped>
button {
   margin: 15px;
}
</style>