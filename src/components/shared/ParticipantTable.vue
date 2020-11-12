<template>
  <h4>{{ heading }}</h4>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Music</th>
				<th>Lyrics</th>
				<th>Vocals</th>
			</tr>
			<tr>
				<th>Number</th>
				<th>{{ music }}</th>
				<th>{{ lyrics }}</th>
				<th>{{ vocals }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="participant in participants" :key="participant.name">
				<td>{{ participant.name }}</td>
				<td><span v-if="participant.roles.includes('music')">Y</span></td>
				<td><span v-if="participant.roles.includes('lyrics')">Y</span></td>
				<td><span v-if="participant.roles.includes('vocals')">Y</span></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "ParticipantTable",
	props: {
		participants: {
			type: Array,
			required: true,
    },
    heading: {
      type: String,
      required: false,
      default: 'Participants'
    }
	},
	computed: {
		music() {
			let num = 0;
			this.participants.forEach((participant) => {
				if (participant.roles.includes("music")) num++;
			});
			return num;
    },
    lyrics() {
			let num = 0;
			this.participants.forEach((participant) => {
				if (participant.roles.includes("lyrics")) num++;
			});
			return num;
    },
    vocals() {
			let num = 0;
			this.participants.forEach((participant) => {
				if (participant.roles.includes("vocals")) num++;
			});
			return num;
		},
	},
};
</script>

<style scoped>
table {
	border: 1px solid black;
  border-spacing: 1px;
}

td {
  padding: 3px;
  width: 25%;
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