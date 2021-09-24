<template>
   <div id="round-metadata">
      <RoundMetadata :path="path" :round="round" />
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
      path: {
         type: String,
         required: true
      },
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
   padding: 10px;
   display: grid;
   grid-template-columns: 4fr 5fr 5fr;
   gap: 5px;
   margin-bottom: 30px;
}
</style>