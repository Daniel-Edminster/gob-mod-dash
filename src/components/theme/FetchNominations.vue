<template>
  <a :href="`http://www.reddit.com/by_id/${postId}`">Theme Nomination Thread ({{ postId }})</a><br />
  <button @click="fetchNominations()">Fetch Nominations</button>
</template>

<script>
import reddit from "@/js/api/reddit";
import { mapCommentsToNoms } from "@/js/functions/gob/theme";

export default {
	name: "FetchNominations",
	props: {
		postId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			nominations: null,
		};
	},
	inject: ["setPool"],
	methods: {
		async fetchNominations() {
			const comments = await reddit.fetchComments(this.postId);
			const pool = mapCommentsToNoms(comments);
			this.setPool("theme", pool);
		},
	},
};
</script>