<template>
   <p v-if="failMessage">{{ failMessage }}</p>
   <div v-if="round">
      <RoundDashboard :path="path" :round="round" />
      <StageWrapper :path="path" :round="round" />
   </div>
   <div v-if="isLoading">
      <base-spinner />
      <p>Loading round...</p>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoundDashboard from "@/components/round/RoundDashboard";
import StageWrapper from "@/components/round/StageWrapper";
import { addDays } from "@/js/functions/utils";
import { computed } from 'vue'
import saveThemesToDatabase from "@/js/functions/fauna/saveThemes"
import saveSignupsToDatabase from "@/js/functions/fauna/saveParticipants"
import saveThreadsToDatabase from "@/js/functions/fauna/saveThread";
import saveVotesToDatabase from "@/js/functions/fauna/saveVotes";

export default {
   name: "Round",
   components: {
      RoundDashboard,
      StageWrapper,
   },
   props: {
      number: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         failMessage: null,
         isLoading: false,
         path: 'standard'
      };
   },
   computed: {
      ...mapGetters('rounds', ['getRoundByNumber']),
      round() {
         return this.getRoundByNumber(this.number);
      }
   },
   provide() {
      return {
         checkComment: this.checkComment,
         clearBoolean: this.clearBoolean,
         clearProperty: this.clearProperty,
         deleteNomination: this.deleteNomination,
         deleteThread: this.deleteThread,
         endRound: this.endRound,
         savePoolToDatabase: this.savePoolToDatabase,
         saveRoundToDatabase: this.saveRoundToDatabase,
         saveTeamsToDatabase: this.saveTeamsToDatabase,
         saveThreadsToDatabase: this.saveThreadsToDatabase,
         setActive: this.setActive,
         setComment: this.setComment,
         setDate: this.setDate,
         setFoundSongComments: this.setFoundSongComments,
         setProperty: this.setProperty,
         setPool: this.setPool,
         setSongComment: this.setSongComment,
         setTeamCommentThreads: this.setTeamCommentThreads,
         setThread: this.setThread,
         setVotes: this.setVotes,
         themeVotes: computed(() => this.round.votes.theme),
         togglePath: this.togglePath
      };
   },
   methods: {
      async loadRound(number) {
         this.isLoading = true;
         const response = await this.$store.dispatch('rounds/loadRound', number);
         if (response.name && response.message) this.failMessage = response.message;
         this.isLoading = false;
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
      deleteNomination(source) {
         const noms = this.round.pools.theme;
         console.log(`Deleting nom with source ${source} from `, noms);
         const nomIndex = noms.findIndex(nom => nom.source === source);
         console.log(nomIndex);
         noms.splice(nomIndex, 1);
      },
      deleteThread(key) {
         this.round.threads[key] = null;
         this.saveRounds();
      },
      endRound() {
         this.round.active = false;
         this.round.complete = true;
         this.saveRounds();
      },
      async savePoolToDatabase(stage, pool) {
         console.log(`Saving ${stage} pool to db: ${pool.length} entries.`);
         // IIFE and conditional return statement -- gnarly huh
         // There's probably a more readable option for this.
         const updatedPool = await (() => {
            return (
               (stage === 'theme' && saveThemesToDatabase(pool)) ||
               (stage === 'signup' && saveSignupsToDatabase(pool, this.round.number)) ||
               (stage === 'voting' && saveVotesToDatabase(pool)) ||
               pool
            )
         })()
         console.log("Updated Pool:", updatedPool);
         this.setPool(stage, updatedPool);
         this.saveRounds()
      },
      async saveRoundToDatabase() {
         this.$store.dispatch("rounds/saveRoundToDatabase", this.number);
      },
      async saveThreadsToDatabase(threads) {
         console.log("Saving threads to database", threads);
         const savedThreads = await saveThreadsToDatabase(threads);
         savedThreads.forEach(saved => {
            if (saved.stage === "song" || saved.stage === "team") {
               const array = this.round.threads[saved.stage];
               const thread = array.find(element => element.source === saved.source);
               thread.id = saved.id;
            } else {
               this.round.threads[saved.stage].id = saved.id;
            }
         })
         console.log(this.round.threads);
         this.saveRounds();
      },
      saveRounds() {
         this.$store.dispatch("rounds/saveRounds");
      },
      setActive() {
         this.round.active = true;
         this.saveRounds();
      },
      setCommentOLD(comment, id) {
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
      setComment(comment) {
         const threads = this.round.threads;
         if (!threads[comment.stage]) threads[comment.stage] = [];
         delete comment.body;
         threads[comment.stage].push(comment);
         this.saveRounds();
      },
      setTeamCommentThreads(threads) {
         this.round.threads.team = threads;
         this.saveRounds();
      },
      setFoundSongComments(ids, postId) {
         const array = [];
         ids.forEach(id => {
            const song = this.round.songs.find((song) => song.number === id.song);
            // song.comment = id.comment; WE DON'T DO THIS HERE NO MORE
            // this is where we add the song threads to the round threads object
            const obj = {
               instanceId: song.id,
               stage: 'song',
               source: id.comment,
               parent: postId
            }
            array.push(obj);
         })
         // I'm not sure we'll ever need to partially do this.
         this.round.threads.song = array;
         this.saveRounds();
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
      setPool(key, value) {
         this.round.pools[key] = value;
         this.saveRounds();
      },
      setProperty(key, value) {
         this.round[key] = value;
         this.saveRounds();
      },
      setThread(key, value) {
         if (typeof value === String) {
            const thread = this.round.threads[key];
            if (thread) {
               thread.source = value;
            } else {
               this.round.threads[key] = { round: this.round.number, stage: key, source: value, subreddit: null }
            }
         } else {
            this.round.threads[key] = value;
         }
         this.saveRounds();
      },
      setVotes(stage, votes) {
         this.round.votes[stage] = votes;
         console.log(this.round.votes);
         this.saveRounds();
      },
      togglePath() {
         this.path = this.path === 'standard' ? 'reverse' : 'standard';
      }
   },
   async created() {
      if (!this.round) await this.loadRound(this.number);
   },
};
</script>