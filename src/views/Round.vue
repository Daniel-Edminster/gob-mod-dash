<template>
  <RoundMetadata v-if="round" :round="round" />
  <StageWrapper v-if="round" :round="round" />
  <div v-else>Round {{ id }} does not exist</div>
</template>

<script>
import RoundMetadata from "@/components/round/RoundMetadata";
import StageWrapper from "@/components/round/StageWrapper";

export default {
  name: 'Round',
  components: {
    RoundMetadata,
    StageWrapper
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      round: null
    }
  },
  provide() {
    return {
      clearProperty: this.clearProperty,
      returnAngels: this.returnAngels,
      setParticipants: this.setParticipants,
      setPool: this.setPool,
      setTeams: this.setTeams,
      setTheme: this.setTheme,
      setThread: this.setThread
    }
  },
  methods: {
    fetchRound(id) {
			const number = id;
			const round = this.$store.getters["rounds/getRoundByNumber"](number);
			if (round) {
				this.round = round;
			} else {
				console.log("No round found");
			}
    },
    clearProperty(key) {
      this.round[key] = null;
      this.saveRounds();
    },
    returnAngels(angels) {
      this.round.participants = angels;
    },
    setThread(key, value) {
      this.round.threads[key] = value;
      this.saveRounds();
    },
    setPool(key, value) {
      this.round.pools[key] = value;
      this.saveRounds();
    },
    setTheme(value) {
      console.log(`Setting theme for round ${this.round.number} to ${value}`);
      this.round.theme = value;
      this.saveRounds();
    },
    setParticipants(value) {
      this.round.participants = value;
      this.saveRounds();
    },
    setTeams(value) {
      this.round.teams = value;
      this.saveRounds();
    },
    saveRounds() {
      this.$store.dispatch('rounds/saveRounds');
    }
  },
  created() {
    this.fetchRound(this.id);
  }
}
</script>