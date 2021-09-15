<template>
   <div>
      <div v-if="!theme">
         <p v-if="allThemesSavedToDatabase">
            <strong>Winning theme:</strong> {{ winningTheme.description }}
            <button @click="editTheme()">Approve and Edit Theme</button>
         </p>
         <p v-else class="needs-action">
            Please save nominations to database before committing theme to round.
         </p>
      </div>
      <div v-else>
         <input type="text" v-model="theme" />
         <button @click="setProperty('theme', approvedTheme)">Commit Theme to Round</button>
      </div>
      <NominationTable :nominations="nominations" :scores="themeVotes" />
   </div>
</template>

<script>
import NominationTable from "./NominationTable.vue";
import { determineWinningTheme } from "@/js/functions/gob/theme";

export default {
   name: 'CommitTheme',
   components: {
      NominationTable
   },
   props: {
      nominations: {
         type: Array,
         required: true,
      },
   },
   data() {
      return {
         theme: null
      }
   },
   computed: {
      approvedTheme() {
         return {
            ...this.winningTheme,
            title: this.theme
         }
      },
      winningTheme() {
         return determineWinningTheme(this.nominations, this.themeVotes);
      },
      allThemesSavedToDatabase() {
         return this.nominations.every(nom => nom.id);
      }
   },
   inject: ["setProperty", "themeVotes"],
   methods: {
      editTheme() {
         this.theme = this.winningTheme.description;
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

li {
   font-size: 0.9rem;
   text-align: left;
}

input {
   width: 300px;
}
</style>