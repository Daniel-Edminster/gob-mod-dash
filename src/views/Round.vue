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
      checkComment: this.checkComment,
      clearProperty: this.clearProperty,
      returnAngels: this.returnAngels,
      setActive: this.setActive,
      setComment: this.setComment,
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
    checkComment(comment) {
      const { type, number } = comment;
      if (type === 'team') {
        const team = this.round.teams.find(team => team.number === number);
        if (team.comment) return true;
        return false;
      }
    },
    clearProperty(key) {
      this.round[key] = null;
      this.saveRounds();
    },
    returnAngels(angels) {
      this.round.participants = angels;
    },
    setActive() {
      this.round.active = true;
    },
    setComment(comment, id) {
      const { type, number } = comment;
      if (type === 'team') {
        const team = this.round.teams.find(team => team.number === number);
        team.comment = id;
        this.saveRounds();
        console.log(team);
      } else if (type === 'song') {
        console.log('setting song comment id');
      }
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