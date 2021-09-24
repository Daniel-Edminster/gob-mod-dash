<template>
   <TeamManager
      v-if="teams && !launch?.source && !late?.source && !allTeamsSavedToDatabase"
      :teams="teams"
      :participants="participants"
      :active="active"
      :metadata="metadata"
   />
   <p v-if="comments && !launch?.source">{{ comments.length }} Comments Generated</p>
   <PostThread v-if="!launch?.source && comments" thread="launch" :metadata="metadata" />
   <div v-if="!allTeamsCommented">
      <CommentGenerator v-if="!comments && allTeamsSavedToDatabase" :teams="teams" />
      <PostComments
         v-if="launch?.source && comments"
         :post="launch"
         :comments="comments"
         thread="launch"
      />
   </div>
   <div v-else>
      <PostThread v-if="!late?.source && allTeamsCommented" thread="late" :metadata="metadata" />
      <TeamManager
         v-if="allTeamsCommented && launch?.source && late?.source && active"
         :teams="teams"
         :participants="participants"
         :active="active"
         :metadata="metadata"
      />
   </div>
</template>

<script>
import CommentGenerator from "./CommentGenerator";
import PostComments from "../shared/PostComments";
import PostThread from "../shared/PostThread";

import TeamManager from "../shared/TeamManager";

// should keep track of which teams already have comment threads
// in case the task gets interrupted.

export default {
   name: "LaunchIndex",
   components: {
      CommentGenerator,
      PostComments,
      PostThread,
      TeamManager
   },
   props: {
      metadata: {
         type: Object,
         required: true,
      },
      launch: {
         type: Object,
         required: false,
         default: null,
      },
      late: {
         type: Object,
         required: false,
         default: null,
      },
      teams: {
         type: Array,
         required: true,
      },
      active: {
         type: Boolean,
         required: true,
      },
      participants: {
         type: Array,
         required: false,
         default: null,
      },
      complete: {
         type: Boolean,
         required: true
      }
   },
   data() {
      return {
         comments: null,
      };
   },
   computed: {
      allTeamsCommented() {
         for (const team of this.teams) {
            if (!team.comment) return false;
         }
         return true;
      },
      allTeamsSavedToDatabase() {
         return this.teams.every(team => team.id);
      }
   },
   provide() {
      return {
         setComments: this.setComments,
      };
   },
   methods: {
      setComments(comments) {
         this.comments = comments;
      },
   },
};
</script>