<template>
  <a :href="`http://www.reddit.com/by_id/${postId}`">Theme Nomination Thread</a><br />
  <p>Press the button to fetch nominations from thread.</p>
  <button @click="fetchNominations()">Fetch Nominations</button>
  <p v-if="message">{{ message }}</p>
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
      message: null
		};
	},
	inject: ["setPool"],
	methods: {
		async fetchNominations() {
      const comments = await reddit.fetchComments(this.postId);
      if (comments.length == 0) {
        console.log("No comments :(")
        this.message = "No comments in thread :("
        return;
      } else {
        const pool = mapCommentsToNoms(comments);
        this.setPool("theme", pool);
      }
		},
	},
};
</script>