<template>
   
   <PostThread v-if="state === 0" thread="voting" :metadata="metadata" />
   <DatasaveWarning
      v-if="state === 1"
      thing="Voting thread"
      action="finding or generating comments"
   />
   <FindSongComments v-if="state === 2" :postId="post.source" />
   <CommentGenerator v-if="state === 2" :songs="songs" />
   <p v-if="state === 3">{{ comments?.length }} Comments Generated</p>
   <PostComments v-if="state === 3" :post="post" :comments="comments" thread="voting" />
   <FetchVotes v-if="state === 4" :postId="post?.source" />
   <TabulateVotes
      v-if="state === 5"
      :votes="votes"
      :songs="songs"
      :allSongsVotedOn="allSongsVotedOn"
   />
   <CommitWinners v-if="state === 6" :songs="songs" />
   <SongsList :songs="songs" />
</template>

<script>
import CommentGenerator from "./CommentGenerator";
import CommitWinners from "./CommitWinners";
import DatasaveWarning from "../shared/DatasaveWarning";
import FetchVotes from "./FetchVotes";
import FindSongComments from "./FindSongComments";
// import FindThread from "../shared/FindThread";
import PostComments from "../shared/PostComments";
import PostThread from "../shared/PostThread";
import SongsList from "../shared/SongsList";
import TabulateVotes from "./TabulateVotes";



export default {
   name: "VoteIndex",
   components: {
      CommentGenerator,
      CommitWinners,
      DatasaveWarning,
      FetchVotes,
      FindSongComments,
      // FindThread,
      PostComments,
      PostThread,
      SongsList,
      TabulateVotes
   },
   props: {
      metadata: {
         type: Object,
         required: true,
      },
      post: {
         type: Object,
         required: false,
         default: null,
      },
      songs: {
         type: Array,
         required: true,
      },
      votes: {
         type: Array,
         required: false,
         default: null,
      },
   },
   data() {
      return {
         comments: null,
      };
   },
   computed: {
      allSongsCommented() {
         if (!this.post?.source) return false;
         for (const song of this.songs) {
            if (!song.comment) return false;
         }
         return true;
      },
      allSongsVotedOn() {
         if (!this.post?.source) return false;
         for (const song of this.songs) {
            if (!song.voted) return false;
         }
         return true;
      },
      state() {
         let counter = 0; // Post or find thread
         if (this.post?.source) counter++; // Save thread to database
         if (this.post?.id) counter++; // Find, or generate comments
         if (this.comments) counter++; // Post generated comments
         // At this stage not saving comments to database. That might change?
         if (this.allSongsCommented) counter = 4; // Fetch Votes OK I KNOW IT'S CHEATING
         if (this.votes) counter++; // Tabulate Votes
         if (this.allSongsVotedOn) counter++;
         return counter;
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

<style scoped>
</style>