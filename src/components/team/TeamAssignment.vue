<template>
   <p>There are {{ participants.length }} participants awaiting team assignment</p>
   <button @click="assignTeams">Assign Teams</button>
   <AngelsList v-if="angels" :angels="angels" />
   <TeamsList v-if="teams" :teams="teams" />
   <ul>
      <li v-for="(value, key) in participantsByNumParts" :key="key">
         <ParticipantTable
            v-if="value.length > 0"
            :participants="value"
            :parts="parts"
            :experience="metadata.experience"
            :heading="key"
         />
      </li>
   </ul>
</template>

<script>
import AngelsList from "./AngelsList";
import ParticipantTable from "../shared/ParticipantTable";
import TeamsList from "./TeamsList";
import createTeams from "@/js/functions/gob/teamAlloc";

export default {
   name: "TeamAssignment",
   components: {
      AngelsList,
      ParticipantTable,
      TeamsList,
   },
   props: {
      participants: {
         type: Array,
         required: true,
      },
      metadata: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         teams: null,
         angels: null,
         unplaced: null,
         participantsByNumParts: {}
      };
   },
   computed: {
      counts() {
         const obj = {};
         this.uniqueUsers.forEach(username => {
            obj[username] = this.participants.filter(participant =>
               participant.username === username
            )
         })
         return obj;
      },
      parts() {
         return this.metadata.parts;
      },
      uniqueUsers() {
         const set = new Set();
         this.participants.forEach(participant => {
            set.add(participant.username);
         })
         return set;
      },
   },
   inject: ["setProperty"],
   methods: {
      updateParticipants(teams) {
         // since these members are references to the participant objects, we might not need
         // the updatedParticipants array for this to work.
         const updatedParticipants = [];
         teams.forEach(team => {
            team.members.forEach(member => {
               member.instance.collection = "teams";
               member.instance.number = team.number;
               updatedParticipants.push(member);
            })
            team.round = this.metadata.number;
            delete team.members;
         })
         return updatedParticipants;
      },
      assignTeams() {
         const { teams, unplaced } = createTeams(
            this.parts,
            {...this.participantsByNumParts},
            this.metadata.experience 
         );
         console.log("Teams: ", teams);
         // this.teams = teams;
         if (teams.length > 0) {
            const updatedMembers = this.updateParticipants(teams);
            const array = [ ...updatedMembers, ...unplaced];
            this.setProperty("participants", array);
            this.setProperty("teams", teams);
         } else {
            console.log("No teams created. Insufficient Participants.");
         }
      },
      partitionByNumParts() {
         const numParts = Object.keys(this.parts).length;
         for (let i = numParts; i > 0; i--) {
            this.participantsByNumParts[i] = [];
            Object.values(this.counts).forEach(entries => {
               if (entries.length === i) this.participantsByNumParts[i].push(...entries)
            })
         }
      },
      matchRoleLength(participant, length) {
         return participant.roles.length == length;
      },
   },
   mounted() {
      this.partitionByNumParts();
   }
};
</script>

<style scoped>
ul {
   list-style-type: none;
   padding: 0;
}

span {
   margin-right: 5px;
}
</style>