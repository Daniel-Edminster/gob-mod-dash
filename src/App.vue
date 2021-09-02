<template>
	<NavBar />
	<div id="main-content">
		<router-view />
	</div>
</template>

<script>
import NavBar from "@/components/nav/NavBar"

export default {
   components: {
      NavBar
   },
   created() {
      this.$store.dispatch("auth/checkExistingSession");
   }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
  font-family: 'Helvetica Neue',Arial,Helvetica,sans-serif;
  height: 100vh;
}

body {
	margin: 0;
	padding: 0;
  background-color: #2d2b38;
}

#nav {
	background-color: rgb(38, 36, 43);
	color: rgb(185, 185, 185);
	padding: 30px;

	a {
		font-weight: bold;

		&.router-link-exact-active {
			color: #42b983;
		}
	}

	a {
		color: rgb(236, 174, 124);
	}

	a:hover {
		color: white;
	}

	a:active {
		color: rgb(235, 195, 162);
	}
}

#main-content {
	background-color: #2d2b38;
	color: white;
}

a {
	color: rgb(236, 174, 124);
}

a:hover {
	color: white;
}

a:active {
	color: rgb(235, 195, 162);
}

button {
  background-color: #5290bd;
  color: white;
  border-radius: 5px;
  border: none;
  padding: 8px;
  font-weight: bold;
}

button:hover {
  background-color: #70a0c0;
  cursor: pointer;
}

input {
  background-color: black;
  color: white;
  margin: 8px;
}
</style>
