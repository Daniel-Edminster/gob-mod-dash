<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link :to="{ name: 'Rounds' }">Rounds</router-link> |
		<router-link :to="{ name: 'Templates' }">Templates</router-link> |
		<router-link :to="{ name: 'Help' }">Help</router-link>
	</div>
	<div id="main-content">
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

body {
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vh;
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
	height: 100%;
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
</style>
