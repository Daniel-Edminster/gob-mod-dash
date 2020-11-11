<template>
	<div id="template-preview">
		<h4>{{ parseString(template.title) }}</h4>
		<VueMarkdownIt :source="parseString(template.body)" />
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
		metadata: {
			type: Object,
			required: false,
			default: null,
		},
	},
  methods: {
    parseString(string) {
      if (this.metadata) {
        return parseMacros(string, this.metadata);
      } else {
        return string;
      }
    }
  }
};
</script>