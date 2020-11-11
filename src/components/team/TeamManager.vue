<template>
  Team Manager
  <button @click="setActive()">Activate Round</button>
  <ul>
    <TeamItem v-for="team in teams" :key="team.number" :team="team" />
  </ul>
</template>

<script>
import TeamItem from "./TeamItem"

export default {
  name: 'TeamManager',
  components: {
    TeamItem
  },
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
  },
  inject: ['setActive']
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