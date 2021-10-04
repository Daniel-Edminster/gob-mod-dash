<template>
   <button @click="login">Login via reddit</button>
</template>

<script>

export default {
   methods: {
      async login() {
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