<template>
Round has been launched! Once it's over, fetch the songs and end the round!<br />
  <button @click="fetchSongs()">Fetch Songs</button>
  <button @click="endRound()">End Round</button>
  <SongsList v-if="songs" :songs="songs" />
</template>

<script>
import SongsList from "../shared/SongsList";
import gob from "@/js/api/gob"

export default {
  name: 'RoundOver',
  components: {
    SongsList
  },
  props: {
    number: {
      type: String,
      required: true
    },
    songs: {
      type: Array,
      required: false,
      default: null
    }
  },
  inject: ['endRound', 'setSongs'],
  methods: {
    async fetchSongs() {
      const songs = await gob.fetchSongs(this.number);
      if (songs) this.setSongs(songs);
      console.log(songs);
    }
  }
}
</script>