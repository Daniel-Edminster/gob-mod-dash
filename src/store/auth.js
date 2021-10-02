import Snoowrap from 'snoowrap';
import Reddit from "@/js/classes/Reddit"

const auth = {
   namespaced: true,
   state() {
      return {
         reddit: null,
         user: null
      }
   },
   getters: {
      getUsername(state) {
         return state.user ? state.user.username : null;
      },
      isAuthenticated(state) {
         return state.reddit ? true : false;
      },
      isModerator(state) {
         return state.user?.isMod;
      }
   },
   mutations: {
      setReddit(state, reddit) {
         state.reddit = reddit;
      },
      setUser(state, user) {
         state.user = user;
      }
   },
   actions: {
      getLoginUrl() {
         try {
            return Snoowrap.getAuthUrl({
               clientId: process.env.VUE_APP_REDDIT_CLIENT_ID_APP,
               scope: ['read', 'submit', 'mysubreddits', 'identity'],
               redirectUri: process.env.VUE_APP_REDDIT_REDIRECT_URI,
               permanent: false,
            })
         } catch (err) {
            console.log(err);
         }
      },
      async instantiateReddit(_, credentials) {
         const { code, accessToken } = credentials;
         let snoowrap;
         if (code) {
            snoowrap = await Snoowrap.fromAuthCode({
               userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
               clientId: process.env.VUE_APP_REDDIT_CLIENT_ID_APP,
               redirectUri: process.env.VUE_APP_REDDIT_REDIRECT_URI,
               code
            });
         } else if (accessToken) {
            snoowrap = new Snoowrap({
               userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
               accessToken
            });
         } else {
            throw new Error("Please pass either a code or accessToken to instantiate snoowrap.");
         }
         return new Reddit(snoowrap);
      },
      async authenticate({ commit, dispatch }, credentials) {
         try {
            const reddit = await dispatch('instantiateReddit', credentials);
            commit('setReddit', reddit);
            const user = await reddit.verifyUser();
            console.log(user);
            if (!user) dispatch('logout', 'There was an issue fetching your username from reddit. Please login again.');
            commit('setUser', user);
            dispatch(`saveSession`, reddit.snoowrap.accessToken);
         } catch(err) {
            console.log(err);
         }
      },
      saveSession(_, accessToken) {
         const session = { accessToken, timestamp: Date.now() };
         console.log("Storing Session", session);
         localStorage.setItem('mdSession', JSON.stringify(session));
      },
      async checkExistingSession({ dispatch }) {
         const storedSession = localStorage.mdSession ? JSON.parse(localStorage.mdSession) : null;
         if (!storedSession) return;
         const elapsedMin = (Date.now() - storedSession.timestamp) / 60000;
         if (elapsedMin < 60) {
            console.log(`Current session will expire in ${Math.floor(60 - elapsedMin)}min.`);
            const { accessToken } = storedSession;
            await dispatch('authenticate', { accessToken });
         } else {
            dispatch('logout', "Previous session expired. Please login again.");
         }
      },
      logout(_, message) {
         console.log('Logged out:', message);
         localStorage.removeItem('mdSession');
      }
   }
}

export default auth;