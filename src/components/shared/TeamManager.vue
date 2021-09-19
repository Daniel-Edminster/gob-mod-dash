<template>
   <div id="team-manager">
      <h4>Team Manager</h4>
      <div v-if="!active">
         <p>Make final changes to teams and angels before posting. Note that changes here are not saved until "Activate Round" is pressed, so if you want to start again, just refresh the page.</p>
         <button @click="setActive()">Activate Round</button>
      </div>
      <div v-else>
         Round is currently active.
         <button @click="endRound()">End Round</button>
      </div>
      <ParticipantTable
         v-if="participants && participants.length > 0"
         :participants="participants"
         heading="Unplaced"
         :experience="metadata.experience"
         :parts="metadata.parts"
         :draggable="true"
         :grabAngel="grabAngel"
      />
      <TeamsList :teams="teams" :obscure="!active" :experience="metadata.experience" />
   </div>
</template>

<script>
import ParticipantTable from "./ParticipantTable";
import TeamsList from "../team/TeamsList";

export default {
   name: "TeamManager",
   components: {
      ParticipantTable,
      TeamsList,
   },
   props: {
      participants: {
         type: Array,
         required: false,
         default: null,
      },
      teams: {
         type: Array,
         required: true,
         default: null,
      },
      active: {
         type: Boolean,
         required: true,
      },
      metadata: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         heldBandit: null
      }
   },
   inject: ["endRound", "setActive"],
   provide() {
      return {
         clearHeldBandit: this.clearHeldBandit,
         getHeldBandit: this.getHeldBandit,
         grabBandit: this.grabBandit
      }
   },
   methods: {
      grabAngel(participant) {
         this.heldBandit = { participant }
      },
      grabBandit(participant, team) {
         this.heldBandit = { participant, team }
      },
      getHeldBandit() {
         if (this.heldBandit) {
            return this.heldBandit;
         } else {
            return null;
         }
      },
      clearHeldBandit() {
         this.heldBandit = null;
      }
   }
};
</script>

<style scoped>
div#team-manager {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
</style>