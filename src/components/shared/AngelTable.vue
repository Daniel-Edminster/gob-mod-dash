<template>
   <h4>{{ heading }}</h4>
   <table>
      <thead>
         <tr>
            <th>Name</th>
            <th>Music</th>
            <th>Lyrics</th>
            <th>Vocals</th>
         </tr>
         <tr>
            <th>Number</th>
            <th>{{ music }}</th>
            <th>{{ lyrics }}</th>
            <th>{{ vocals }}</th>
         </tr>
      </thead>
      <tbody>
         <tr
            v-for="user in participants"
            :key="user.name"
         >
            <td :class="user.experience">
               <span>{{ user.name }}</span>
            </td>
            <td :class="user.experience">
               <span
                  class="drag"
                  v-if="user.roles.includes('music')"
                  draggable="true"
                  @dragstart="startDrag(user, 'music')"
               >Music</span>
            </td>
            <td :class="user.experience">
               <span
                  class="drag"
                  v-if="user.roles.includes('lyrics')"
                  draggable="true"
                  @dragstart="startDrag(user, 'lyrics')"
               >Lyrics</span>
            </td>
            <td :class="user.experience">
               <span
                  class="drag"
                  v-if="user.roles.includes('vocals')"
                  draggable="true"
                  @dragstart="startDrag(user, 'vocals')"
               >Vocals</span>
            </td>
         </tr>
      </tbody>
      <tfoot>
         <tr>
            <td colspan="4">
               Note: to swap an angel with a placed team member,<br />drag the appropriate role they have available.<br />(In case of multiple role angels.)
            </td>
         </tr>
      </tfoot>
   </table>
</template>

<script>
export default {
   name: "AngelTable",
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
   },
   computed: {
      music() {
         let num = 0;
         this.participants.forEach((participant) => {
            if (participant.roles.includes("music")) num++;
         });
         return num;
      },
      lyrics() {
         let num = 0;
         this.participants.forEach((participant) => {
            if (participant.roles.includes("lyrics")) num++;
         });
         return num;
      },
      vocals() {
         let num = 0;
         this.participants.forEach((participant) => {
            if (participant.roles.includes("vocals")) num++;
         });
         return num;
      },
   },
   inject: ["grabAngel"],
   methods: {
      startDrag(user, role) {
         console.log(`Grabbing ${user.name} for ${role}`);
         console.log(user);
         this.grabAngel(user, role);
      },
   },
};
</script>

<style scoped>
table {
   border: 1px solid black;
   border-spacing: 1px;
   user-select: none;
}

tbody > tr > td {
   padding: 8px;
   /* width: 25%; */
}

thead {
   background-color: #2d2b38;
   color: white;
}

tbody {
   background-color: #3c3548;
   font-size: 0.9rem;
}

tfoot > tr > td {
   font-size: 0.8rem;
   font-weight: bold;
   padding: 6px;
}

.noob {
   color: white;
}

.noob .drag {
   background-color: white;
   color: #3c3548;
}

.bandit {
   color: greenyellow;
}

.bandit .drag {
   background-color: greenyellow;
   color: #3c3548;
}

.veteran {
   color: orange;
}

.veteran .drag {
   background-color: orange;
   color: #3c3548;
}

span {
   font-weight: bold;
}

span.drag {
   cursor: grab;
   border: 1px solid grey;
   border-radius: 4px;
   padding: 1px 3px;
   text-transform: uppercase;
   font-size: 0.8rem;
}

span.drag:hover {
   background-color: white;
}
</style>