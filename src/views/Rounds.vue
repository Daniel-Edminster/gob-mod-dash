<template>
   <div id="rounds">
      <AddRound />
      <div v-if="isLoading">
         <base-spinner v-if="isLoading" />
         <p>Loading rounds list. Please wait...</p>
      </div>
      <RoundsList v-if="roundsList.length > 0" :roundsList="roundsList" />
   </div>
</template>

<script>
import { mapState } from 'vuex'
import AddRound from "@/components/AddRound";
import RoundsList from "@/components/RoundsList";

export default {
   name: "Rounds",
   components: {
      AddRound,
      RoundsList,
   },
   data() {
      return {
         isLoading: false
      }
   },
   computed: mapState("rounds", ["roundsList"]),
   methods: {
      async loadRoundsList() {
         this.isLoading = true;
         await this.$store.dispatch("rounds/loadRoundsList");
         this.isLoading = false;
      }
   },
   async created() {
      if (this.roundsList.length === 0) await this.loadRoundsList();
   }
};
</script>

<style scoped>
div#rounds {
   padding: 15px;
   display: flex;
   flex-direction: column;
   align-items: center;
}
</style>