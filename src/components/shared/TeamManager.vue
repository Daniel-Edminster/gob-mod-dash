<template>
	<h4>Team Manager</h4>
	<div v-if="!active">
		<p>
			Here is where you will be able to adjust teams before beginning the round.
		</p>
		<button @click="setActive()">Activate Round</button>
	</div>
  <div v-else>
    Round is currently active. <button @click="endRound()">End Round</button>
  </div>
	<ParticipantTable :participants="participants" heading="Unplaced" />
	<TeamsList :teams="teams" />
</template>

<script>
import ParticipantTable from "./ParticipantTable";
import TeamsList from "../team/TeamsList";

export default {
	name: "TeamManager",
	components: {
		ParticipantTable,
		TeamsList,
	},
	props: {
		participants: {
			type: Array,
			required: false,
			default: null,
		},
		teams: {
			type: Array,
			required: true,
			default: null,
		},
		active: {
			type: Boolean,
			required: true,
		},
	},
	inject: ["endRound", "setActive"],
	mounted() {
    console.log(this.participants);
    console.log(this.teams);
	},
};
</script>