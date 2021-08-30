// let loadSubreddit = reddit.subreddit;
const loadSettings = localStorage.settings ? JSON.parse(localStorage.settings) : null;
if (loadSettings) loadSubreddit = loadSettings.subreddit;

// const load = localStorage.settings ? JSON.parse(localStorage.settings) : null;
// let subreddit = '';
// if (load) subreddit = load.subreddit ? load.subreddit : '';

const settings = {
  namespaced: true,
  state() {
    return {
      subreddit: loadSubreddit
    }
  },
  getters: {
    getSubreddit: (state) => {
      return state.subreddit;
    }
  },
  mutations: {
    saveSubreddit(state, subreddit) {
      state.subreddit = subreddit;
    }
  },
  actions: {
    async setSubreddit({ commit, dispatch }, subreddit) {
      const check = await reddit.setSubreddit(subreddit);
      if (check === true) {
        commit('saveSubreddit', subreddit);
        dispatch('saveSettings');
        return `Subreddit set to ${subreddit}. Mod check passed.`
      } else if (check === false) {
        commit('saveSubreddit', subreddit);
        dispatch('saveSettings');
        return `Subreddit set to ${subreddit}. Current user is not a mod; can only get threads.`
      } else {
        return `Subreddit does not exist.`
      }
    },
    saveSettings({ state }) {
      console.log("Saving Settings");
      localStorage.setItem('settings', JSON.stringify(state));
    }
  }
}


export default settings;