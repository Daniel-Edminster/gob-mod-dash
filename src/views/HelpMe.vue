<template>
  <TemplatePreview :template="content" />
</template>

<script>
import TemplatePreview from "@/components/shared/TemplatePreview"
import help from "@/assets/helpMe.js"

export default {
  name: 'HelpMe',
  components: {
    TemplatePreview
  },
  computed: {
    content() {
      return { body: help }
    }
  }
}
</script>