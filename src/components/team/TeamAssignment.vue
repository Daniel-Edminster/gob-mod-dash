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
   inject: ["returnAngels", "setProperty"],
   methods: {
      assignTeams() {
         const { teams, angels, unplaced } = createTeams(
            this.parts,
            this.participants,
            {...this.participantsByNumParts},
            this.metadata.experience
         );
         console.log("Teams: ", teams);
         console.log("Angels:", angels);
         this.teams = teams;
         this.angels = angels;
         this.unplaced = unplaced;
         if (teams.length > 0) {
            this.setProperty('teams', teams);
            this.returnAngels(unplaced);
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