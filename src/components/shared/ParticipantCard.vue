<template>
   <div v-if="participant" :class="experience">
      {{ participant.part }}
   </div>
</template>

<script>
export default {
   name: "ParticipantCard",
   props: {
      participant: {
         type: Object,
         required: false,
         default: null
      },
      experience: {
         type: String,
         required: false,
         default: null
      }
   }
}
</script>

<style scoped>
.noob {
   color: white;
}

.bandit {
   color: greenyellow;
}

.veteran {
   color: orange;
}
</style>