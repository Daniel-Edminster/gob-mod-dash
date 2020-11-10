<template>
	<ThemeIndex
		v-if="!round.theme"
    :number="round.number"
		:postId="round.threads.theme"
		:nominations="round.pools.theme"
	/>
</template>

<script>
// this component handles displaying the appropriate component
// based on what stage the round is at. As it contains a lot of imports
// and if checks, it's its own component.
import ThemeIndex from "@/components/theme/ThemeIndex";

export default {
	name: "StageWrapper",
	components: {
		ThemeIndex,
	},
	props: {
		round: {
			type: Object,
			required: true,
		},
	},
};
</script>