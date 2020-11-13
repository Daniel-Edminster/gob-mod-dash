<template>
  <h4>All Songs voted on.</h4>
  <button v-if="!winners" @click="determineWinners()">Determine Winners!</button>
  <button v-else @click="commitWinners()">Commit Winners</button>
  <WinnersTable v-if="winners" :winners="winners" />
</template>

<script>
import WinnersTable from "../shared/WinnersTable"
import { determineWinners } from "@/js/functions/gob/congrats"

export default {
  name: 'CommitWinners',
  components: {
    WinnersTable
  },
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      winners: null
    }
  },
  inject: ['setProperty'],
  methods: {
    commitWinners() {
      this.setProperty('winners', this.winners);
    },
    determineWinners() {
      this.winners = determineWinners(this.songs);
    }
  }
}
</script>