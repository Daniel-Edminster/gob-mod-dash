<template>
  <ul>
    <li v-for="(team, index) in teams" :key="index">
      {{ index + 1 }}: {{ team.music.name }} | {{ team.lyrics.name }} | {{ team.vocals.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TeamsList',
  props: {
    teams: {
      type: Array,
      required: true
    }
  }
}
</script>