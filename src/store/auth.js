import snoowrap from 'snoowrap';
import Reddit from "@/js/classes/Reddit"
import Snoowrap from 'snoowrap';

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
            })
         } catch (err) {
            console.log(err);
         }
      },
      async instantiateReddit({ commit, dispatch }, code) {
         try {
            const instance = await snoowrap.fromAuthCode({
               code,
               userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
               clientId: process.env.VUE_APP_REDDIT_CLIENT_ID_APP,
               redirectUri: process.env.VUE_APP_REDDIT_REDIRECT_URI
            });
            const reddit = new Reddit(instance);
            commit('saveReddit', reddit);
            const username = await reddit.getUsername();
            commit('saveUsername', username);
            const session = { accessToken: instance.accessToken, timestamp: Date.now() };
            dispatch('saveSession', session);
            return true;
         } catch (err) {
            console.log(err);
         }
      },
      saveSession(_, session) {
         console.log("Storing Session");
         // localStorage.setItem('mdSession', JSON.stringify(state.reddit));
         console.log(session);
         localStorage.setItem('mdSession', JSON.stringify(session));
      },
      async checkExistingSession({ dispatch }) {
         const storedSession = localStorage.mdSession ? JSON.parse(localStorage.mdSession) : null;
         if (!storedSession) return;
         const elapsedMin = (Date.now() - storedSession.timestamp) / 60000;
         if (elapsedMin < 60) {
            console.log(`Current session will expire in ${Math.floor(60 - elapsedMin)}min.`);
            await dispatch('refreshReddit', storedSession.accessToken);
         } else {
            console.log("Previous session expired. Please login again.");
            localStorage.removeItem('mdSession');
         }
      },
      async refreshReddit({ commit }, accessToken) {
         try {
            const instance = new Snoowrap({
               userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
               accessToken
            });
            console.log(instance);
            const reddit = new Reddit(instance);
            const username = await reddit.getUsername();
            if (!username) {
               console.log("Previous session expired. Please login again.");
               localStorage.removeItem('mdSession');
               return;
            }
            commit('saveReddit', reddit);
            commit('saveUsername', username);
         } catch (err) {
            console.log(err);
         }
      }
   }
}

export default auth;