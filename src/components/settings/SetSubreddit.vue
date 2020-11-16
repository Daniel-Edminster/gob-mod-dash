<template>
	<div>
		<p>
			Current Subreddit: <span class="subreddit">/r/{{ getSubreddit }}</span>
		</p>
		<form @submit.prevent="setSubreddit">
			<label for="subreddit">Subreddit</label>
			<input type="text" name="subreddit" v-model="value" />
			<button type="submit">Save</button>
			<p v-if="message">{{ message }}</p>
		</form>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "SetSubreddit",
	data() {
		return {
			value: null,
			message: null,
		};
	},
	computed: mapGetters("settings", ["getSubreddit"]),
	methods: {
		async setSubreddit() {
			this.message = "Checking subreddit exists and user mod status...";
			const result = await this.$store.dispatch(
				"settings/setSubreddit",
				this.value
			);
			this.message = result;
		},
	},
};
</script>

<style scoped>
span.subreddit {
	font-weight: bold;
}
</style>