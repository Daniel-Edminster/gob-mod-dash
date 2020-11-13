<template>
	<div>
		<ul>
			<li v-for="nom in nominations" :key="nom.url">{{ nom.body }}</li>
		</ul>
    <h4>Winning Theme</h4>
		<p v-if="!theme">{{ winningTheme.body }}<button @click="editTheme()">Approve and Edit Theme</button></p>
    <p v-if="theme"><input type="text" v-model="theme" />
    <button @click="setProperty('theme', theme)">Commit Theme to Round</button></p>
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
  data() {
    return {
      theme: null
    }
  },
	computed: {
		winningTheme() {
			return determineWinningTheme(this.nominations);
		},
	},
  inject: ["setProperty"],
  methods: {
    editTheme() {
      this.theme = this.winningTheme.body;
    }
  }
};
</script>

<style scoped>
ul {
	list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  font-size: .9rem;
  text-align: left;
}
</style>