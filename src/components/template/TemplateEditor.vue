<template>
	<div id="template-editor">
		<form>
			<div class="form-input">
				<label for="title">Title</label>
				<input
					id="title"
					name="title"
					type="text"
					:value="template.title"
					@input="setProperty($event)"
				/>
			</div>
			<div class="form-input">
				<label for="body">Body</label>
				<textarea
					id="body"
					name="body"
					rows="30"
					:value="template.body"
					@input="setProperty($event)"
				/>
			</div>
		</form>
		<div>Template saves automatically</div>
		<div id="macros">
			%num = round number<br />
			%theme = round theme
		</div>
    <p>Note: Macros will only update when the template is previewed in the Round view.</p>
	</div>
</template>

<script>
export default {
	name: "TemplateEditor",
	props: {
		template: {
			type: Object,
			required: true,
		},
	},
	inject: ["setProperty"],
};
</script>

<style scoped>
div#template-editor {
  padding: 15px;
}

label {
	text-transform: uppercase;
	font-size: 0.9rem;
	font-weight: bold;
	text-align: left;
}

input {
	background-color: black;
	color: white;
	flex-grow: 1;
}

textarea {
	background-color: black;
	color: white;
	margin: 5px;
	flex-grow: 1;
}

#macros {
	font-size: 0.8rem;
}

.form-input {
	width: 100%;
	display: flex;
	flex-direction: column;
}
</style>