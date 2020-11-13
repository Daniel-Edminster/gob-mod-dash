<template>
  <ul>
    <li v-for="(winners, role) in winners" :key="role">
      <h4>{{ role }}</h4>
      <ul>
        <li v-for="winner in winners" :key="winner.id">
          {{ winner.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'WinnersTable',
  props: {
    winners: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>