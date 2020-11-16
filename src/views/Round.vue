<template>
	<RoundDashboard v-if="round" :round="round" />
	<StageWrapper v-if="round" :round="round" />
	<div v-else>Round {{ id }} does not exist</div>
</template>

<script>
import RoundDashboard from "@/components/round/RoundDashboard";
import StageWrapper from "@/components/round/StageWrapper";
import { addDays } from "@/js/functions/utils";

export default {
	name: "Round",
	components: {
		RoundDashboard,
		StageWrapper,
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			round: null,
		};
	},
	provide() {
		return {
			checkComment: this.checkComment,
			clearBoolean: this.clearBoolean,
			clearProperty: this.clearProperty,
			endRound: this.endRound,
			returnAngels: this.returnAngels,
			setActive: this.setActive,
			setComment: this.setComment,
			setDate: this.setDate,
			setProperty: this.setProperty,
			setPool: this.setPool,
			setSongComment: this.setSongComment,
			setThread: this.setThread,
			swapAngel: this.swapAngel,
			swapBandits: this.swapBandits,
		};
	},
	methods: {
		fetchRound(id) {
			const number = id;
			const round = this.$store.getters["rounds/getRoundByNumber"](number);
			if (round) return round;
			return null;
		},
		checkComment(comment) {
			const { type, number } = comment;
			if (type === "team") {
				const team = this.round.teams.find((team) => team.number === number);
				if (team.comment) return true;
				return false;
			} else if (type === "song") {
				const song = this.round.songs.find((song) => song.id === number);
				if (song.comment) return true;
				return false;
			}
		},
		clearBoolean(key) {
			this.round[key] = false;
			this.saveRounds();
		},
		clearProperty(key) {
			this.round[key] = null;
			this.saveRounds();
		},
		endRound() {
			this.round.active = false;
			this.round.complete = true;
			this.saveRounds();
		},
		returnAngels(angels) {
			this.round.participants = angels;
			this.saveRounds();
		},
		setActive() {
			this.round.active = true;
			this.saveRounds();
		},
		setComment(comment, id) {
			const { type, number } = comment;
			if (type === "team") {
				const team = this.round.teams.find((team) => team.number === number);
				team.comment = id;
				this.saveRounds();
			} else if (type === "song") {
				const song = this.round.songs.find((song) => song.id === number);
				song.comment = id;
				this.saveRounds();
			}
		},
		setDate(key, value) {
			const date = new Date(value);
			if (key === "begin") date.setHours(20);
			if (key === "end") {
				date.setHours(5);
				const endVote = addDays(date, 8);
				endVote.setHours(23);
				endVote.setMinutes(59);
				this.round.dates.endVote = endVote;
				console.log(date);
				console.log(endVote);
			}
			this.round.dates[key] = date;
			console.log(this.round);
			this.saveRounds();
		},
		setSongComment(id, value) {
			const song = this.round.songs.find((song) => song.id === id);
			song.comment = value;
			this.saveRounds();
		},
		setThread(key, value) {
			this.round.threads[key] = value;
			this.saveRounds();
		},
		setPool(key, value) {
			this.round.pools[key] = value;
			this.saveRounds();
		},
		setProperty(key, value) {
			this.round[key] = value;
			this.saveRounds();
		},
		saveRounds() {
			this.$store.dispatch("rounds/saveRounds");
		},
		swapAngel(held, team) {
      console.log("Are you an angel", held, team);
      const heldIndex = this.round.participants.findIndex(
        (element) => element.name === held.user.name
      );
			const replacedIndex = team.members.findIndex(
				(element) => element.roles[0] === held.role
      );
      const replacedUser = team.members[replacedIndex];
      team.members[replacedIndex] = held.user;
      this.round.participants[heldIndex] = replacedUser;
		},
		swapBandits(held, team) {
			const heldIndex = held.team.members.findIndex(
				(element) => element.name === held.user.name
			);
			const replacedIndex = team.members.findIndex(
				(element) => element.roles[0] === held.user.roles[0]
			);
			const replacedUser = team.members[replacedIndex];
			team.members[replacedIndex] = held.user;
			held.team.members[heldIndex] = replacedUser;
		},
	},
	created() {
		this.round = this.fetchRound(this.id);
		console.log(this.round);
	},
};
</script>