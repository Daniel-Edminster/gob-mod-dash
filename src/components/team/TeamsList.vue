<template>
  <ul>
    <TeamItem v-for="team in teams" :key="team.number" :team="team" />
  </ul>
</template>

<script>
import TeamItem from "./TeamItem"

export default {
  name: 'TeamsList',
  components: {
    TeamItem
  },
  props: {
    teams: {
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
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}
</style>