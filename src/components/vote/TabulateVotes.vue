<template>
  <button @click="tabulateVotes()">Tabulate Votes</button>
</template>

<script>
import { assignVotesToSongs } from "@/js/functions/gob/vote"

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
    }
  },
  methods: {
    tabulateVotes() {
      assignVotesToSongs(this.songs, this.votes);
    }
  }
}
</script>