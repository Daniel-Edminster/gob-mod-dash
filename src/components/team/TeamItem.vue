<template>
	<div
    ref="teamItem"
		@drop="catchBandit($event, team)"
		@dragover.prevent
		@dragenter="dragEnter()"
		@dragleave="dragLeave()"
	>
		<p @dragover.prevent>{{ team.number }}</p>
		<ul @dragenter.prevent>
			<li @dragenter.prevent v-for="user in team.members" :key="user.name">
				{{ user.roles[0] }}:
				<span
					draggable="true"
					@dragStart="startDrag(user, team)"
					:class="user.experience"
					>{{ user.name }}</span
				>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "TeamItem",
	props: {
		team: {
			type: Object,
			required: true,
		},
  },
  data() {
    return {
      counter: 0
    }
  },
	inject: ["grabBandit", "getHeldBandit", "clearHeldBandit", 'swapBandits'],
	methods: {
		startDrag(user, team) {
			this.grabBandit(user, team);
		},
		catchBandit(event, team) {
			const held = this.getHeldBandit();
      this.swapBandits(held, team);
      this.$refs.teamItem.classList.remove('drag-hover');
		},
		dragEnter() {
      this.counter++;
			this.$refs.teamItem.classList.add('drag-hover');
		},
		dragLeave() {
      this.counter--;
      if (this.counter <= 0) this.$refs.teamItem.classList.remove('drag-hover');
    }
  },
};
</script>

<style scoped>
div {
	border: 1px solid grey;
	border-radius: 5px;
	margin: 5px;
	padding: 5px;
	flex-grow: 1;
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

li {
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	color: lightgrey;
	margin: 2px 0;
	display: flex;
}

.noob {
	color: white;
	/* background-color: white; */
}

.bandit {
	color: greenyellow;
	/* background-color: greenyellow; */
}

.veteran {
	color: orange;
	/* background-color: orange; */
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