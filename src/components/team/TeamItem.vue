<template>
   <li
      class="team-item"
      ref="teamItem"
      @drop="catchBandit($event, team)"
      @dragover.prevent
      @dragenter="dragEnter()"
      @dragleave="dragLeave()"
      @mouseup="clearHover()"
   >
      <p @dragover.prevent>{{ team.number }}</p>
      <ul @dragenter.prevent>
         <li
            class="team-member"
            @dragenter.prevent
            v-for="participant in team.members"
            :key="participant.username"
         >
            {{ participant.part }}:
            <span
               draggable="true"
               @dragstart="startDrag(participant, team)"
               :class="experience[participant.username]"
               class="name"
            >{{ participant.username }}</span>
         </li>
      </ul>
   </li>
</template>

<script>
export default {
   name: "TeamItem",
   props: {
      team: {
         type: Object,
         required: true,
      },
      obscure: {
         type: Boolean,
         required: false,
         default: false,
      },
      experience: {
       type: Object,
       required: true
    }
   },
   data() {
      return {
         counter: 0,
      };
   },
   inject: [
      "grabBandit",
      "getHeldBandit",
      "clearHeldBandit",
      "swapAngel",
      "swapBandits",
   ],
   methods: {
      startDrag(participant, team) {
         this.grabBandit(participant, team);
      },
      catchBandit(_, team) {
         const held = this.getHeldBandit();
         if (held.team) this.swapBandits(held, team);
         if (!held.team) this.swapAngel(held, team);
         this.$refs.teamItem.classList.remove("drag-hover");
      },
      dragEnter() {
         this.counter++;
         this.$refs.teamItem.classList.add("drag-hover");
      },
      dragLeave() {
         this.counter--;
         if (this.counter <= 0)
            this.$refs.teamItem.classList.remove("drag-hover");
      },
      clearHover() {
         this.$refs.teamItem.classList.remove("drag-hover");
      },
      obscureText() {
         const classes = ["noob", "bandit", "veteran"];
         classes.forEach((className) => {
            const spans = document.getElementsByClassName(className);
            spans.forEach((span) => {
               span.classList.add(`obscured`);
            });
         });
      },
   },
   created() {
      console.log(this.team);
   },
   mounted() {
      if (this.obscure === true) this.obscureText();
   },
   updated() {
      if (this.obscure === true) this.obscureText();
   },
};
</script>

<style scoped>
li.team-item {
   border: 1px solid grey;
   border-radius: 5px;
   margin: 5px;
   padding: 5px;
   flex-grow: 0;
   background-color: #3c3548;
   user-select: none;
}

p {
   margin: 0;
   font-weight: bold;
   text-align: right;
}

ul {
   list-style-type: none;
   padding: 0;
   text-align: left;
}

li.team-member {
   font-size: 0.8rem;
   font-weight: bold;
   cursor: grab;
   color: lightgrey;
   margin: 2px 0;
   display: flex;
}

span.name:hover {
   color: lightgrey;
}

.obscured {
   overflow: hidden;
   white-space: nowrap;
   position: relative;
}

.obscured:before {
   visibility: visible;
   color: #303030;
   padding-left: 15px;
   position: absolute;
   left: 0;
   right: 0;
   text-align: right;
   padding-right: 5px;
}

.noob {
   color: white;
}

.noob.obscured {
   background-color: white;
}

.noob.obscured::before {
   content: "Newbie";
}

.bandit {
   color: greenyellow;
}

.bandit.obscured {
   background-color: greenyellow;
}

.bandit.obscured::before {
   content: "Bandit";
}

.veteran {
   color: orange;
}

.veteran.obscured {
   background-color: orange;
}

.veteran.obscured::before {
   content: "Veteran";
}

span {
   font-size: 0.9rem;
   border-radius: 2px;
   flex-grow: 1;
   margin-left: 5px;
}

.drag-hover {
   /* border: 2px solid yellow; */
   background-color: #3c4a2c;
}
</style>