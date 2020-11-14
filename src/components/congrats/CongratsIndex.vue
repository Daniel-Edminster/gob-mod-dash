<template>
	<div v-if="!postId">
		<PostThread
			v-if="template"
			thread="congrats"
			:metadata="metadata"
			:forceTemplate="template"
		/>
		<button v-else @click="constructWinnersThread">
			Construct Winners Thread
		</button>
	</div>
	<div v-else>
		<p>
			Congrats thread has been posted! This concludes the round.
		</p>
	</div>
</template>

<script>
import PostThread from "../shared/PostThread";
import { constructWinnersThread } from "@/js/functions/gob/congrats-reddit";

export default {
	name: "CongratsIndex",
	components: {
		PostThread,
	},
	props: {
		winners: {
			type: Object,
			required: true,
		},
		teams: {
			type: Array,
			required: true,
		},
		metadata: {
			type: Object,
			required: true,
		},
		postId: {
			type: String,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			template: null,
		};
  },
  inject: ['setProperty'],
	methods: {
		constructWinnersThread() {
			const title = `Congratulations to the Winners of Round %num: %theme`;
			const body = constructWinnersThread(this.winners, this.teams);
			this.template = { title, body };
			console.log("Saved Template", this.template);
		},
	},
};
</script>