<template>
  <div>Theme Index</div>
  <div v-if="!postId">Post Thread</div>
  <div v-if="postId">Fetch Nominations</div>
  <div v-if="nominations">Determine Winning Theme</div>
</template>

<script>
export default {
  name: "ThemeIndex",
  props: {
    number: {
      type: Number,
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