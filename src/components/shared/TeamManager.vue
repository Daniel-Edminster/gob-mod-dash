<template>
   <div id="team-manager">
      <h4>Team Manager</h4>
      <div v-if="!active">
         <p>Here you can make last minute changes to the allocated Teams, such as rebalancing experience levels. To undo your changes, refresh the page. When you're done, save the teams to the database in order to continue on to posting the launch thread.</p>
         <button @click="resetTeams">Undo Changes</button>
         <button @click="commitTeams">Commit Teams</button>
      </div>
      <div v-else>
         Round is currently active.
         <button @click="endRound()">End Round</button>
      </div>
      <ParticipantTable
         v-if="participants && participants.length > 0"
         :participants="unplaced"
         heading="Unplaced"
         :experience="metadata.experience"
         :parts="metadata.parts"
         :draggable="true"
         :grabAngel="grabAngel"
      />
      <TeamsList
         :teams="managedTeams"
         :participants="placed"
         :obscure="!active"
         :experience="metadata.experience"
      />
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
         required: true,
      },
      teams: {
         type: Array,
         required: true
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
         heldBandit: null,
         managedParticipants: null,
         managedTeams: null
      }
   },
   computed: {
      placed() {
         return this.managedParticipants.filter(participant => participant.instance.collection === 'teams');
      },
      unplaced() {
         return this.managedParticipants.filter(participant => participant.instance.collection === 'rounds');
      }
   },
   inject: ["endRound", "saveTeamsToDatabase", "setActive"],
   provide() {
      return {
         clearHeldBandit: this.clearHeldBandit,
         getHeldBandit: this.getHeldBandit,
         grabBandit: this.grabBandit,
         swapAngel: this.swapAngel,
         swapBandits: this.swapBandits,
         swapParticipants: this.swapParticipants
      }
   },
   methods: {
      clearHeldBandit() {
         this.heldBandit = null;
      },
      grabAngel(participant) {
         this.heldBandit = { participant }
      },
      grabBandit(participant, teamnumber) {
         this.heldBandit = { participant, teamnumber }
      },
      getHeldBandit() {
         return this.heldBandit ? this.heldBandit : null;
      },
      swapParticipants(held, receivingTeamNumber, source) {
         const replacedParticipant = this.managedParticipants.find(
            el => el.instance.number === receivingTeamNumber && el.part === held.participant.part
         );
         held.participant.instance = { collection: "teams", number: receivingTeamNumber }
         replacedParticipant.instance = { collection: source, number: this.metadata.number }
      },
      cloneArrayOfObjects(array) {
         return array.map(el => { return {...el}})
      },
      resetTeams() {
         this.managedTeams = this.cloneArrayOfObjects(this.teams);
         this.managedParticipants = this.cloneArrayOfObjects(this.participants);
      },
      commitTeams() {
         console.log("Committing teams...");
         // save Teams to database
         // receive documents with IDs
         // save those teams to the round.
         // profit!
      }
   },
   created() {
      this.resetTeams();
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