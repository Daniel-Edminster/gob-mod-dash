import Round from "@/js/classes/Round"

const array = localStorage.rounds ? JSON.parse(localStorage.rounds) : [];

const rounds = {
  namespaced: true,
  state() {
    return {
      rounds: array
    }
  },
  getters: {
    getRoundByNumber: (state) => (number) => {
      const rounds = state.rounds;
      const round = rounds.find(round => {
        return round.number === number;
      })
      if (round) {
        return round;
      } else {
        return null;
      }
    }
  },
  mutations: {
    createRound(state, number) {
      const rounds = state.rounds;
      const round = new Round(number, null);
      rounds.push(round);
    }
  },
  actions: {
    createRound({ state, commit, dispatch }, number) {
      const rounds = state.rounds;
      const roundExists = rounds.find(round => {
        return round.number === number;
      })
      if (roundExists) {
        console.log("Round already exists");
      } else {
        commit('createRound', number);
        dispatch('saveRounds');
      }
    },
    saveRounds({ state }) {
      console.log("Saving Rounds");
      localStorage.setItem('rounds', JSON.stringify(state.rounds));
    },
  }
}

export default rounds;