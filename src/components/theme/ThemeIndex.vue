<template>
   <div v-if="!nominations">
      <div v-if="!post?.source">
         <PostThread thread="theme" :metadata="metadata" />
      </div>
      <div v-if="post?.source && !post?.id">
         <span class="needs-action">Please save thread to DB before fetching nominations.</span>
      </div>
      <div v-if="post?.source && post?.id && !nominations">
         <FetchNominations :post="post" />
      </div>
   </div>
   <div v-else>
      <CommitTheme :nominations="nominations" />
   </div>
</template>

<script>
import CommitTheme from "./CommitTheme"
import FetchNominations from "./FetchNominations"
import PostThread from "../shared/PostThread"

export default {
   name: "ThemeIndex",
   components: {
      CommitTheme,
      FetchNominations,
      PostThread
   },
   props: {
      metadata: {
         type: Object,
         required: true
      },
      post: {
         type: Object,
         required: false,
         default: null
      },
      nominations: {
         type: Array,
         required: false,
         default: null
      }
   }
}
</script>