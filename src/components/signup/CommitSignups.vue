<template>
	<div>
    <button @click="setParticipants(signups)">Commit Participants to Round</button>
		<ParticipantTable :participants="signups" />
	</div>
</template>

<script>
import ParticipantTable from "../shared/ParticipantTable";

export default {
  name: 'CommitSignups',
  components: {
    ParticipantTable
  },
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