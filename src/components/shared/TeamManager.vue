<template>
	<h4>Team Manager</h4>
	<div v-if="!active">
		<p>
			Here is where you will be able to adjust teams before beginning the round.
		</p>
		<button @click="setActive()">Activate Round</button>
	</div>
  <div v-else>
    Round is currently active. <button @click="endRound()">End Round</button>
  </div>
	<ParticipantTable v-if="participants.length > 0" :participants="participants" heading="Unplaced" />
	<TeamsList :teams="teams" />
</template>

<script>
import ParticipantTable from "./ParticipantTable";
import TeamsList from "../team/TeamsList";

export default {
	name: "TeamManager",
	components: {
		ParticipantTable,
		TeamsList,
	},
	props: {
		participants: {
			type: Array,
			required: false,
			default: null,
		},
		teams: {
			type: Array,
			required: true,
			default: null,
		},
		active: {
			type: Boolean,
			required: true,
		},
  },
  data() {
    return {
      heldBandit: null
    }
  },
  inject: ["endRound", "setActive"],
  provide() {
    return {
      clearHeldBandit: this.clearHeldBandit,
      getHeldBandit: this.getHeldBandit,
      grabBandit: this.grabBandit
    }
  },
  methods: {
    grabBandit(user, team) {
      this.heldBandit = { user, team }
    },
    getHeldBandit() {
      if(this.heldBandit) {
        return this.heldBandit;
      } else {
        return null;
      }
    },
    clearHeldBandit() {
      this.heldBandit = null;
    }
  }
};
</script>