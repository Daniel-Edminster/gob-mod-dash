<template>
	Round has ended. Time to listen!<br />
	<button @click="fetchSongs()">Fetch Songs</button
	><span v-if="message">{{ message }}</span>
	<div v-if="songs">
		<button @click="setProperty('songs', songs)">Commit Songs to Round</button>
		<SongsList :songs="songs" />
	</div>
</template>

<script>
import SongsList from "../shared/SongsList";

export default {
	name: "RoundOver",
	components: {
		SongsList,
	},
	props: {
		number: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			message: null,
			songs: null,
		};
	},
	inject: ["setProperty"],
	methods: {
		async fetchSongs() {
         const response = await fetch(`http://localhost:3000/api/gob?fetchSongs=${this.number}`);
         const obj = await response.json();
			const { status, data } = obj;
			if (status.code === 200) this.songs = data;
			this.message = `${status.code} ${status.text}.`;
		}
	},
};
</script>