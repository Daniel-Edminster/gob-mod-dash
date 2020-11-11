<template>
  Team Manager
</template>

<script>
export default {
  name: 'TeamManager',
  props: {
    participants: {
      type: Array,
      required: false,
      default: null
    },
    teams: {
      type: Array,
      required: true,
      default: null
    }
  }
}
</script>