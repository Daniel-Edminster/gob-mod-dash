<template>
   <h4>{{ heading }}</h4>
   <table>
      <thead>
         <tr>
            <th>Name</th>
            <th v-for="part in uniqueParts" :key="part">{{ part }}</th>
         </tr>
         <tr>
            <th>Number</th>
            <th v-for="part in uniqueParts" :key="part">{{ countParticipantsByPart(part) }}</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="username in uniqueUsers" :key="username">
            <td>
               <span>{{ username }}</span>
            </td>
            <td v-for="part in uniqueParts" :key="part">
               <ParticipantCard 
                  v-if="participantLookup[username][part]" 
                  :draggable="draggable"
                  @dragstart="startDrag(participantLookup[username][part])"
                  :participant="participantLookup[username][part]"
                  :experience="experience[username]" />
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script>
import ParticipantCard from "./ParticipantCard"

export default {
   name: "ParticipantTable",
   components: {
      ParticipantCard
   },
   props: {
      participants: {
         type: Array,
         required: true,
      },
      heading: {
         type: String,
         required: false,
         default: "Participants",
      },
      angels: {
         type: Boolean,
         required: false,
         default: false,
      },
      parts: {
         type: Object,
         required: true
      },
      experience: {
         type: Object,
         required: true,
      },
      draggable: {
         type: Boolean,
         required: false,
         default: false
      },
      grabAngel: {
         type: Function,
         required: false,
         default: () => console.log("Hello there")
      }
   },
   computed: {
      uniqueParts() {
         return Object.keys(this.parts)
      },
      uniqueUsers() {
         const set = new Set();
         this.participants.forEach(participant => {
            set.add(participant.username);
         })
         return set;
      },
      participantLookup() {
         const obj = {};
         this.participants.forEach(participant => {
            if (!obj[participant.username]) obj[participant.username] = {};
            obj[participant.username][participant.part] = participant;
         })
         return obj;
      }
   },
   methods: {
      getParticipant(username, part) {
         const participant = this.participants.find(
            el => el.username === username && el.part === part
         )
         return participant ? participant : null;
      },
      countParticipantsByPart(part) {
         let counter = 0;
         this.participants.forEach(
            participant => participant.part === part ? counter++ : null
         )
         return counter;
      },
      startDrag(participant) {
         console.log(`Grabbing ${participant.username} for ${participant.part}`);
         console.log(participant);
         this.grabAngel(participant);
      }
   }
};
</script>

<style scoped>
table {
   border: 1px solid black;
   border-spacing: 1px;
}

td {
   padding: 10px;
}

thead {
   background-color: #2d2b38;
   color: white;
}

tbody {
   background-color: #3c3548;
   font-size: 0.9rem;
}
</style>