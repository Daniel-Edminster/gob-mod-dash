<template>
  <ul>
    <li v-for="team in teams" :key="team.number">
      <TeamItem v-for="team in teams" :key="team.number" :team="team" />
    </li>
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