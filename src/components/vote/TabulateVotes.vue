<template>
  <button v-if="!allSongsVotedOn" @click="tabulateVotes()">Tabulate Votes</button>
  <button v-else @click="clearSongVotes()">Clear Votes</button>
</template>

<script>
import { assignVotesToSongs, clearVotesFromSongs } from "@/js/functions/gob/vote"

export default {
  name: 'TabulateVotes',
  props: {
    songs: {
      type: Array,
      required: true,
    },
    votes: {
      type: Array,
      required: true
    },
    allSongsVotedOn: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    tabulateVotes() {
      assignVotesToSongs(this.songs, this.votes);
    },
    clearSongVotes() {
      clearVotesFromSongs(this.songs);
    }
  }
}
</script>