<template>
	<table>
		<thead>
			<tr>
				<th>Name</th>
        <th>ID</th>
        <th>Comment</th>
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
        <td v-if="editing === song.id">
          <input type="text" :id="`input-${song.id}`" :value="song.comment" />
          <button v-if="editing === song.id" @click="cancelEditing">Cancel</button>
          <button v-if="editing === song.id" :name="song.id" @click="confirmEdit($event)">Confirm</button>
        </td>
				<td v-else>{{ song.comment }}
          <button v-if="!editing" :name="song.id" @click="setEditing($event)">Edit</button>
        </td>
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
  data() {
    return {
      editing: false
    }
  },
  inject: ['setSongComment'],
  methods: {
    setEditing(event) {
      this.editing = event.target.name;
    },
    cancelEditing() {
      this.editing = null;
    },
    confirmEdit(event) {
      const key = event.target.name;
      const input = document.getElementById(`input-${key}`);
      const value = input.value;
      console.log(`Setting thread ${key} to ${value}`);
      this.setSongComment(key, value);
      this.editing = null;
    }
  }
};
</script>

<style scoped>
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