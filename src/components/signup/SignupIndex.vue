<template>
   <div v-if="!signups">
      <div v-if="!post?.source">
         <PostThread thread="signup" :metadata="metadata" />
      </div>
      <div v-if="post?.source && !post.id">
         <span class="needs-action">Please save thread to DB before fetching nominations.</span>
      </div>
      <div v-if="post?.source && post.id && !signups">
         <FetchSignups :postId="post.source" />
      </div>
   </div>
   <div v-else>
      <div v-if="signups">
         <CommitSignups :signups="signups" />
      </div>
   </div>
</template>

<script>
import CommitSignups from "./CommitSignups"
import FetchSignups from "./FetchSignups";
import PostThread from "../shared/PostThread";

export default {
   name: "SignupIndex",
   components: {
      CommitSignups,
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
   }
}
</script>