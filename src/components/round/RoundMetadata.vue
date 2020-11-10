<template>
	<div>
		Number: {{ round.number }}<br />
		Theme: {{ round.theme }}
	</div>
</template>

<script>
export default {
	name: "RoundMetadata",
	props: {
		round: {
			type: Object,
			required: true,
		},
	},
};
</script>