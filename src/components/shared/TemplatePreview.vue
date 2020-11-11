<template>
	<div id="template-preview">
		<h4>{{ template.title }}</h4>
		<VueMarkdownIt :source="parsedContent" />
	</div>
</template>

<script>
import VueMarkdownIt from "vue3-markdown-it";
import { parseMacros } from "@/js/functions/utils";

export default {
	components: {
		VueMarkdownIt,
	},
	props: {
		template: {
			type: Object,
			required: true,
		},
		round: {
			type: Object,
			required: false,
			default: null,
		},
	},
	computed: {
		parsedContent() {
			if (this.round) {
				return parseMacros(this.template.body, this.round);
			} else {
				return this.template.body;
			}
		},
	},
};
</script>