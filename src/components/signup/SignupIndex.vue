<template>
  <div>Signup Index</div>
  <div v-if="!postId"><PostThread thread="signup" :metadata="metadata" /></div>
  <div v-if="postId && !signups">Fetch Signups</div>
  <div v-if="signups">Commit Participants</div>
</template>

<script>
import PostThread from "../shared/PostThread";

export default {
  name: "SignupIndex",
  components: {
    PostThread
  },
  props: {
    number: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      required: true
    },
    postId: {
      type: String,
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
    metadata() {
      return {
        number: this.number,
        theme: this.theme
      }
    }
  }
}
</script>