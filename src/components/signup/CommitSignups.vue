<template>
	<div>
    <button @click="setParticipants(signups)">Commit Participants to Round</button>
		<ul>
			<li v-for="signup in signups" :key="signup.name">{{ signup }}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		signups: {
			type: Array,
			required: true,
		},
	},
	inject: ["setParticipants"],
};
</script>

<style scoped>
ul {
	list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>