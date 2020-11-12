<template>
	<table>
		<thead>
			<tr>
				<th colspan="2">Game of Bands API Testing</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<button @click="testGOBApi('fetchBandits')">Fetch Bandits</button>
				</td>
				<td class="description">
					Return all users who have participated in GOB
				</td>
			</tr>
			<tr>
				<td>
					<button @click="testGOBApi('fetchVeterans')">Fetch Veterans</button>
				</td>
				<td class="description">
					Return all users who have played more than 5 rounds
				</td>
			</tr>
			<tr>
				<td>
					<button @click="testGOBApi('fetchThemes')">Fetch Themes</button>
				</td>
				<td class="description">
					Return list of rounds with themes and songcounts
				</td>
			</tr>
			<tr>
				<td><button @click="fetchSongs()">Fetch Songs</button></td>
				<td class="description">
					Return songs for round:
					<input type="nuumber" v-model="songRoundNumber" />
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="2">
					<span id="gobmessage">{{ message }}</span>
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<script>
import gob from "@/js/api/gob";

export default {
	name: "DebugGOB",
	data() {
		return {
			message: null,
      songRoundNumber: 1,
      messageElement: null
		};
	},
	methods: {
    setFetchingMessage() {
      this.messageElement.className = 'fetch';
			this.message = "fetching request...";
    },
		async testGOBApi(func) {
      this.setFetchingMessage();
			const obj = await gob[func]();
			this.handleResponse(obj);
		},
		async fetchSongs() {
      this.setFetchingMessage();
			const obj = await gob.fetchSongs(this.songRoundNumber);
			this.handleResponse(obj);
		},
		handleResponse(obj) {
			const { status, data } = obj;
			this.message = `${status.code} ${status.text}.`;
			if (status.code === 200) {
        console.log(data);
				this.messageElement.className = "ok";
				this.message += " Check console for data.";
			} else {
				this.messageElement.className = "bad";
			}
		},
  },
  mounted() {
    this.messageElement = document.getElementById('gobmessage');
  }
};
</script>

<style scoped>
td.description {
	font-size: 0.8rem;
	text-align: left;
}

button {
	width: 100%;
}

span.ok {
	color: greenyellow;
}

span.bad {
	color: salmon;
}

span.fetch {
  color: white;
}
</style>