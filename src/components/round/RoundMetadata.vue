<template>
	<div id="round-metadata">
    <div id="metadata">
		Number: {{ round.number }}<br />
		<p v-if="round.theme">Theme: {{ round.theme }}<button>Clear Theme</button></p>
		<p v-if="round.participants">
			Participants: {{ round.participants.length
			}}<button @click="clearProperty('participants')">
				Clear Participants
			</button>
		</p>
		<p v-if="round.teams">
			Teams: {{ round.teams.length
			}}<button @click="clearProperty('teams')">Clear Teams</button>
		</p>
    </div>
    <div id="tables">
		<RoundThreads :threads="round.threads" />
    <RoundPools :pools="round.pools" />
    </div>
	</div>
</template>

<script>
import RoundPools from "./RoundPools";
import RoundThreads from "./RoundThreads";

export default {
	name: "RoundMetadata",
	components: {
    RoundPools,
		RoundThreads,
	},
	props: {
		round: {
			type: Object,
			required: true,
		},
	},
	inject: ["clearProperty"],
};
</script>

<style scoped>
div#tables {
  display: flex;
  justify-content: space-evenly;

}
</style>