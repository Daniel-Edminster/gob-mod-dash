<template>
  <table id="pools">
		<thead>
			<tr>
				<th>Stage</th>
				<th>Pool</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(value, key) in pools" :key="key">
				<td>{{ key }}</td>
				<td>
					{{ value ? value.length : "" }}
				</td>
				<td>
          <button :name="key" @click="deletePool(key)">Delete</button>
        </td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
  name: 'RoundPools',
  props: {
    pools: {
      type: Object,
      required: true
    }
  },
  inject: ['setPool'],
  methods: {
    deletePool(key) {
      this.setPool(key, null);
    }
  }
}
</script>