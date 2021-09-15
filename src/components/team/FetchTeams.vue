<template>
   <div v-if="!screenReady">
      Fetching <span class="bandit">bandit</span> and
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
         <TeamsListFixed :teams="teams" />
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { mapCommentsToTeams } from "@/js/functions/gob/team-reddit";
import TeamsListFixed from "./TeamsListFixed";

export default {
   name: "FetchTeams",
   components: {
      TeamsListFixed,
   },
   props: {
      postId: {
         type: String,
         required: true,
      },
      participants: {
         type: Array,
         required: true,
      },
   },
   data() {
      return {
         isLoading: false,
         teams: null,
         message:
            "Fetch Teams from existing team comments in existing launch thread",
         placedUsers: null,
      };
   },
   computed: {
      screenReady() {
         return this.bandits.length > 0 && this.veterans.length > 0;
      },
      ...mapState("auth", ["reddit"]),
      ...mapState("bandits", ["bandits", "veterans"]),
   },
   inject: ["returnAngels", "setProperty", "setActive"],
   methods: {
      commitTeams() {
         this.setProperty("teams", this.teams);
         const angels = this.filterAngels();
         this.returnAngels(angels);
         this.setActive();
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
            this.teams = teams;
            this.placedUsers = placedUsers;
         }
      },
      filterAngels() {
         console.log(this.participants);
         console.log(this.placedUsers);
         return this.participants.filter(participant => 
            !this.placedUsers.has(participant.username.toLowerCase())
      )},
      screenPlacedParticipants(teams) {
         teams.forEach((team) => {
            team.members.forEach((user) => {
               user.experience = "noob";
               if (this.bandits.includes(user.username.toLowerCase()))
                  user.experience = "bandit";
               if (this.veterans.includes(user.username.toLowerCase()))
                  user.experience = "veteran";
            });
         });
      },
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