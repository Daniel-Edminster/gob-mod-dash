<template>
	<div id="template-preview">
		<h3 id="title" v-if="template.title">{{ parseString(template.title) }}</h3>
		<VueMarkdownIt id="body" :source="parseString(template.body)" />
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

<style>
div#template-preview {
  text-align: left;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#title, #body{
   
   padding: 0 15px 15px 15px;
}

#body {
  max-width: 80ch;
  background-color: #26242b;
  /* background: black; */
  border: 1px solid white;
}
</style>