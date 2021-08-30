<template>
   <h1>Authenticating</h1>
   <p v-if="isAuthenticated">Logged in successfully</p>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
   computed: {
      ...mapState('auth', ['reddit']),
      ...mapGetters('auth', ['isAuthenticated'])
   },
   async mounted() {
      try {
         const code = new URL(window.location.href).searchParams.get('code');
         const authenticated = await this.$store.dispatch("auth/instantiateReddit", code);
         if (authenticated) {
            this.$router.replace('/');
         }
      } catch (err) {
         console.log(err);
      }
   }
}
</script>