<template>
   <div>
      <p v-if="!screenReady">
         Fetching
         <span class="bandit">bandit</span> and
         <span class="veteran">veteran</span> information...
      </p>
      <button v-if="!screened && screenReady" @click="screenExperience()">Screen Participants</button>
      <button
         v-if="screened"
         @click="commitParticipants"
      >Commit Participants to Round</button>
   </div>
   <ParticipantTable :participants="signups" :parts="parts" :experience="experience" :uniqueUsers="uniqueUsers" />
</template>

<script>
import ParticipantTable from "../shared/ParticipantTable";
import { mapState } from "vuex";

export default {
   name: "CommitSignups",
   components: {
      ParticipantTable,
   },
   props: {
      signups: {
         type: Array,
         required: true,
      },
      parts: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         experience: null,
         screened: false
      };
   },
   computed: {
      screenReady() {
         return this.bandits.length > 0 && this.veterans.length > 0;
      },
      uniqueUsers() {
         const set = new Set();
         this.signups.forEach(participant => {
            set.add(participant.username);
         })
         return set;
      },
      ...mapState("bandits", ["bandits", "veterans"]),
   },
   inject: ["setProperty"],
   methods: {
      commitParticipants() {
         this.setProperty('participants', this.signups);
         this.setProperty('experience', this.experience);
      },
      screenExperience() {
         if (!this.screenReady) {
            console.log("Bandit information unavailable. Check GOB Api connection.");
            return;
         }
         this.uniqueUsers.forEach(username => {
            if (this.bandits.includes(username.toLowerCase())) this.experience[username] = "bandit";
            if (this.veterans.includes(username.toLowerCase())) this.experience[username] = "veteran";
         })
         this.screened = true;
      }
   },
   created() {
      const obj = {}
      this.uniqueUsers.forEach(username => {
         obj[username] = "noob"
      })
      this.experience = obj;
      if (!this.screenReady) {
         this.$store.dispatch("bandits/fetchBandits");
         this.$store.dispatch("bandits/fetchVeterans");
      }
   }
};
</script>

<style scoped>
ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
}

.bandit {
   color: greenyellow;
}

.veteran {
   color: orange;
}
</style>