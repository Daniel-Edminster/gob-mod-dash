<template>
	<div id="round-metadata">
		<table id="metadata">
			<thead>
        <tr><th colspan="3">Metadata</th></tr>
				<tr>
					<th>Property</th>
					<th>Value / Size</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Number</td>
					<td>
						{{ round.number }}
					</td>
					<td></td>
				</tr>
				<tr v-if="round.theme">
					<td>Theme</td>
					<td>{{ round.theme }}</td>
					<td><button>Clear Theme</button></td>
				</tr>
				<tr v-if="round.participants">
					<td>Participants</td>
					<td>{{ round.participants.length }}</td>
					<td>
						<button @click="clearProperty('participants')">
							Clear Participants
						</button>
					</td>
				</tr>
				<tr v-if="round.teams">
					<td>Teams</td>
					<td>{{ round.teams.length }}</td>
					<td><button @click="clearProperty('teams')">Clear Teams</button></td>
				</tr>
				<tr v-if="round.songs">
					<td>Songs</td>
					<td>{{ round.songs.length }}</td>
					<td><button @click="clearProperty('songs')">Clear Songs</button></td>
				</tr>
			</tbody>
		</table>
		<RoundThreads :threads="round.threads" />
		<RoundPools :pools="round.pools" />
	</div>
</template>

<script>
import RoundPools from "./RoundPools";
import RoundThreads from "./RoundThreads";

export default {
	name: "RoundMetadata",
	components: {
		RoundPools,
		RoundThreads,
	},
	props: {
		round: {
			type: Object,
			required: true,
		},
	},
	inject: ["clearProperty"],
};
</script>

<style scoped>
div#round-metadata {
	border-bottom: 1px solid black;
	margin-bottom: 15px;
	padding-bottom: 15px;
	display: flex;
	justify-content: space-evenly;
}

table {
	border: 1px solid black;
}

thead {
	background-color: lightgrey;
}
</style>