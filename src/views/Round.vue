<template>
   <RoundDashboard
      v-if="round"
      :round="round"
   />
   <StageWrapper
      v-if="round"
      :round="round"
   />
   <div v-else>Round {{ id }} does not exist</div>
</template>

<script>
import RoundDashboard from "@/components/round/RoundDashboard";
import StageWrapper from "@/components/round/StageWrapper";
import { addDays } from "@/js/functions/utils";
import { computed } from 'vue'
import saveRoundToDatabase from "@/js/functions/fauna/saveRound"
// Function imports below are for saving individual pools
import saveThemesToDatabase from "@/js/functions/fauna/saveThemes"

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
         savePoolToDatabase: this.savePoolToDatabase,
         saveRoundToDatabase: this.saveRoundToDatabase,
         setActive: this.setActive,
         setComment: this.setComment,
         setDate: this.setDate,
         setFound: this.setFound,
         setFoundSongComments: this.setFoundSongComments,
         setProperty: this.setProperty,
         setPool: this.setPool,
         setSongComment: this.setSongComment,
         setThread: this.setThread,
         setVotes: this.setVotes,
         swapAngel: this.swapAngel,
         swapBandits: this.swapBandits,
         found: computed(() => this.round.found),
         themeVotes: computed(() => this.round.votes.theme)
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
            const team = this.round.teams.find(
               (team) => team.number === number
            );
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
      async savePoolToDatabase(stage, pool) {
         console.log(`Saving ${stage} pool to db: ${pool.length} entries.`);
         // IIFE and conditional return statement -- gnarly huh
         // There's probably a more readable option for this.
         const updatedPool = await (() => {
            return  (
               (stage === 'theme' && saveThemesToDatabase(pool)) ||
               pool
            )
         })()
         console.log("Updated Pool:", updatedPool);
         this.setPool(stage, updatedPool);
      },
      async saveRoundToDatabase() {
         const response = await saveRoundToDatabase(this.round);
         console.log(response);
      },
      saveRounds() {
         this.$store.dispatch("rounds/saveRounds");
      },
      setActive() {
         this.round.active = true;
         this.saveRounds();
      },
      setComment(comment, id) {
         const { type, number } = comment;
         if (type === "team") {
            const team = this.round.teams.find(
               (team) => team.number === number
            );
            team.comment = id;
            this.saveRounds();
         } else if (type === "song") {
            const song = this.round.songs.find((song) => song.id === number);
            song.comment = id;
            this.saveRounds();
         }
      },
      setFoundSongComments(ids) {
         ids.forEach(id => {
            const song = this.round.songs.find((song) => song.id === id.song);
            song.comment = id.comment;
            this.saveRounds();
         })
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
      setFound(key) {
         this.round.found[key] = true;
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
      setVotes(stage, votes) {
         this.round.votes[stage] = votes;
         console.log(this.round.votes);
         this.saveRounds();
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
   },
};
</script>