<template>
   <div id="settings">
      <!-- <SetSubreddit /> -->
      <DebugGOB />
      <DebugReddit />
   </div>
</template>

<script>
import DebugGOB from "@/components/settings/DebugGOB";
import DebugReddit from "@/components/settings/DebugReddit";
// import SetSubreddit from "@/components/settings/SetSubreddit";

export default {
   name: "Settings",
   components: {
      DebugGOB,
      DebugReddit,
      // SetSubreddit,
   },
};
</script>

<style scoped>
div#settings {
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
   height: 100%;
}

div {
   margin-top: 20px;
   margin-bottom: 40px;
}

table {
   margin-top: 20px;
}
</style>