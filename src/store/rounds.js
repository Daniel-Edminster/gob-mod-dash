import Round from "@/js/classes/Round"
import { loadRoundsListFromDatabase } from "@/js/functions/fauna/loadRounds"
import { loadRoundFromDatabase } from "@/js/functions/fauna/loadRounds";
import saveRoundToDatabase from "@/js/functions/fauna/saveRound";

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
      },
      updateRoundId(state, payload) {
         const round = state.rounds.find(round => round.number === payload.number);
         round.id = payload.id;
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
      async loadRound({ state, commit, dispatch, getters }, number) {
         if (!state.roundsList.find(round => round.number === number)) return { name: "Not found", message: "No round by that number exists." }
         const existingRound = getters.getRoundByNumber(number);
         if (existingRound && existingRound.id) return `Round ${number} found locally.`;
         if (existingRound && !existingRound.id) return `Round ${number} appears to be a new, unsaved round.`
         // Nothing found locally, fetch from database.
         try {
            const response = await loadRoundFromDatabase(number);
            if (response) {
               commit('storeRound', response);
               dispatch('saveRounds');
               return `Loaded round ${number} from database.`
            }
         } catch(err) {
            return err;
         }
      },
      async saveRoundToDatabase({ getters, commit, dispatch }, number) {
         const round = getters.getRoundByNumber(number);
         try {
            const id = await saveRoundToDatabase(round);
            commit('updateRoundId', { number, id });
            dispatch('loadRoundsList');
            dispatch('saveRounds');
         } catch(err) {
            console.error(err);
         }
      },
      storeRound({ commit, dispatch }, round) {
         console.log("Storing round...", round.number);
         commit('storeRound', round);
         dispatch('saveRounds');
         console.log(`Round ${round.number} stored.`);
      },
      createRound({ state, commit }, number) {
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