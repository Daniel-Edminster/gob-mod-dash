<template>
   <a :href="`http://www.reddit.com/by_id/${postId}`">Theme Nomination Thread</a><br />
   <p>Press the button to fetch nominations from thread.</p>
   <button @click="fetchNominations()">Fetch Nominations</button>
   <p v-if="message">{{ message }}</p>
   <base-spinner v-if="isLoading" />
</template>

<script>
import { mapState } from "vuex";
import { mapCommentsToNoms } from "@/js/functions/gob/theme";

export default {
   name: "FetchNominations",
   props: {
      postId: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         isLoading: false,
         nominations: null,
         message: null,
      };
   },
   inject: ["setPool"],
   computed: mapState("auth", ["reddit"]),
   methods: {
      async fetchNominations() {
         this.message = "Fetching nominations...";
         this.isLoading = true;
         const comments = await this.reddit.fetchComments(this.postId);
         this.isLoading = false;
         if (comments.length == 0) {
            console.log("No comments :(");
            this.message = "No comments in thread :(";
            return;
         } else {
            const pool = mapCommentsToNoms(comments);
            this.setPool("theme", pool);
         }
      },
   },
};
</script>