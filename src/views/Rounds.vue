<template>
	<div id="rounds">
		<AddRound />
      <button @click="loadRoundsList">Load Rounds from Database</button>
      <base-spinner v-if="isLoading" />
		<RoundsList />
	</div>
</template>

<script>
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
   methods: {
      async loadRoundsList() {
         this.isLoading = true;
         await this.$store.dispatch("rounds/loadRounds");
         this.isLoading = false;
      }
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