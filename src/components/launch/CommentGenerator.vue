<template>
  <button @click="generateComments()">Generate Comments</button>
</template>

<script>
import { mapTeamsToComments } from "@/js/functions/gob/team-reddit";

export default {
  name: 'CommentGenerator',
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  inject: ['setComments'],
  methods: {
    generateComments() {
      const comments = mapTeamsToComments(this.teams);
      this.setComments(comments);
    }
  }
}
</script>