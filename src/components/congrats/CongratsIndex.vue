<template>
  <button @click="constructWinnersThread">Construct Winners Thread</button>
</template>

<script>
import { constructWinnersThread } from "@/js/functions/gob/congrats-reddit"

export default {
  name: 'CongratsIndex',
  props: {
    winners: {
      type: Object,
      required: true
    },
    teams: {
      type: Array,
      required: true
    }
  },
  methods: {
    constructWinnersThread() {
      constructWinnersThread(this.winners, this.teams);
    }
  }
}
</script>