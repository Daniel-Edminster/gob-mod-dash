<template>
	<div>
		<DebugGOB />
	</div>
</template>

<script>
import DebugGOB from "@/components/settings/DebugGOB";

export default {
	name: "Settings",
	components: {
		DebugGOB,
	},
};
</script>

<style scoped>
div {
  display: flex;
  direction: column;
  justify-content: center;
}
</style>