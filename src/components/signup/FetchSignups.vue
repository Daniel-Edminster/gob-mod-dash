<template>
  <a :href="`http://www.reddit.com/by_id/${postId}`">Signups Thread ({{ postId }})</a><br />
  <button @click="fetchSignups()">Fetch Signups</button>
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
			signups: null,
		};
	},
	inject: ["setPool"],
	methods: {
		async fetchSignups() {
			const comments = await reddit.fetchComments(this.postId);
      const pool = mapCommentsToSignups(comments);
      console.log(pool);
			this.setPool("signup", pool);
		},
	},
};
</script>