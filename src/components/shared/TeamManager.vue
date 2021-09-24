<template>
   <div id="team-manager">
      <h4>Team Manager</h4>
      <div v-if="!active">
         <p>Make last minute changes to teams. Commit when done. This will save teams to the database and you can launch the round.</p>
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
import saveTeamsToDatabase from "@/js/functions/fauna/saveTeams";

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
   inject: ["endRound", "saveTeamsToDatabase", "setActive", "setProperty"],
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
         const number = source === "teams" ? held.teamnumber : this.metadata.number;
         held.participant.instance = { collection: "teams", number: receivingTeamNumber }
         replacedParticipant.instance = { collection: source, number }
      },
      cloneArrayOfObjects(array) {
         return array.map(el => { return { ...el } })
      },
      resetTeams() {
         this.managedTeams = this.cloneArrayOfObjects(this.teams);
         this.managedParticipants = this.cloneArrayOfObjects(this.participants);
      },
      async commitTeams() {
         console.log("Committing teams...");
         try {
            const savedTeams = await saveTeamsToDatabase(this.managedTeams, this.placed, this.metadata.number);
            savedTeams.forEach(saved => {
               const team = this.managedTeams.find(team => team.number === saved.number);
               team.id = saved.id;
            })
            console.log(this.managedTeams);
            this.setProperty("teams", this.managedTeams);
            this.setProperty("participants", this.managedParticipants);
         } catch (err) {
            console.log(err);
         }
         // save Teams to database
         // need to pass Teams as well as placed Participants for update.
         // receive documents with IDs
         // save those teams to the round.
         // set active flag
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