<template>
   <div v-if="!screenReady">
      Fetching
      <span class="bandit">bandit</span> and
      <span class="veteran">veteran</span> information...
   </div>
   <div v-else>
      <p v-if="message">{{ message }}</p>
      <div v-if="!teams">
         <button @click="fetchTeams">Fetch Teams</button>
         <base-spinner v-if="isLoading" />
      </div>
      <div v-else>
         <button @click="commitTeams">Commit Teams</button>
         <TeamsListFixed :teams="teams" :participants="placed" :experience="experience" />
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { mapCommentsToTeams } from "@/js/functions/gob/team-reddit";
import TeamsListFixed from "./TeamsListFixed";
import saveTeamsToDatabase from "@/js/functions/fauna/saveTeams"
import saveThreadsToDatabase from "@/js/functions/fauna/saveThread"

export default {
   name: "FetchTeams",
   components: {
      TeamsListFixed,
   },
   props: {
      metadata: {
         type: Object,
         required: true
      },
      postId: {
         type: String,
         required: true,
      },
      participants: {
         type: Array,
         required: true,
      },
      experience: {
         type: Object,
         required: false,
         default: null
      }
   },
   data() {
      return {
         isLoading: false,
         teams: null,
         message:
            "Fetch Teams from existing team comments in existing launch thread",
         placedUsers: null,
         comments: []
      };
   },
   computed: {
      placed() {
         return this.participants.filter(participant => participant.instance.collection === 'teams');
      },
      screenReady() {
         return this.bandits.length > 0 && this.veterans.length > 0;
      },
      ...mapState("auth", ["reddit"]),
      ...mapState("bandits", ["bandits", "veterans"]),
   },
   inject: ["setProperty", "setActive", "setTeamCommentThreads"],
   methods: {
      async commitTeams() {
         try {
            const savedTeams = await saveTeamsToDatabase(this.teams, this.placed, this.metadata.number);
            savedTeams.forEach(saved => {
               const team = this.teams.find(team => team.number === saved.number);
               team.id = saved.id;
               const comment = this.comments.find(comment => comment.number === saved.number);
               comment.instanceId = saved.id;
               delete comment.number;
            });
            const savedThreads = await saveThreadsToDatabase(this.comments);
            this.setProperty("teams", this.teams);
            this.setTeamCommentThreads(savedThreads);
            this.setActive();
         } catch (err) {
            console.log(err);
         }
      },
      async fetchTeams() {
         this.message = "Fetching teams from comments...";
         this.isLoading = true;
         const comments = await this.reddit.fetchComments(this.postId);
         this.isLoading = false;
         if (comments.length === 0) {
            this.message = "No teams found in launch thread. Please assign.";
         } else {
            this.message = `${comments.length} comments found. Please review and commit.`;
            const { placedUsers, teams } = mapCommentsToTeams(comments);
            this.screenPlacedParticipants(teams);
            this.extractCommentsAndParticipants(teams);
            this.teams = teams;
            this.placedUsers = placedUsers;
         }
      },
      extractCommentsAndParticipants(teams) {
         teams.forEach(team => {
            this.comments.push({
               parent: this.postId,
               source: team.comment,
               stage: "team",
               number: team.number // will be replaced with the id
            });
            team.members.forEach(member => {
               const participant = this.participants.find(participant =>
                  participant.username.toLowerCase() === member.username && participant.part === member.part
               )
               participant.instance.collection = "teams";
               participant.instance.number = team.number;
            })
            team.round = this.metadata.number;
            delete team.members;
            delete team.comment;
         })
      },
      screenPlacedParticipants(teams) {
         if (!this.screenReady) {
            console.log("Bandit information unavailable. Check GOB Api connection.");
            return;
         }
         const obj = {};
         teams.forEach((team) => {
            team.members.forEach((participant) => {
               obj[participant.username] = "noob";
               if (this.bandits.includes(participant.username.toLowerCase())) obj[participant.username] = "bandit";
               if (this.veterans.includes(participant.username.toLowerCase())) obj[participant.username] = "veteran";
            });
         });
         this.setProperty("experience", obj);
      }
   },
   created() {
      if (!this.screenReady) {
         this.$store.dispatch("bandits/fetchBandits");
         this.$store.dispatch("bandits/fetchVeterans");
      }
   },
};
</script>

<style scoped>
.bandit {
   color: greenyellow;
}

.veteran {
   color: orange;
}
</style>