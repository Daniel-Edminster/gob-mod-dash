<template>
	<button @click="postComments()">Post comments to {{ postId }}</button>
	<ul>
		<TemplatePreview
			v-for="(comment, index) in commentLess"
			:key="index"
			:template="comment"
		/>
	</ul>
</template>

<script>
import TemplatePreview from "./TemplatePreview";
import reddit from "@/js/api/reddit"

export default {
  name: 'PostComments',
  components: {
    TemplatePreview
  },
  props: {
    postId: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },
  computed: {
    commentLess() {
      const array = this.comments.filter(comment => {
        return !this.checkComment(comment);
      })
      return array;
    }
  },
  inject: ['checkComment', 'setComment'],
  methods: {
    async postComments() {
      this.comments.forEach(async comment => {
        if (this.checkComment(comment)) { // need a type here, team or song
          console.log("Comment exists");
        } else {
          const result = await reddit.submitComment(this.postId, comment.body);
          if (result) this.setComment(comment, result.id);
        }
      })
    }
  },
  mounted() {
    console.log(this.comments);
  }
}
</script>

<style scoped>
ul {
	list-style-type: none;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	text-align: left;
}
</style>