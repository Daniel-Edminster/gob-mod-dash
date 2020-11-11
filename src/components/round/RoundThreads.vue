<template>
  <table id="threads">
		<thead>
			<tr>
				<th>Stage</th>
				<th>Thread</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(value, key) in threads" :key="key">
				<td>{{ key }}</td>
				<td v-if="editing === key">
					<input type="text" :id="`input-${key}`" :value="value" />
				</td>
				<td v-else>
					<a :href="`http://www.reddit.com/by_id/${value}`">{{ value }}</a>
				</td>
				<td>
          <button v-if="!editing" :name="key" @click="setEditing($event)">Edit</button>
          <button v-if="editing === key" @click="cancelEditing">Cancel</button>
          <button v-if="editing === key" :name="key" @click="confirmEdit($event)">Confirm</button>
        </td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
  name: 'RoundThreads',
  props: {
    threads: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: null
    }
  },
  inject: ['setThread'],
  methods: {
    setEditing(event) {
      this.editing = event.target.name;
    },
    cancelEditing() {
      this.editing = null;
    },
    confirmEdit(event) {
      const key = event.target.name;
      const input = document.getElementById(`input-${key}`);
      const value = input.value;
      console.log(`Setting thread ${key} to ${value}`)
      this.setThread(key, value)
      this.editing = null;
    }
  }
}
</script>