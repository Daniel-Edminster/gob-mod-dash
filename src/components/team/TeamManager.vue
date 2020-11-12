<template>
  <h4>Team Manager</h4>
  <p>Here is where you will be able to adjust teams before beginning the round.</p>
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
  inject: ['setActive'],
  mounted() {
    console.log(this.participants);
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