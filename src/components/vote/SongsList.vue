<template>
  <ul>
    <li v-for="song in songs" :key="song.id">
      {{ song.name }} | {{ song.comment }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SongsList',
  props: {
    songs: {
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
  text-align: left;
  margin: 0;
}
</style>