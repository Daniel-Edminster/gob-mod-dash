<template>
	<div>
    <SetSubreddit />
		<DebugGOB />
	</div>
</template>

<script>
import DebugGOB from "@/components/settings/DebugGOB";
import SetSubreddit from "@/components/settings/SetSubreddit"

export default {
	name: "Settings",
	components: {
    DebugGOB,
    SetSubreddit
	},
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>