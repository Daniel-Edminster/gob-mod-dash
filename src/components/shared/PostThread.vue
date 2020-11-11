<template>
  Post Thread Component
  <TemplatePicker />
  <TemplatePreview v-if="template" :content="template.body" :metadata="metadata" />
  <button v-if="template" @click="submitPost">Post to reddit</button>
</template>

<script>
import TemplatePicker from "../shared/TemplatePicker";
import TemplatePreview from "../shared/TemplatePreview";
// import { parseMacros } from "@/js/functions/utils";

// import reddit from "@/js/api/reddit.js";

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
    }
  },
  data() {
    return {
      content: "",
      template: null
    }
  },
  methods: {
    submitPost() {
      console.log("Submitting post")
    }
  }
}
</script>