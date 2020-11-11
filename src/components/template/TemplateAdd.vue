<template>
  <form @submit.prevent="submitNew">
		<label for="name">Enter a name for the new template:</label>
		<input id="name" name="name" type="text" v-model="name" />
		<button type="submit">Create Template</button>
	</form>
</template>

<script>
export default {
  name: "AddRound",
  data() {
    return {
      name: null
    }
  },
  methods: {
    submitNew() {
      console.log("Creating template", this.name);
      this.$store.dispatch('templates/createTemplate', this.name);
    }
  }
}
</script>