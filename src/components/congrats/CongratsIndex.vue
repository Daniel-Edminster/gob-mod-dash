<template>
   <button v-if="state === 0" @click="constructWinnersThread">Construct Winners Thread</button>
   <PostThread v-if="state === 0 && template" thread="congrats" :metadata="metadata" :forceTemplate="template" />
   <DatasaveWarning v-if="state === 1" thing="Congrats thread" action="ending the round" />
   <p v-if="state === 2">Congrats thread has been posted and saved! This concludes the round.</p>
</template>

<script>
import PostThread from "../shared/PostThread";
import DatasaveWarning from "../shared/DatasaveWarning"
import { constructWinnersThread } from "@/js/functions/gob/congrats-reddit";

export default {
   name: "CongratsIndex",
   components: {
      DatasaveWarning,
      PostThread,
   },
   props: {
      winners: {
         type: Object,
         required: true,
      },
      teams: {
         type: Array,
         required: true,
      },
      metadata: {
         type: Object,
         required: true,
      },
      post: {
         type: Object,
         required: false,
         default: null,
      },
   },
   data() {
      return {
         template: null,
      };
   },
   inject: ['setProperty'],
   computed: {
      state() {
         let counter = 0; // Construct template, then post or find thread
         if (this.post?.source) counter++; // Save to database
         if (this.post?.id) counter++; // That's the end of the round for now.
         return counter;
      }
   },
   methods: {
      constructWinnersThread() {
         const title = `Congratulations to the Winners of Round %num: %theme`;
         const body = constructWinnersThread(this.winners, this.teams);
         this.template = { title, body };
         console.log("Saved Template", this.template);
      },
   },
};
</script>