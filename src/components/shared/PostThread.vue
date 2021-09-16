<template>
   <h3>No {{ thread }} thread detected. Find existing or post a new thread.</h3>
   <FindThread :thread="thread" :round="metadata.number" />
   <h4>Post Thread: {{ thread }}</h4>
   <TemplatePicker v-if="!forceTemplate" />
   <button v-if="template" @click="submitPost">Post to reddit</button>
   <p v-if="message">{{ message }}</p>
   <base-spinner v-if="isLoading" />
   <TemplatePreview v-if="template" :template="template" :metadata="metadata" />
</template>

<script>
import TemplatePicker from "../shared/TemplatePicker";
import TemplatePreview from "../shared/TemplatePreview";
import { parseMacros } from "@/js/functions/utils";
import FindThread from "./FindThread";

import { mapState } from "vuex";

export default {
   name: "PostThread",
   components: {
      TemplatePicker,
      TemplatePreview,
      FindThread
   },
   props: {
      thread: {
         type: String,
         required: true,
      },
      metadata: {
         type: Object,
         required: false,
         default: null,
      },
      forceTemplate: {
         type: Object,
         required: false,
         default: null,
      },
   },
   data() {
      return {
         isLoading: false,
         template: null,
         message: null,
      };
   },
   provide() {
      return {
         setTemplate: this.setTemplate,
      };
   },
   inject: ["setThread"],
   computed: mapState("auth", ["reddit"]),
   methods: {
      setTemplate(name) {
         this.template =
            this.$store.getters["templates/getTemplateByName"](name);
      },
      async submitPost() {
         const post = {
            title: parseMacros(this.template.title, this.metadata),
            body: parseMacros(this.template.body, this.metadata),
         };
         this.message = "Posting to reddit...";
         console.log("Submitting to reddit", post);
         this.isLoading = true;
         const submission = await this.reddit.submitPost(post);
         this.isLoading = false;
         const obj = {
            round: this.metadata.number,
            stage: this.thread,
            source: submission.name,
            subreddit: submission.subreddit.display_name
         }
         if (submission) {
            this.setThread(this.thread, obj);
            this.message = `Success! Thread posted to /r/${this.reddit.subreddit}`;
         } else {
            this.message = "Post failed.";
         }
      },
   },
   created() {
      this.template = this.forceTemplate ? this.forceTemplate : null;
   },
};
</script>