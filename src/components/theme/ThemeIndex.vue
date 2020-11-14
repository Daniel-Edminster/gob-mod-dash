<template>
  <div v-if="!postId"><PostThread thread="theme" :metadata="metadata" /></div>
  <div v-if="postId && !nominations"><FetchNominations :postId="postId" /></div>
  <div v-if="nominations"><CommitTheme :nominations="nominations" /></div>
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
    postId: {
      type: String,
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