<template>
  <PostThread v-if="template" thread="congrats" :metadata="metadata" :forceTemplate="template" />
  <button v-else @click="constructWinnersThread">Construct Winners Thread</button>
</template>

<script>
import PostThread from "../shared/PostThread"
import { constructWinnersThread } from "@/js/functions/gob/congrats-reddit"

export default {
  name: 'CongratsIndex',
  components: {
    PostThread
  },
  props: {
    winners: {
      type: Object,
      required: true
    },
    teams: {
      type: Array,
      required: true
    },
    metadata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      template: null
    }
  },
  methods: {
    constructWinnersThread() {
      const title = `Congratulations to the Winners of Round %num: %theme`;
      const body = constructWinnersThread(this.winners, this.teams);
      this.template = {title, body};
      console.log("Saved Template", this.template);
    }
  }
}
</script>