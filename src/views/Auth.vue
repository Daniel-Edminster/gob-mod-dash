<template>
   <div v-if="isAuthenticated">
      <p>Logged in successfully</p>
   </div>
   <div v-else>
      <p>Authenticating... please wait</p>
      <base-spinner />
   </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
   computed: {
      ...mapState("auth", ["reddit"]),
      ...mapGetters("auth", ["isAuthenticated"]),
   },
   async mounted() {
      try {
         const code = new URL(window.location.href).searchParams.get("code");
         const authenticated = await this.$store.dispatch(
            "auth/authenticate",
            { code }
         );
         if (authenticated) {
            this.$router.replace("/");
         }
      } catch (err) {
         console.log(err);
      }
   },
};
</script>