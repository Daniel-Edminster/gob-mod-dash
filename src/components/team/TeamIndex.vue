<template>
   <FindThread v-if="!teams && !launch?.source" thread="launch" :round="metadata.number" />
   <div v-if="launch?.source && !launch.id">
      <span class="needs-action">Please save Launch thread to database before organising teams.</span>
   </div>
   <div v-if="launch?.id">
      <FetchTeams
         v-if="launch?.source && launch.id"
         :postId="launch.source"
         :participants="participants"
         :experience="metadata.experience"
      />
   </div>
   <TeamAssignment v-if="!teams" :participants="participants" :metadata="metadata" />
   <TeamManager v-if="teams" :teams="teams" :participants="participants" :active="active" :metadata="metadata" />
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
      launch: {
         type: Object,
         required: false,
         default: null,
      },
   },
};
</script>