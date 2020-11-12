<template>
Round has been launched! Once it's over, fetch the songs and end the round!<br />
  <button @click="fetchSongs()">Fetch Songs</button>
  <button @click="endRound()">End Round</button>
</template>

<script>
import gob from "@/js/api/gob"

export default {
  name: 'RoundOver',
  props: {
    number: {
      type: String,
      required: true
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