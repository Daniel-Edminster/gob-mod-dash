<template>
   <FindThread v-if="!postId" :round="metadata.number" thread="voting" />
   <FindSongComments v-if="postId && !allSongsCommented" :postId="postId" />
   <p v-if="comments">{{ comments.length }} Comments Generated</p>
   <CommentGenerator
      v-if="!comments && !allSongsCommented"
      :songs="songs"
   />
   <PostThread
      v-if="!postId && comments && !allSongsCommented"
      thread="voting"
      :metadata="metadata"
   />
   <PostComments
      v-if="postId && comments && !allSongsCommented"
      :postId="postId"
      :comments="comments"
      thread="voting"
   />
   <FetchVotes
      v-if="allSongsCommented && !votes"
      :postId="postId"
   />
   <TabulateVotes
      v-if="allSongsCommented && votes"
      :votes="votes"
      :songs="songs"
      :allSongsVotedOn="allSongsVotedOn"
   />
   <CommitWinners
      v-if="allSongsVotedOn"
      :songs="songs"
   />
   <SongsList :songs="songs" />
</template>

<script>
import CommentGenerator from "./CommentGenerator";
import CommitWinners from "./CommitWinners";
import FetchVotes from "./FetchVotes";
import FindSongComments from "./FindSongComments";
import FindThread from "../shared/FindThread";
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
      FindThread,
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
      postId: {
         type: String,
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
         if (!this.postId) return false;
         for (const song of this.songs) {
            if (!song.comment) return false;
         }
         return true;
      },
      allSongsVotedOn() {
         if (!this.postId) return false;
         for (const song of this.songs) {
            if (!song.voted) return false;
         }
         return true;
      },
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