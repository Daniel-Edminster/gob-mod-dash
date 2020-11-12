<template>
	<div id="round-metadata">
		<table id="metadata">
			<thead>
        <tr><th colspan="3">Metadata</th></tr>
				<tr>
					<th>Property</th>
					<th>Value</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Number</td>
					<td>
						{{ round.number }}
					</td>
					<td>n/a</td>
				</tr>
				<tr v-if="round.theme">
					<td>Theme</td>
					<td>{{ round.theme }}</td>
					<td><button>Clear</button></td>
				</tr>
				<tr v-if="round.participants">
					<td>Participants</td>
					<td>{{ round.participants.length }}</td>
					<td>
						<button @click="clearProperty('participants')">
							Clear
						</button>
					</td>
				</tr>
				<tr v-if="round.teams">
					<td>Teams</td>
					<td>{{ round.teams.length }}</td>
					<td><button @click="clearProperty('teams')">Clear</button></td>
				</tr>
				<tr v-if="round.songs">
					<td>Songs</td>
					<td>{{ round.songs.length }}</td>
					<td><button @click="clearProperty('songs')">Clear</button></td>
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
  background-color: #322838;
  color: white;
	padding-bottom: 15px;
	display: flex;
	justify-content: space-evenly;
}
table {
	border: 1px solid black;
  border-spacing: 1px;
  margin: 15px;
}

td {
  padding: 3px;
}

thead {
  background-color: #2d2b38;
  color: white;
}

tbody {
  background-color: #3c3548;
  font-size: .9rem;
}
</style>