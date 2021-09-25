import Round from "@/js/classes/Round"
import loadRoundsList from "@/js/functions/fauna/loadRounds"

// const array = localStorage.rounds ? JSON.parse(localStorage.rounds) : [];

const rounds = {
   namespaced: true,
   state() {
      return {
         rounds: null,
         roundsList: []
      }
   },
   getters: {
      getRoundByNumber: (state) => (number) => {
         const roundsList = state.roundsList;
         const round = roundsList.find(round => {
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
         const roundsList = [...state.roundsList];
         const round = new Round(number);
         roundsList.push(round);
         roundsList.sort((a, b) => b.number - a.number);
         state.roundsList = roundsList;
      },
      saveRoundsList(state, roundsList) {
         state.roundsList = roundsList;
      }
   },
   actions: {
      async loadRounds({ commit }) {
         try {
            const response = await loadRoundsList();
            if (response?.data) commit('saveRoundsList', response.data);
         } catch(err) {
            console.log(err);
         }
      },
      createRound({ state, commit, dispatch }, number) {
         const rounds = state.roundsList;
         const roundExists = rounds.find(round => {
            return round.number === number;
         })
         if (roundExists) {
            const message = `Round ${number} already exists!`
            return message;
         } else {
            const message = `Created Round ${number}`;
            commit('createRound', number);
            dispatch('saveRounds');
            return message;
         }
      },
      saveRounds({ state }) {
         console.log("Saving Rounds");
         localStorage.setItem('rounds', JSON.stringify(state.rounds));
      },
   }
}

export default rounds;