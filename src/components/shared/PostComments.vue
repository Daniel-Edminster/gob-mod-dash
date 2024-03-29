<template>
   <CommentWarning
      v-if="(thread === 'launch' && found.launch) || (thread === 'voting' && found.voting)"
      :thread="thread"
   />
   <div v-else>
      <button @click="postCommentsSlowly()">Post comments to {{ postId }}</button>
      <p v-if="posting">Posting comments, this will take {{ timeToPost }} seconds in total...</p>
      <base-spinner v-if="posting" />
      <ul>
         <li
            v-for="(comment, index) in commentLess"
            :key="index"
         >
            <TemplatePreview :template="comment" />
         </li>
      </ul>
   </div>
</template>

<script>
import TemplatePreview from "./TemplatePreview";
import { mapState } from "vuex";
import CommentWarning from "./CommentWarning";

export default {
   name: "PostComments",
   components: {
      TemplatePreview,
      CommentWarning,
   },
   data() {
      return {
         posting: false,
      };
   },
   props: {
      postId: {
         type: String,
         required: true,
      },
      comments: {
         type: Array,
         required: true,
      },
      thread: {
         type: String,
         required: true,
      },
   },
   computed: {
      ...mapState("auth", ["reddit"]),
      commentLess() {
         const array = this.comments.filter((comment) => {
            return !this.checkComment(comment);
         });
         return array;
      },
      timeToPost() {
         if (this.comments.length === 0) return null;
         return this.comments.length * 5;
      },
   },
   inject: ["checkComment", "setComment", "found"],
   methods: {
      async wait(ms) {
         return new Promise((resolve) => setTimeout(resolve, ms));
      },
      async postComments() {
         // may want to write a batch submitComments in Reddit.js to handle RATELIMIT error
         // but problematic as I don't want to call setComment from the reddit class
         // will work with this for now
         this.comments.forEach(async (comment) => {
            if (this.checkComment(comment)) {
               // need a type here, team or song
               console.log("Comment exists");
            } else {
               const result = await this.reddit.submitComment(
                  this.postId,
                  comment.body
               );
               if (result) this.setComment(comment, result.id);
            }
         });
      },
      async postCommentsSlowly() {
         this.posting = true;
         const commentsBuffer = [...this.comments];
         console.log(commentsBuffer);
         for (let comment of commentsBuffer) {
            if (this.checkComment(comment)) {
               console.log("Comment exists: ", comment);
            } else {
               const result = await this.reddit.submitComment(
                  this.postId,
                  comment.body
               );
               if (result) this.setComment(comment, result.id);
               await this.wait(5000);
            }
         }
         this.posting = false;
      },
   },
   mounted() {
      console.log(this.comments);
      console.log(this.thread);
      console.log(this.found);
   },
};
</script>

<style scoped>
ul {
   list-style-type: none;
   padding: 0;
   display: flex;
   flex-wrap: wrap;
   text-align: left;
}

li {
   border: 1px solid white;
   flex-grow: 1;
   margin: 5px;
   border-radius: 5px;
}
</style>