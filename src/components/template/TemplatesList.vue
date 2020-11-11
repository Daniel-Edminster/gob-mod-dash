<template>
  <ul>Template List
    <li v-for="template in templates" :key="template.name">
      <router-link :to="`/templates/${template.name}`">{{ template.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "TemplatesList",
  computed: mapState('templates', ['templates'])
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>