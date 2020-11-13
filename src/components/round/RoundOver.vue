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
import gob from "@/js/api/gob";

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
			const obj = await gob.fetchSongs(this.number);
			const { status, data } = obj;
			if (status.code === 200) this.songs = data;
			this.message = `${status.code} ${status.text}.`;
		}
	},
};
</script>