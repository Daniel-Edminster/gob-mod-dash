<template>
	<form @submit.prevent="submitNew">
		<label for="name"
			>Enter a name for the new template: (3 characters or more)</label
		><br />
		<input id="name" name="name" type="text" v-model="name" />
		<button type="submit">Create Template</button>
		<p v-if="message">{{ message }}</p>
	</form>
</template>

<script>
export default {
	name: "AddRound",
	data() {
		return {
			name: null,
			message: null,
		};
	},
	methods: {
		async submitNew() {
      if (!this.name) {
        this.message = "Please enter a name";
        console.log(this.message);
      } else if (this.name.length < 3) {
				this.message = "Name must be at least 3 characters";
				console.log(this.message);
				return;
			} else {
        console.log("Creating template", this.name);
				this.message = await this.$store.dispatch("templates/createTemplate", this.name);
			}
		},
	},
};
</script>