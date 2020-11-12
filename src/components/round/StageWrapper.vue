<template>
	<div id="stage-wrapper">
		<ThemeIndex
			v-if="!round.theme"
			:number="round.number"
			:postId="round.threads.theme"
			:nominations="round.pools.theme"
		/>
		<SignupIndex
			v-if="round.theme && !round.participants"
			:number="round.number"
			:theme="round.theme"
			:postId="round.threads.signup"
			:signups="round.pools.signup"
		/>
		<TeamIndex
			v-if="round.participants && !round.songs && !round.active"
			:participants="round.participants"
			:teams="round.teams"
		/>
		<LaunchIndex
			v-if="round.teams && round.active"
			:number="round.number"
			:theme="round.theme"
			:postId="round.threads.launch"
			:lateId="round.threads.late"
			:teams="round.teams"
			:songs="round.songs"
		/>
		<VoteIndex
			v-if="!round.active && round.threads.late && round.songs"
			:number="round.number"
			:theme="round.theme"
			:postId="round.threads.voting"
			:songs="round.songs"
			:votes="round.pools.voting"
		/>
	</div>
</template>

<script>
// this component handles displaying the appropriate component
// based on what stage the round is at. As it contains a lot of imports
// and if checks, it's its own component.
import LaunchIndex from "@/components/launch/LaunchIndex";
import TeamIndex from "@/components/team/TeamIndex";
import ThemeIndex from "@/components/theme/ThemeIndex";
import SignupIndex from "@/components/signup/SignupIndex";
import VoteIndex from "@/components/vote/VoteIndex";

export default {
	name: "StageWrapper",
	components: {
		LaunchIndex,
		TeamIndex,
		ThemeIndex,
		SignupIndex,
		VoteIndex,
	},
	props: {
		round: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
div#stage-wrapper {
  background-color: #2d2b38;
  color: white;
  display: flex;
  flex-direction: column;
}
</style>