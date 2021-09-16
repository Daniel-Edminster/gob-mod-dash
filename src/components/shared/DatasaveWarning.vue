<template>
   <div class="needs-action">
      Please save {{ thing }} to database before {{ action }}.
   </div>
</template>

<script>
export default {
   name: 'DatasaveWarning',
   props: {
      thing: {
         type: String,
         required: true
      },
      action: {
         type: String,
         required: true
      }
   }
}
</script>