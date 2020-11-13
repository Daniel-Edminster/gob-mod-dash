<template>
  <ul>
    <TeamItem v-for="team in teams" :key="team.number" :team="team" :obscure="obscure" />
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
    },
    obscure: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}
</style>