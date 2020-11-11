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
      setPool: this.setPool,
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
    setThread(key, value) {
      this.round.threads[key] = value;
      this.$store.dispatch('rounds/saveRounds');
    },
    setPool(key, value) {
      this.round.pools[key] = value;
      this.$store.dispatch('rounds/saveRounds');
    }
  },
  created() {
    this.fetchRound(this.id);
  }
}
</script>