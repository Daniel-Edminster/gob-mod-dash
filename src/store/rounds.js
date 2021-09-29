import Round from "@/js/classes/Round"
import { loadRoundsListFromDatabase } from "@/js/functions/fauna/loadRounds"
import { loadRoundFromDatabase } from "@/js/functions/fauna/loadRounds";

const localRounds = localStorage.rounds ? JSON.parse(localStorage.rounds) : null;
const localRoundsList = localStorage.roundsList ? JSON.parse(localStorage.roundsList) : null; 

const rounds = {
   namespaced: true,
   state() {
      return {
         rounds: localRounds || [],
         roundsList: localRoundsList || []
      }
   },
   getters: {
      getRoundByNumber: (state) => (number) => {
         const round = state.rounds.find(round => {
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
         const round = new Round(number);
         const rounds = [...state.rounds];
         const roundsList = [...state.roundsList];
         roundsList.push(round);
         roundsList.sort((a, b) => b.number - a.number);
         state.roundsList = roundsList;
         rounds.push(round);
         state.rounds = rounds;
      },
      saveRoundsList(state, roundsList) {
         state.roundsList = roundsList;
      },
      storeRound(state, round) {
         state.rounds.push(round);
      }
   },
   actions: {
      async loadRoundsList({ commit, dispatch }) {
         try {
            const response = await loadRoundsListFromDatabase();
            commit('saveRoundsList', response);
            dispatch('saveRoundsList', response);
         } catch(err) {
            console.log(err);
         }
      },
      async loadRound({ state, commit, dispatch }, number) {
         const existingRound = state.roundsList.find(round => round.number === number);
         console.log(existingRound);
         if (!existingRound?.id) {
            console.log("This round has no ID. Must be new.");
            dispatch('createRound', number);
            return;
         }
         try {
            const response = await loadRoundFromDatabase(number);
            if (response) {
               commit('storeRound', response);
               dispatch('saveRounds');
            }
         } catch(err) {
            console.log(err);
         }
      },
      storeRound({ commit, dispatch }, round) {
         console.log("Storing round...", round.number);
         commit('storeRound', round);
         dispatch('saveRounds');
         console.log(`Round ${round.number} stored.`);
      },
      createRound({ state, commit, dispatch }, number) {
         const roundsList = state.roundsList;
         const roundExists = roundsList.find(round => {
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
      saveRoundsList({state}) {
         console.log("Saving RoundsList");
         localStorage.setItem('roundsList', JSON.stringify(state.roundsList));
      }
   }
}

export default rounds;