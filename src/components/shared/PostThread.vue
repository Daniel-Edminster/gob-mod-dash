<template>
  <h4>Post Thread: {{ thread }}</h4>
  <TemplatePicker v-if="!forceTemplate" />
  <button v-if="template" @click="submitPost">Post to reddit</button>
  <TemplatePreview v-if="template" :template="template" :metadata="metadata" />
  <p v-if="message">{{ message }}</p>
</template>

<script>
import TemplatePicker from "../shared/TemplatePicker";
import TemplatePreview from "../shared/TemplatePreview";
import { parseMacros } from "@/js/functions/utils";

import reddit from "@/js/api/reddit.js";

export default {
  name: 'PostThread',
  components: {
    TemplatePicker,
    TemplatePreview
  },
  props: {
    thread: {
      type: String,
      required: true
    },
    metadata: {
      type: Object,
      required: false,
      default: null
    },
    forceTemplate: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      template: null,
      message: null
    }
  },
  provide() {
    return {
      setTemplate: this.setTemplate
    }
  },
  inject: ['setThread'],
  methods: {
    setTemplate(name) {
      this.template = this.$store.getters['templates/getTemplateByName'](name);
    },
    async submitPost() {
      const post = {
        title: parseMacros(this.template.title, this.metadata),
        body: parseMacros(this.template.body, this.metadata)
      }
      this.message = "Posting to reddit..."
      console.log("Submitting to reddit", post);
      const submission = await reddit.submitPost(post);
      if (submission) {
        this.setThread(this.thread, submission.name);
        this.message = `Success! Thread posted to /r/${reddit.subreddit}`
      } else {
        this.message = "Post failed."
      }
    }
  },
  created() {
    this.template = this.forceTemplate ? this.forceTemplate : null;
  }
}
</script>