<template>
	<ThemeIndex
		v-if="!round.theme"
		:number="round.number"
		:postId="round.threads.theme"
		:nominations="round.pools.theme"
	/>
	<SignupIndex
		v-if="!round.participants"
		:number="round.number"
    :theme="round.theme"
		:postId="round.threads.signup"
		:signups="round.pools.signup"
	/>
	<div v-else>Participants commited to round</div>
</template>

<script>
// this component handles displaying the appropriate component
// based on what stage the round is at. As it contains a lot of imports
// and if checks, it's its own component.
import ThemeIndex from "@/components/theme/ThemeIndex";
import SignupIndex from "@/components/signup/SignupIndex"

export default {
	name: "StageWrapper",
	components: {
    ThemeIndex,
    SignupIndex
	},
	props: {
		round: {
			type: Object,
			required: true,
		},
	},
};
</script>