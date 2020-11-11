<template>
  <CommentGenerator v-if="!comments && !allTeamsCommented" :teams="teams" />
  <PostThread v-if="!postId && comments" thread="launch" :metadata="metadata" />
  <PostComments v-if="postId && comments && !allTeamsCommented" :postId="postId" :comments="comments" />
  <div v-if="allTeamsCommented">Launch Complete!<br />
  Remember to post the Late Recruitment thread!</div>
</template>

<script>
import CommentGenerator from "./CommentGenerator";
import PostComments from "../shared/PostComments";
import PostThread from "../shared/PostThread";

// should keep track of which teams already have comment threads
// in case the task gets interrupted.

export default {
  name: 'LaunchIndex',
  components: {
    CommentGenerator,
    PostComments,
    PostThread
  },
  props: {
    number: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: false,
      default: null
    },
    teams: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      comments: null
    }
  },
  computed: {
    metadata() {
      return {
        number: this.number,
        theme: this.theme
      }
    },
    allTeamsCommented() {
      for (const team of this.teams) {
        console.log(team);
        if (!team.comment) return false;
      }
      return true;
    }
  },
  provide() {
    return {
      setComments: this.setComments
    }
  },
  methods: {
    setComments(comments) {
      this.comments = comments;
    }
  }
}
</script>