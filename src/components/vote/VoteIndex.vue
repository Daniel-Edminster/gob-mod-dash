<template>
  Vote Index
  {{ songs }}
</template>

<script>
export default {
  name: 'VoteIndex',
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
    songs: {
      type: Array,
      required: true
    }
  }
}
</script>