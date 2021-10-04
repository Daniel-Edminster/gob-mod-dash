import Snoowrap from 'snoowrap';
import Reddit from "@/js/classes/Reddit"

const auth = {
   namespaced: true,
   state() {
      return {
         reddit: null,
         user: null,
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
      async verifyAuth({ dispatch }, code) {
         const rootUrl = process.env.VUE_APP_API_BASE_URL;
         console.log(rootUrl);
         const response = await fetch(`${rootUrl}/reddit/verify`, {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'text/plain'
            },
            body: code
         })
         console.log(response);
         const body = await response.json();
         console.log(response, body);
         const { token } = body;
         if (token) return dispatch('instantiateReddit', token);
         console.log(body);
         throw new Error('Error TBD');
      },
      instantiateReddit(_, accessToken) {
         const snoowrap = new Snoowrap({
            userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
            accessToken
         })
         return new Reddit(snoowrap);
      },
      async authenticate({ commit, dispatch }, credentials) {
         const { code, accessToken } = credentials;
         try {
            const reddit = code ?
               await dispatch('verifyAuth', code) :
               await dispatch('instantiateReddit', accessToken);
            commit('setReddit', reddit);
            const user = await reddit.verifyUser();
            if (!user) return dispatch('logout', 'There was an issue fetching your username from reddit. Please login again.');
            commit('setUser', user);
            dispatch(`saveSession`, reddit.snoowrap.accessToken);
            return true;
         } catch (err) {
            console.log(err);
         }
      },
      saveSession(_, accessToken) {
         const session = { accessToken, timestamp: Date.now() };
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
            return "Now logged in."
         } else {
            dispatch('logout', "Previous session expired. Please login again.");
            return "Session expired."
         }
      },
      async logout(_, message) {
         console.log('Logged out:', message);
         localStorage.removeItem('mdSession');
         location.reload();
      }
   }
}

export default auth;