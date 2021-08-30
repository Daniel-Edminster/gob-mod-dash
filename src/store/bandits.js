// import gob from "@/js/api/gob"

const banditList = localStorage.bandits ? JSON.parse(localStorage.bandits) : [];
const veterans = localStorage.veterans ? JSON.parse(localStorage.veterans) : [];

const bandits = {
   namespaced: true,
   state() {
      return {
         bandits: banditList,
         veterans
      }
   },
   mutations: {
      setBandits(state, data) {
         state.bandits = Object.values(data);
      },
      setVeterans(state, data) {
         state.veterans = Object.values(data);
      }
   },
   actions: {
      async fetchBandits({ commit, dispatch }) {
         console.log("Fetching bandits from gob api...")
         const rootUrl = process.env.VUE_APP_BASE_URL;
         const func = 'fetchBandits';
         const response = await fetch(`${rootUrl}/api/gob?${func}`);
         const obj = await response.json();
         // const obj = await gob.fetchBandits();
         const { status, data } = obj;
         console.log(`${status.code} ${status.text}.`);
         if (status.code === 200) {
            commit('setBandits', data);
            dispatch('saveState');
         }
      },
      async fetchVeterans({ commit, dispatch }) {
         console.log("Fetching veterans from gob api...")
         const rootUrl = process.env.VUE_APP_BASE_URL;
         const func = 'fetchVeterans';
         const response = await fetch(`${rootUrl}/api/gob?${func}`);
         const obj = await response.json();
         // const obj = await gob.fetchVeterans();
         const { status, data } = obj;
         console.log(`${status.code} ${status.text}.`);
         if (status.code === 200) {
            commit('setVeterans', data);
            dispatch('saveState');
         }
      },
      saveState({ state }) {
         console.log("Saving Bandits and Veterans");
         if (state.bandits.length > 0) localStorage.setItem('bandits', JSON.stringify(state.bandits));
         if (state.veterans.length > 0) localStorage.setItem('veterans', JSON.stringify(state.veterans));
      }
   }
}

export default bandits;