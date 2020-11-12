<template>
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