<template>
  <p>The following people could not be placed:</p>
  <ul>
    <li v-for="angel in angels" :key="angel.name">
      {{ angel }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AngelsList',
  props: {
    angels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>