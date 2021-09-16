<template>
   <!-- <FindThread v-if="!postId" :round="metadata.number" thread="voting" /> -->
   <div v-if="!allSongsCommented">
      <FindSongComments v-if="post?.source && post.id" :postId="post.source" />
      <p v-if="comments">{{ comments.length }} Comments Generated</p>
      <CommentGenerator v-if="!comments" :songs="songs" />
      <PostThread v-if="!post?.source && comments" thread="voting" :metadata="metadata" />
      <p v-if="post?.source && !post.id" class="needs-action">Please save Voting thread to database before finding comments.</p>
      <PostComments v-if="post?.source && comments" :post="post" :comments="comments" thread="voting" />
   </div>
   <div v-else>
      <FetchVotes v-if="!votes" :postId="post?.source" />
      <TabulateVotes v-if="votes" :votes="votes" :songs="songs" :allSongsVotedOn="allSongsVotedOn" />
      <CommitWinners v-if="allSongsVotedOn" :songs="songs" />
   </div>
   <SongsList :songs="songs" />
</template>

<script>
import CommentGenerator from "./CommentGenerator";
import CommitWinners from "./CommitWinners";
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