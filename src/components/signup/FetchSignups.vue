<template>
	<a :href="`http://www.reddit.com/by_id/${postId}`"
		>Signups Thread</a
	><p>Press the button to fetch signups from thread.</p>
	<button @click="fetchSignups()">Fetch Signups</button>
	<p v-if="message">{{ message }}</p>
   <base-spinner v-if="isLoading" />
</template>

<script>
import { mapState } from 'vuex';
import { mapCommentsToSignups } from "@/js/functions/gob/signup";

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
         isLoading: false,
			message: null,
		};
	},
   computed: mapState('auth', ['reddit']),
	inject: ["setPool"],
	methods: {
		async fetchSignups() {
         this.message = "Fetching signups, please wait...";
         this.isLoading = true;
			const comments = await this.reddit.fetchComments(this.postId);
         this.isLoading = false;
			if (comments.length == 0) {
				this.message = "No comments found in signup thread :(";
				console.log(this.message);
				return;
			} else {
				const pool = mapCommentsToSignups(comments);
				console.log(pool);
				this.setPool("signup", pool);
			}
		},
	},
};
</script>