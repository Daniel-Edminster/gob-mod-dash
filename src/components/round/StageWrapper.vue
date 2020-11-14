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
			v-if="
				round.participants && !round.songs && !round.active && !round.complete
			"
			:participants="round.participants"
			:teams="round.teams"
			:active="round.active"
		/>
		<LaunchIndex
			v-if="round.teams && round.active"
			:number="round.number"
			:theme="round.theme"
			:postId="round.threads.launch"
			:lateId="round.threads.late"
			:teams="round.teams"
			:active="round.active"
			:complete="round.complete"
			:participants="round.participants"
		/>
		<RoundOver v-if="round.complete && !round.songs" :number="round.number" />
		<VoteIndex
			v-if="!round.active && round.complete && round.songs && !round.winners"
			:number="round.number"
			:theme="round.theme"
			:postId="round.threads.voting"
			:songs="round.songs"
			:votes="round.pools.voting"
		/>
		<CongratsIndex
			v-if="round.winners"
			:winners="round.winners"
			:teams="round.teams"
			:metadata="metadata"
		/>
	</div>
</template>

<script>
// this component handles displaying the appropriate component
// based on what stage the round is at. As it contains a lot of imports
// and if checks, it's its own component.
import CongratsIndex from "@/components/congrats/CongratsIndex";
import LaunchIndex from "@/components/launch/LaunchIndex";
import TeamIndex from "@/components/team/TeamIndex";
import ThemeIndex from "@/components/theme/ThemeIndex";
import RoundOver from "./RoundOver";
import SignupIndex from "@/components/signup/SignupIndex";
import VoteIndex from "@/components/vote/VoteIndex";

export default {
	name: "StageWrapper",
	components: {
		CongratsIndex,
		LaunchIndex,
		RoundOver,
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
	computed: {
		metadata() {
			return {
				number: this.round.number,
				theme: this.round.theme,
			};
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
	align-items: center;
	justify-content: flex-start;
}
</style>