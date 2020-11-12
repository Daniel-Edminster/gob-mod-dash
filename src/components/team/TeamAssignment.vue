<template>
	<p>
		There are {{ participants.length }} participants awaiting team assignment
	</p>
	<button @click="assignTeams">Assign Teams</button>
	<AngelsList v-if="angels" :angels="angels" />
	<TeamsList v-if="teams" :teams="teams" />
	<ParticipantTable :participants="triples" />
	<ParticipantTable :participants="duals" />
	<ParticipantTable :participants="singles" />
</template>

<script>
import AngelsList from "./AngelsList";
import ParticipantTable from "../shared/ParticipantTable";
import TeamsList from "./TeamsList";
import { createTeams } from "@/js/functions/gob/team";

export default {
	name: "TeamAssignment",
	components: {
		AngelsList,
		ParticipantTable,
		TeamsList,
	},
	props: {
		participants: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			teams: null,
			angels: null,
		};
	},
	computed: {
		triples() {
			return this.participants.filter((participant) =>
				this.matchRoleLength(participant, 3)
			);
		},
		duals() {
			return this.participants.filter((participant) =>
				this.matchRoleLength(participant, 2)
			);
		},
		singles() {
			return this.participants.filter((participant) =>
				this.matchRoleLength(participant, 1)
			);
		},
	},
	inject: ["returnAngels", "setTeams"],
	methods: {
		assignTeams() {
			const { teams, angels } = createTeams(this.participants);
			this.teams = teams;
			this.angels = angels;
			if (teams.length > 0) {
				this.setTeams(teams);
				this.returnAngels(angels);
			} else {
				console.log("No teams created. Insufficient Participants.");
			}
		},
		matchRoleLength(participant, length) {
			return participant.roles.length == length;
		},
	},
};
</script>

<style scoped>
ul {
	list-style-type: none;
	padding: 0;
}

span {
	margin-right: 5px;
}
</style>