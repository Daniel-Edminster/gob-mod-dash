<template>
	<a :href="`http://www.reddit.com/by_id/${postId}`"
		>Signups Thread</a
	><p>Press the button to fetch signups from thread.</p>
	<button @click="fetchSignups()">Fetch Signups</button>
	<p v-if="message">{{ message }}</p>
</template>

<script>
import reddit from "@/js/api/reddit";
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
			message: null,
		};
	},
	inject: ["setPool"],
	methods: {
		async fetchSignups() {
			const comments = await reddit.fetchComments(this.postId);
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