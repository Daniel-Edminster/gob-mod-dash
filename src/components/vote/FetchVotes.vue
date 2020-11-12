<template>
	<a :href="`http://www.reddit.com/by_id/${postId}`"
		>Voting Thread ({{ postId }})</a
	><br />
	<button @click="fetchVotes()">Fetch Votes</button>
	<p v-if="message">{{ message }}</p>
</template>

<script>
import reddit from "@/js/api/reddit";
import { mapCommentsToVotes } from "@/js/functions/gob/vote-reddit";

export default {
	name: "FetchSignups",
	props: {
		postId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			votes: null,
			message: null,
		};
	},
	inject: ["setPool"],
	methods: {
		async fetchVotes() {
			const comments = await reddit.fetchComments(this.postId);
			if (comments.length == 0) {
				this.message = "No votes found";
				console.log("No votes found");
				return;
			} else {
				const pool = mapCommentsToVotes(comments);
				console.log(pool);
				const array = Array.from(pool);
				this.setPool("voting", array);
			}
		},
	},
};
</script>