<template>
  <TeamAssignment v-if="!teams" :participants="participants" />
  <TeamManager v-if="teams" :teams="teams" :participants="participants" :active="active" />
</template>

<script>
import TeamAssignment from "./TeamAssignment"
import TeamManager from "../shared/TeamManager"

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
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  
}
</script>