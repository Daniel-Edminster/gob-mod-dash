<template>
   <p v-if="message">{{ message }}</p>
   <div v-if="!ids">
      <button @click="findComments">Find Comments</button>
      <base-spinner v-if="isLoading" />
   </div>
   <div v-else>
      <IdsTable :ids="ids" :deleteId="deleteId" :setId="setId" />
      <button @click="setFoundSongComments(ids, postId)">Commit Comments</button>
   </div>
</template>

<script>
import { mapState } from "vuex";
import IdsTable from "./IdsTable";
import { mapCommentsToIds } from "@/js/functions/gob/vote-reddit";


export default {
   name: "FindSongComments",
   components: {
      IdsTable
   },
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
         try {
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
         } catch (err) {
            console.log(err)
         }
      },
      deleteId(commentId) {
         console.log(`Deleting Id of comment ${commentId}`)
         const ids = this.ids;
         console.log(ids);
         const id = ids.find((id) => id.comment === commentId);
         const index = ids.indexOf(id);
         console.log(index);
         ids.splice(index, 1);
      },
      setId(commentId, songId) {
         const ids = this.ids;
         const id = ids.find((id) => id.comment === commentId);
         id.song = songId;
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