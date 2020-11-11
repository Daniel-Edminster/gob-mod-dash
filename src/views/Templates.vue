<template>
	<TemplateAdd />
	<TemplatesList />
</template>

<script>
import TemplateAdd from "@/components/template/TemplateAdd"
import TemplatesList from "@/components/template/TemplatesList"

export default {
  name: "Templates",
  components: {
    TemplateAdd,
    TemplatesList
  }
}
</script>