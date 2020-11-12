<template>
  Vote Index
  <CommentGenerator v-if="!comments && !allSongsCommented" :songs="songs" />
  <PostThread v-if="!postId && comments && !allSongsCommented" thread="voting" :metadata="metadata" />
  <PostComments v-if="postId && comments && !allSongsCommented" :postId="postId" :comments="comments" />
  <SongsList :songs="songs" />
  <div v-if="allSongsCommented">Almost done! Just need to tabulate the votes!</div>
</template>

<script>
import CommentGenerator from "./CommentGenerator"
import PostComments from "../shared/PostComments"
import PostThread from "../shared/PostThread"
import SongsList from "./SongsList"

export default {
  name: 'VoteIndex',
  components: {
    CommentGenerator,
    PostComments,
    PostThread,
    SongsList
  },
  props: {
    number: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: false,
      default: null
    },
    songs: {
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
    allSongsCommented() {
      for (const song of this.songs) {
        if (!song.comment) return false;
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