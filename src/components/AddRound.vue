<template>
  <form @submit.prevent="submitNew">
		<label for="number">Round Number</label>
		<input id="number" name="number" type="text" v-model="number" />
		<button type="submit">Create Round</button>
	</form>
</template>

<script>
export default {
  name: "AddRound",
  data() {
    return {
      number: null
    }
  },
  methods: {
    submitNew() {
      this.$store.dispatch('rounds/createRound', this.number);
    }
  }
}
</script>