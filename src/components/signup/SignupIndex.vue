<template>
   <PostThread v-if="state === 0" thread="signup" :metadata="metadata" />
   <DatasaveWarning v-if="state === 1" thing="signup thread" action="fetching signups" />
   <FetchSignups v-if="state === 2" :postId="post.source" :roles="Object.keys(metadata.parts)" />
   <DatasaveWarning v-if="state === 3" thing="signups" action="committing as participants" />
   <CommitSignups v-if="state === 4" :signups="signups" :parts="metadata.parts" />
</template>

<script>
import CommitSignups from "./CommitSignups"
import FetchSignups from "./FetchSignups";
import PostThread from "../shared/PostThread";
import DatasaveWarning from "../shared/DatasaveWarning"

export default {
   name: "SignupIndex",
   components: {
      CommitSignups,
      DatasaveWarning,
      FetchSignups,
      PostThread
   },
   props: {
      metadata: {
         type: Object,
         required: true,
      },
      post: {
         type: Object,
         required: false,
         default: null
      },
      signups: {
         type: Array,
         required: false,
         default: null
      }
   },
   computed: {
      state() {
         let counter = 0;
         if (this.post?.source) counter++;
         if (this.post?.id) counter++;
         if (this.signups) counter++;
         if (this.signups?.every(nom => nom.id)) counter++;
         return counter;
      }
   }
}
</script>