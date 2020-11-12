<template>
	<table>
		<thead>
			<tr>
				<th>Name</th>
        <th>ID</th>
        <th>Voting Comment ID</th>
        <th>Team</th>
        <th>Track</th>
        <th>Music</th>
        <th>Lyrics</th>
        <th>Vocals</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="song in songs" :key="song.id">
				<td>{{ song.name }}</td>
				<td>{{ song.id }}</td>
				<td>{{ song.comment }}</td>
        <td>{{ song.teamnumber }}</td>
				<td>{{ song.votes }}</td>
				<td>{{ song.musicvote }}</td>
				<td>{{ song.lyricsvote }}</td>
				<td>{{ song.vocalsvote }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "SongsList",
	props: {
		songs: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style scoped>
ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

thead {
  background: lightgrey;
}
</style>