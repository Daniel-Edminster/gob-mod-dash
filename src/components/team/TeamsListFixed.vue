<template>
   <ul>
      <TeamItemFixed
         v-for="team in teams"
         :key="team.number"
         :number="team.number"
         :participants="getParticipants(team.number)"
         :experience="experience"
      />
   </ul>
</template>

<script>
import TeamItemFixed from "./TeamItemFixed"

export default {
   name: 'TeamsListFixed',
   components: {
      TeamItemFixed
   },
   props: {
      participants: {
         type: Array,
         required: true
      },
      teams: {
         type: Array,
         required: true
      },
      experience: {
         type: Object,
         required: true
      }
   },
   methods: {
      getParticipants(teamnumber) {
         return this.participants.filter(participant => participant.instance.number === teamnumber);
      }
   }
}
</script>

<style scoped>
ul {
   list-style-type: none;
   padding: 20px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   text-align: left;
}
</style>