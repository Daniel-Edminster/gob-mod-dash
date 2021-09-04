<template>
   <div>
      <h4>Find Existing Thread: {{ thread }}</h4>
      <!-- <p>Find by thread type and round. More accurate, takes longer for older rounds.
      <button @click="findThread">Find Thread</button></p> -->
      <button @click="findThreadByRound">Find Thread</button>
      <p v-if="message">{{ message }}</p>
      <base-spinner v-if="isLoading" />
      <ul v-if="submissions">
         <li
            v-for="submission in submissions"
            :key="submission.name"
         ><button
               class="select-thread-button"
               @click="selectThread(submission.name)"
            >Select</button>{{ submission.title }}</li>
      </ul>
   </div>
</template>

<script>
import { mapState } from "vuex";

export default {
   name: "FindThread",
   props: {
      thread: {
         type: String,
         required: true,
      },
      round: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         isLoading: false,
         message: null,
         submissions: null,
         titles: {
            theme: "theme nomination",
            signup: "signups",
            launch: "begun",
            late: "late",
            voting: "voting",
            congrats: "winners",
         },
      };
   },
   computed: mapState("auth", ["reddit"]),
   inject: ["setThread"],
   methods: {
      async findThread() {
         this.message =
            "Searching... very old rounds may take up to a minute...";
         const posts = await this.reddit.findPost(this.thread, this.round);
         if (posts) this.submissions = posts;
      },
      selectThread(name) {
         this.setThread(this.thread, name);
      },
      async findThreadByRound() {
         this.isLoading = true;
         this.message = "Searching reddit, please wait..."
         const listing = await this.reddit.searchPosts(this.round);
         this.isLoading = false;
         if (!listing) {
            this.message = "No threads found.";
            return;
         }
         this.message="Threads found. Select from options below."
         const filtered = this.filterPosts(listing);
         this.submissions = filtered.length > 0 ? filtered : listing;
      },
      filterPosts(listing) {
         return listing.filter((submission) => {
            return (
               submission.title.toLowerCase().includes(this.titles[this.thread])
            );
         });
      },
   },
};
</script>

<style scoped>
ul {
   list-style-type: none;
   text-align: left;
   border: 1px solid white;
   padding-left: 0;
}

li {
   margin: 10px;
}

li:nth-child(odd) {
   background-color: #24252d;
}

button.select-thread-button {
   margin-right: 30px;
}
</style>