<template>
	<h4>{{ heading }}</h4>
	<table>
		<thead>
			<tr>
            <th>DB</th>
				<th>Name</th>
				<th>Music</th>
				<th>Lyrics</th>
				<th>Vocals</th>
			</tr>
			<tr>
            <th>ID</th>
				<th>Number</th>
				<th>{{ music }}</th>
				<th>{{ lyrics }}</th>
				<th>{{ vocals }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="user in participants" :key="user.id || user.username">
            <td>
               <span v-if="user.id">{{ user.id }}</span>
            </td>
				<td>
					<span :class="user.experience">{{ user.username }}</span>
				</td>
				<td>
					<span
						v-if="user.roles.includes('music')"
						>Y</span
					>
				</td>
				<td>
					<span
						v-if="user.roles.includes('lyrics')"
						>Y</span
					>
				</td>
				<td>
					<span
						v-if="user.roles.includes('vocals')"
						>Y</span
					>
				</td>
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
			default: "Participants",
		},
		angels: {
			type: Boolean,
			required: false,
			default: false,
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
	}
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
	font-size: 0.9rem;
}

.noob {
	color: white;
}

.bandit {
	color: greenyellow;
}

.veteran {
	color: orange;
}
</style>