<template>
   <h4>Launch Thread Team Comment Generator</h4>
   <button @click="generateComments()">Generate Comments</button>
</template>

<script>
import { mapTeamsToComments } from "@/js/functions/gob/team-reddit";

export default {
   name: 'CommentGenerator',
   props: {
      participants: {
         type: Array,
         required: true
      },
      teams: {
         type: Array,
         required: true
      }
   },
   inject: ['setComments'],
   methods: {
      generateComments() {
         const comments = mapTeamsToComments(this.teams, this.participants);
         this.setComments(comments);
      }
   }
}
</script>