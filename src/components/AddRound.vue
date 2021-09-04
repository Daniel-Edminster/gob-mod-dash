<template>
	<form @submit.prevent="submitNew">
		<label for="number">Round Number</label>
		<input ref="round-num" id="number" name="number" type="text" v-model="number" />
		<button type="submit">Create Round</button>
		<p v-if="message">{{ message }}</p>
	</form>
</template>

<script>
export default {
	name: "AddRound",
	data() {
		return {
			number: null,
			message: null,
		};
	},
	methods: {
		async submitNew() {
			if (this.number > 0) {
				const result = await this.$store.dispatch(
					"rounds/createRound",
					this.number
				);
				this.message = result;
            this.number = null;
			} else {
        this.message = "Round number must be greater than zero."
      }
		},
	},
};
</script>