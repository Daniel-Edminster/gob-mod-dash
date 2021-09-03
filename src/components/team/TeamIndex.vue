<template>
   <FindThread
      v-if="!launchId"
      thread="launch"
      :round="metadata.number"
   />
   <FetchTeams
      v-if="launchId"
      :postId="launchId"
      :participants="participants"
   />
   <TeamAssignment
      v-if="!teams"
      :participants="participants"
   />
   <TeamManager
      v-if="teams"
      :teams="teams"
      :participants="participants"
      :active="active"
   />
</template>

<script>
import TeamAssignment from "./TeamAssignment";
import TeamManager from "../shared/TeamManager";
import FindThread from "../shared/FindThread";
import FetchTeams from "./FetchTeams";

export default {
   name: "TeamIndex",
   components: {
      TeamAssignment,
      TeamManager,
      FindThread,
      FetchTeams
   },
   props: {
      metadata: {
         type: Object,
         required: true,
      },
      participants: {
         type: Array,
         required: true,
      },
      teams: {
         type: Array,
         required: false,
         default: null,
      },
      active: {
         type: Boolean,
         required: true,
      },
      launchId: {
         type: String,
         required: false,
         default: null,
      },
   },
};
</script>