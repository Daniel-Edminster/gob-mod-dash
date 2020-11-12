<template>
	<p v-if="comments && !postId">Comments Generated</p>
	<CommentGenerator v-if="!comments && !allTeamsCommented" :teams="teams" />
	<PostThread v-if="!postId && comments" thread="launch" :metadata="metadata" />
	<PostComments
		v-if="postId && comments && !allTeamsCommented"
		:postId="postId"
		:comments="comments"
	/>
	<PostThread
		v-if="!lateId && allTeamsCommented"
		thread="late"
		:metadata="metadata"
	/>
	<TeamManager
		v-if="allTeamsCommented && postId && lateId && active"
		:teams="teams"
		:participants="participants"
		:active="active"
	/>
	
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
		number: {
			type: String,
			required: true,
		},
		theme: {
			type: String,
			required: true,
		},
		postId: {
			type: String,
			required: false,
			default: null,
		},
		lateId: {
			type: String,
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
		metadata() {
			return {
				number: this.number,
				theme: this.theme,
			};
		},
		allTeamsCommented() {
			for (const team of this.teams) {
				if (!team.comment) return false;
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