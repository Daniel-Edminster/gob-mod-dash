<template>
   <PostThread v-if="state === 0" thread="theme" :metadata="metadata" />
   <DatasaveWarning v-if="state === 1" thing="theme thread" action="fetching nominations" />
   <FetchNominations v-if="state === 2" :post="post" />
   <DatasaveWarning v-if="state === 3" thing="nominations" action="committing theme to round" />
   <CommitTheme v-if="state === 4" :nominations="nominations" />
</template>

<script>
import CommitTheme from "./CommitTheme"
import FetchNominations from "./FetchNominations"
import PostThread from "../shared/PostThread"
import DatasaveWarning from "../shared/DatasaveWarning"

export default {
   name: "ThemeIndex",
   components: {
      CommitTheme,
      DatasaveWarning,
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
         if (this.nominations.every(nom => nom.id)) counter++;
         if (this.nominations) counter++;
         return counter;
      }
   }
}
</script>