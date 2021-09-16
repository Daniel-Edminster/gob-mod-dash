<template>
   <PostThread v-if="state === 0" thread="theme" :metadata="metadata" />
   <span
      v-if="state === 1"
      class="needs-action"
   >Please save thread to DB before fetching nominations.</span>
   <FetchNominations v-if="state === 2" :post="post" />
   <CommitTheme v-if="state === 3" :nominations="nominations" />
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
   },
   computed: {
      state() {
         let counter = 0;
         if (this.post?.source) counter++;
         if (this.post?.id) counter++;
         if (this.nominations) counter++;
         return counter;
      }
   }
}
</script>