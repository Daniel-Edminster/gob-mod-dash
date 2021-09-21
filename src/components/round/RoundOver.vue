<template>
   <div v-if="state === 0">
      <button @click="fetchSongs()">Fetch Songs</button>
      <span v-if="message">{{ message }}</span>
      <base-spinner v-if="isLoading" />
   </div>
   <div v-if="state === 1">
      <button @click="saveSongsToDatabase">Save songs to database</button>
      <DatasaveWarning thing="songs" action="continuing on to voting." />
   </div>
   <div v-if="state === 2">
      <button @click="setProperty('songs', songs)">Commit Songs to Round</button>
      <SongsList :songs="songs" />
   </div>
</template>

<script>
import SongsList from "../shared/SongsList";
import DatasaveWarning from "../shared/DatasaveWarning"

import saveSongsToDatabase from "@/js/functions/fauna/saveSongs"

export default {
   name: "RoundOver",
   components: {
      SongsList,
      DatasaveWarning
   },
   props: {
      number: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         isLoading: false,
         message: null,
         songs: null,
      };
   },
   computed: {
      allSongsSavedToDatabase() {
         return this.songs?.every(song => song.title);
      },
      state() {
         let counter = 0;
         if (this.songs) counter++;
         if (this.allSongsSavedToDatabase) counter++;
         return counter;
      }
   },
   inject: ["setProperty"],
   methods: {
      async fetchSongs() {
         this.message = "Fetching songs...";
         this.isLoading = true;
         const rootUrl = process.env.VUE_APP_BASE_URL;
         const response = await fetch(
            `${rootUrl}/api/gob?fetchSongs=${this.number}`
         );
         const obj = await response.json();
         this.isLoading = false;
         const { status, data } = obj;
         if (status.code === 200) this.songs = data;
         this.message = `${status.code} ${status.text}.`;
      },
      async saveSongsToDatabase() {
         const savedSongs = await saveSongsToDatabase(this.songs);
         if (savedSongs) {
            this.songs = savedSongs;
            // this.setProperty("songs", savedSongs);
         } else {
            console.log("There was a problem saving songs to the database.");
         }
      }
   },
};
</script>