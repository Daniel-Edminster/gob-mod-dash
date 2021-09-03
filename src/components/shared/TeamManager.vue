<template>
	<h4>Team Manager</h4>
	<div v-if="!active">
		<p>
			Make final changes to teams and angels before posting. Note that changes here are not saved until "Activate Round" is pressed, so if you want to start again, just refresh the page.
		</p>
		<button @click="setActive()">Activate Round</button>
	</div>
  <div v-else>
    Round is currently active. <button @click="endRound()">End Round</button>
  </div>
	<AngelTable v-if="participants && participants.length > 0" :participants="participants" heading="Unplaced" />
	<TeamsList :teams="teams" :obscure="!active"/>
</template>

<script>
import AngelTable from "./AngelTable";
import TeamsList from "../team/TeamsList";

export default {
	name: "TeamManager",
	components: {
		AngelTable,
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
      grabAngel: this.grabAngel,
      grabBandit: this.grabBandit
    }
  },
  methods: {
    grabAngel(user, role) {
      this.heldBandit = { user, role }
    },
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

<style scoped>

</style>