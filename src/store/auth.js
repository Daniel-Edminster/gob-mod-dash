import snoowrap from 'snoowrap';
import Reddit from "@/js/classes/Reddit"

const auth = {
   namespaced: true,
   state() {
      return {
         reddit: null,
         username: null
      }
   },
   getters: {
      isAuthenticated(state) {
         return state.reddit ? true : false;
      },
   },
   mutations: {
      saveReddit(state, reddit) {
         state.reddit = reddit;
      },
      saveUsername(state, username) {
         state.username = username;
      }
   },
   actions: {
      getLoginUrl() {
         try {
            return snoowrap.getAuthUrl({
               clientId: process.env.VUE_APP_REDDIT_CLIENT_ID_APP,
               scope: ['read', 'submit', 'mysubreddits', 'identity'],
               redirectUri: process.env.VUE_APP_REDDIT_REDIRECT_URI,
               permanent: false,
               state: 'changetorandomstring'
            })
         } catch (err) {
            console.log(err);
         }
      },
      async instantiateReddit({ commit }, code) {
         try {
            const instance = await snoowrap.fromAuthCode({
               code,
               userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
               clientId: process.env.VUE_APP_REDDIT_CLIENT_ID_APP,
               redirectUri: process.env.VUE_APP_REDDIT_REDIRECT_URI
            });
            instance.config({
               continueAfterRatelimitError: true
            });
            const reddit = new Reddit(instance);
            console.log(reddit);
            const username = await reddit.getUsername();
            commit('saveReddit', reddit);
            commit('saveUsername', username);
            return true;
         } catch (err) {
            console.log(err);
         }
      }
   }
}

export default auth;