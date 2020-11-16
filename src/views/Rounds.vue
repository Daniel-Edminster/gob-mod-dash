<template>
	<div id="rounds">
		<AddRound />
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