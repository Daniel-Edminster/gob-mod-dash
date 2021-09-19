<template>
  <ul>
    <TeamItemFixed v-for="team in teams" :key="team.number" :team="team" :experience="experience" />
  </ul>
</template>

<script>
import TeamItemFixed from "./TeamItemFixed"

export default {
  name: 'TeamsListFixed',
  components: {
    TeamItemFixed
  },
  props: {
    teams: {
      type: Array,
      required: true
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