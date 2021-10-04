<template>
   <div id="nav">
      <span id="logo">Game of Bands Mod Dashboard</span>
      <span id="protected" v-if="isAuthenticated && isModerator">
         <router-link to="/">Home</router-link>
         <router-link :to="{ name: 'Rounds' }">Rounds</router-link>
         <router-link :to="{ name: 'Templates' }">Templates</router-link>
         <router-link :to="{ name: 'Help' }">Help</router-link>
         <router-link :to="{ name: 'Settings' }">Settings</router-link>
      </span>
      <span v-else>Please login to begin</span>
      <span id="account">
         <span id="login" v-if="!isAuthenticated">
            <router-link :to="{ name: 'Login' }">Login</router-link>
         </span>
         <span v-else>
            <span v-if="getUsername">
               Logged in as
               <strong>{{ getUsername }}</strong>
            </span>
            <span v-else>Fetching user information...</span>
            <button @click="logout">Logout</button>
         </span>
      </span>
   </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   computed: {
      ...mapGetters("auth", ["getUsername", "isAuthenticated", "isModerator"]),
   },
   methods: {
      logout() {
         this.$store.dispatch('auth/logout', 'User logged out.')
      }
   }
};
</script>

<style scoped>
div#nav {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
}

span#logo {
   text-align: left;
}

span#account {
   text-align: right;
}

a {
   padding: 0 10px;
}
</style>