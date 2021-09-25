<template>
	<table>
		<thead>
			<tr>
				<th>Number</th>
				<th>Theme</th>
				<th>Participants</th>
				<th>Teams</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="round in roundsList" :key="round.number">
				<td>
					<router-link :to="`/rounds/${round.number}`">{{
						round.number
					}}</router-link>
				</td>
				<td><span><router-link :to="`/rounds/${round.number}`">{{ round.theme }}</router-link></span></td>
				<td><span>{{ round.numParticipants }}</span></td>
				<td><span>{{ round.numTeams }}</span></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "RoundsList",
	computed: mapState("rounds", ["roundsList"]),
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