<template>
  <div>Theme Index</div>
  <div v-if="!postId"><PostThread thread="theme" :metadata="metadata" /></div>
  <div v-if="postId">Fetch Nominations from {{ postId }}</div>
  <div v-if="nominations">Determine Winning Theme</div>
</template>

<script>
import PostThread from "../shared/PostThread"

export default {
  name: "ThemeIndex",
  components: {
    PostThread
  },
  props: {
    number: {
      type: String,
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
  },
  computed: {
    metadata() {
      return {
        number: this.number
      }
    }
  }
}
</script>