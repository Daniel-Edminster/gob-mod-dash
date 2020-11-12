<template>
  <button @click="generateComments()">Generate Comments</button>
</template>

<script>
import { mapSongsToComments } from "@/js/functions/gob/vote-reddit";

export default {
  name: 'CommentGenerator',
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  inject: ['setComments'],
  methods: {
    generateComments() {
      const comments = mapSongsToComments(this.songs);
      this.setComments(comments);
    }
  }
}
</script>