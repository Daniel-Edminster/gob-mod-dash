<template>
	<table>
		<thead>
			<tr>
				<th>Number</th>
				<th>Theme</th>
				<th>Participants</th>
				<th>Teams</th>
				<th>Songs</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="round in rounds" :key="round.number">
				<td>
					<router-link :to="`/rounds/${round.number}`">{{
						round.number
					}}</router-link>
				</td>
				<td><span v-if="round.theme"><router-link :to="`/rounds/${round.number}`">{{ round.theme.title }}</router-link></span></td>
				<td><span v-if="round.participants">{{ round.participants.length }}</span></td>
				<td><span v-if="round.teams">{{ round.teams.length }}</span></td>
				<td><span v-if="round.songs">{{ round.songs.length }}</span></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "RoundsList",
	computed: mapState("rounds", ["rounds"]),
};
</script>

<style scoped>
table {
	border-spacing: 1px;
	margin: 15px;
}

thead {
	background-color: #2d2b38;
	color: white;
}

tbody {
	background-color: #3c3548;
	font-size: 0.9rem;
}

tfoot {
	font-size: 0.8rem;
	font-weight: bold;
}

th, td {
  padding: 3px 12px;
}
</style>