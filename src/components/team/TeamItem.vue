<template>
  <div>
    <p>Team {{ team.number }}</p>
    <ul>
      <li v-for="user in team.members" :key="user.name">
        {{ user.roles[0] }}: {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TeamItem',
  props: {
    team: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
div {
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  flex-grow: 1;
}

p {
  margin-top: 0;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
</style>