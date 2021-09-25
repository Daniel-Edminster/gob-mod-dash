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
div {
   cursor: grab;
   padding: 3px;
   border: 1px solid;
   background-color: black;
   font-weight: bold;
}

div:hover {
   background-color: lightblue;
   color: black;
}
.noob {
   color: white;
   border-color: white;
}

.bandit {
   color: greenyellow;
   border-color: greenyellow;
}

.veteran {
   color: orange;
   border-color: orange;
}
</style>