<template>
  Select a template
  <select v-model="selected" @change="onChange($event)">
    <option disabled value="">Select a template</option>
    <option v-for="template in templates" :key="template.name" :value="template.name">{{ template.name }}</option>
  </select>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TemplatePicker",
  data() {
    return {
      selected: null
    }
  },
  inject: ['setTemplate'],
  computed: mapState("templates", ["templates"]),
  methods: {
    onChange(event) {
      this.setTemplate(event.target.value);
    }
  }
};
</script>