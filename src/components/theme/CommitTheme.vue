<template>
	<div>
		<ul>
			<li v-for="nom in nominations" :key="nom.url">{{ nom.body }}</li>
		</ul>
    <h4>Winning Theme</h4>
		{{ winningTheme.body }}
    <button @click="setTheme(winningTheme.body)">Commit Theme to Round</button>
	</div>
</template>

<script>
import { determineWinningTheme } from "@/js/functions/gob/theme";

export default {
	props: {
		nominations: {
			type: Array,
			required: true,
		},
	},
	computed: {
		winningTheme() {
			return determineWinningTheme(this.nominations);
		},
	},
	inject: ["setTheme"],
};
</script>

<style scoped>
ul {
	list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>