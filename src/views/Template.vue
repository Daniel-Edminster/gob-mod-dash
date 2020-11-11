<template>
	<div id="template-viewer">
		<TemplateEditor v-if="template" :template="template" />
		<div v-else>Loading Template: {{ name }}</div>
		<TemplatePreview v-if="template" :template="template" />
	</div>
</template>

<script>
import TemplateEditor from "@/components/template/TemplateEditor";
import TemplatePreview from "@/components/shared/TemplatePreview";

export default {
	name: "Template",
	components: {
		TemplateEditor,
		TemplatePreview,
	},
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			template: null,
		};
	},
	provide() {
		return {
			setProperty: this.setProperty,
		};
	},
	methods: {
		fetchTemplate(name) {
			const template = this.$store.getters["templates/getTemplateByName"](name);
			if (template) {
				this.template = template;
				console.log(template);
			} else {
				console.log("No Template Found");
			}
		},
		setProperty(event) {
			const key = event.target.name;
			const value = event.target.value;
			this.template[key] = value;
			this.$store.dispatch("templates/saveTemplates");
		},
	},
	created() {
		this.fetchTemplate(this.name);
	},
};
</script>

<style scoped>
#template-viewer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>