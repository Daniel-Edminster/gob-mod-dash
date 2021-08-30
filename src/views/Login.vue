<template>
   <button @click="login">Login via reddit</button>
</template>

<script>
// import reddit from "@/js/api/reddit.js";

export default {
   methods: {
      async login() {
         // const authenticationUrl = reddit.getLoginUrl();
         const authenticationUrl = await this.$store.dispatch("auth/getLoginUrl");
         window.location.href = authenticationUrl;
      },
   }
};
</script>

<style scoped>
button {
   margin: 50px;
}
</style>