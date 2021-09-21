<template>
   <p>Press the button to fetch votes from thread.</p>
	<button @click="fetchVotes()">Fetch Votes</button>
	<p v-if="message">{{ message }}</p>
   <base-spinner v-if="isLoading" />
</template>

<script>
import { mapState } from 'vuex';
import { mapCommentsToVotes } from "@/js/functions/gob/vote-reddit";

export default {
	name: "FetchSignups",
	props: {
		postId: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
         isLoading: false,
			votes: null,
			message: null,
		};
	},
   computed: mapState('auth', ['reddit']),
	inject: ["setPool"],
	methods: {
		async fetchVotes() {
         this.message = "Fetching votes from reddit...";
         this.isLoading = true;
			const comments = await this.reddit.fetchComments(this.postId);
         this.isLoading = false;
			if (comments.length == 0) {
				this.message = "No votes found";
				console.log("No votes found");
				return;
			} else {
            this.message = "Votes collected."
				const pool = mapCommentsToVotes(comments);
				console.log(pool);
				this.setPool("voting", pool);
			}
		},
	},
};
</script>