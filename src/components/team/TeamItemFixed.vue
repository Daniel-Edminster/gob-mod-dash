<template>
	<div
		ref="teamItem"
	>
		<p>{{ team.number }}</p>
		<ul>
			<li v-for="user in team.members" :key="user.name">
				{{ user.roles[0] }}:
				<span
					:class="user.experience"
					>{{ user.name }}</span
				>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "TeamItemFixed",
	props: {
		team: {
			type: Object,
			required: true,
		}
	}
};
</script>

<style scoped>
div {
	border: 1px solid grey;
	border-radius: 5px;
	margin: 5px;
	padding: 5px;
	flex-grow: 1;
	background-color: #3c3548;
	user-select: none;
}

p {
	margin: 0;
	font-weight: bold;
	text-align: right;
}

ul {
	list-style-type: none;
	padding: 0;
	text-align: left;
}

li {
	font-size: 0.8rem;
	font-weight: bold;
	color: lightgrey;
	margin: 2px 0;
	display: flex;
}

span {
	font-size: 0.9rem;
	border-radius: 2px;
	flex-grow: 1;
	margin-left: 5px;
}
</style>