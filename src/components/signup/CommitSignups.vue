<template>
	<div>
    <button v-if="!screened" @click="screenParticipants()">Screen Participants</button>
    <button v-else @click="setParticipants(screened)">Commit Participants to Round</button>
		<ParticipantTable v-if="!screened" :participants="signups" />
    <ParticipantTable v-else :participants="screened" />
	</div>
</template>

<script>
import ParticipantTable from "../shared/ParticipantTable";
import { mapState } from 'vuex'

export default {
  name: 'CommitSignups',
  components: {
    ParticipantTable
  },
	props: {
		signups: {
			type: Array,
			required: true,
		},
  },
  data() {
    return {
      screened: false
    }
  },
  computed: {
    screenReady() {
      return this.bandits.length > 0 && this.veterans.length > 0;
    },
    ...mapState('bandits', ['bandits', 'veterans'])
  },
  inject: ["setParticipants"],
  methods: {
    screenParticipants() {
      if (this.screenReady) {
        console.log("Screening is ready");
        const array = this.signups.map(signup => {
          const user = signup;
          user.experience = 'noob';
          if (this.bandits.includes(signup.name.toLowerCase())) user.experience = 'bandit';
          if (this.veterans.includes(signup.name.toLowerCase())) user.experience = 'veteran';
          return user;
        })
        this.screened = array;
        console.log(this.screened);
      } else {
        console.log("Bandit information unavailable. Check GOB Api connection.")
      }
    }
  },
  created() {
    this.$store.dispatch('bandits/fetchBandits');
    this.$store.dispatch('bandits/fetchVeterans');
  }
};
</script>

<style scoped>
ul {
	list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>