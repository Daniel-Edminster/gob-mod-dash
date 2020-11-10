<template>
  <ul>Round List
    <li v-for="round in rounds" :key="round.number">
      <router-link :to="`/rounds/${round.number}`">{{ round.number }}</router-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "RoundsList",
  computed: mapState('rounds', ['rounds'])
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>