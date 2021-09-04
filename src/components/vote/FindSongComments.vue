<template>
   <p v-if="message">{{ message }}</p>
   <div v-if="!ids">
      <button @click="findComments">Find Comments</button>
      <base-spinner v-if="isLoading" />
   </div>
   <div v-else>
      <button @click="setFoundSongComments(ids)">Commit Comments</button>
   </div>
   <ul v-if="ids">
      <li v-for="id in ids" :key="id.song">{{ id.comment }}: {{ id.song}}</li>
   </ul>
</template>

<script>
import { mapState } from "vuex";
import { mapCommentsToIds } from "@/js/functions/gob/vote-reddit";

export default {
   name: "FindSongComments",
   props: {
      postId: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         isLoading: false,
         message: "Fetch song vote comments from thread",
         comments: null,
         ids: null,
      };
   },
   computed: mapState("auth", ["reddit"]),
   inject: ['setFoundSongComments'],
   methods: {
      async findComments() {
         this.message = `Finding song comments...`;
         this.isLoading = true;
         const comments = await this.reddit.fetchComments(this.postId);
         this.isLoading = false;
         if (comments.length === 0) {
            this.message =
               "No comments found in voting thread. Please generate.";
         } else {
            this.message = `${comments.length} comments found. Please review and commit.`;
            const ids = mapCommentsToIds(comments);
            if (ids.length > 0) {
               this.ids = ids;
            } else {
               this.message = `Unable to extract Song IDs from comments.`;
            }
         }
      }
   },
};
</script>

<style scoped>
ul {
   list-style-type: none;
   padding-left: 0;
}
</style>