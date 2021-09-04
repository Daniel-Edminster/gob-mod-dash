<template>
   <div class="home">
      <p v-if="isAuthenticated && isModerator">To begin, select either rounds or templates above.</p>
      <div v-if="isAuthenticated && !isModerator">
         <p>This app is for reddit's <a href="http://gameofbands.reddit.com">/r/gameofbands</a> moderators to help manage the competition.</p>
         <p>If you would like to participate, visit the subreddit.</p>
         <p>You can also find a link to our Discord in the subreddit's sidebar.</p>
      </div>
      <p v-if="!isAuthenticated">Please login to begin.</p>
   </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: "Home",
   computed: mapGetters('auth', ['isAuthenticated', 'isModerator'])
};
</script>
