<template>
   <ul>
      <li v-for="(winners, part) in winners" :key="part">
         <h4>{{ part }}</h4>
         <ul>
            <li v-for="winner in winners" :key="winner.id">
               {{ winner.title }}
               <ul>
                  <li
                     v-for="username in getWinningParticipants(winner.participants, part)"
                     :key="username"
                  >{{ username }}</li>
               </ul>
            </li>
         </ul>
      </li>
   </ul>
</template>

<script>
export default {
   name: 'WinnersTable',
   props: {
      winners: {
         type: Object,
         required: true
      }
   },
   methods: {
      getWinningParticipants(participants, part) {
         const array = [];
         participants.forEach(participant => {
            if (participant.part === part) array.push(participant.username)
         });
         return array;
      }
   }
}
</script>

<style scoped>
ul {
   list-style-type: none;
   margin: 0;
   padding: 0;
}
</style>