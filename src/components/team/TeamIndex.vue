<template>
  Team Index<br />
  <TeamAssignment v-if="!teams" :participants="participants" />
  <TeamManager v-if="teams" :teams="teams" :participants="participants" />
</template>

<script>
import TeamAssignment from "./TeamAssignment"
import TeamManager from "./TeamManager"

export default {
  name: 'TeamIndex',
  components: {
    TeamAssignment,
    TeamManager
  },
  props: {
    participants: {
      type: Array,
      required: true
    },
    teams: {
      type: Array,
      required: false,
      default: null
    }
  },
  
}
</script>