<template>
  <ul>
    <TeamItem v-for="team in teams" :key="team.number" :team="team" :obscure="obscure" :experience="experience" />
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
    },
    experience: {
       type: Object,
       required: true
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
  justify-content: space-around;
  text-align: left;
}
</style>