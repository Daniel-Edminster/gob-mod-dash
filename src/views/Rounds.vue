<template>
  <AddRound />
  <RoundsList />
</template>

<script>
import AddRound from "@/components/AddRound"
import RoundsList from "@/components/RoundsList"

export default {
  name: 'Rounds',
  components: {
    AddRound,
    RoundsList
  }
}
</script>