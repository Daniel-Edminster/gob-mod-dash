<template>
   <div id="round-metadata">
      <RoundMetadata :round="round" />
      <RoundThreads :threads="round.threads" />
      <RoundPools :pools="round.pools" />
   </div>
</template>

<script>
import RoundMetadata from "./RoundMetadata";
import RoundPools from "./RoundPools";
import RoundThreads from "./RoundThreads";

export default {
   name: "RoundDashboard",
   components: {
      RoundMetadata,
      RoundPools,
      RoundThreads,
   },
   props: {
      round: {
         type: Object,
         required: true,
      },
   }
};
</script>

<style scoped>
div#round-metadata {
   background-color: #24252d;
   color: white;
   padding-bottom: 15px;
   display: flex;
   justify-content: space-evenly;
   margin-bottom: 30px;
}
</style>