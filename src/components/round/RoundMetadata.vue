<template>
	<div>
		<table id="metadata">
			<thead>
				<tr>
					<th colspan="3">Round Metadata</th>
				</tr>
				<tr>
					<th>Property</th>
					<th>Value</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Number</td>
					<td>
						{{ round.number }}
					</td>
					<td>n/a</td>
				</tr>
        <tr>
					<td>Begin Date</td>
          <td v-if="editing === 'begin'">
            <DatePickerWrapper :date="{key: 'begin', value: round.dates.begin}" />
          </td>
					<td v-else>
						{{ round.dates.begin }}
					</td>
					<td v-if="editing === 'begin'">
            <button @click="clearEditing">Done</button>
          </td>
          <td v-else>
            <button @click="setEditing('begin')">Edit</button>
          </td>
				</tr>
        <tr>
					<td>End Date</td>
					<td v-if="editing === 'end'">
						<DatePickerWrapper :date="{key: 'end', value: round.dates.end}" />
					</td>
					<td v-else>
            {{ round.dates.end }}
          </td>
          <td v-if="editing === 'end'">
            <button @click="clearEditing">Done</button>
          </td>
          <td v-else>
            <button @click="setEditing('end')">Edit</button>
          </td>
				</tr>
				<tr v-if="round.theme">
					<td>Theme</td>
					<td>{{ round.theme }}</td>
					<td><button>Clear</button></td>
				</tr>
				<tr v-if="round.participants">
					<td>Participants</td>
					<td>{{ round.participants.length }}</td>
					<td>
						<button @click="clearProperty('participants')">Clear</button>
					</td>
				</tr>
				<tr v-if="round.teams">
					<td>Teams</td>
					<td>{{ round.teams.length }}</td>
					<td><button @click="clearProperty('teams')">Clear</button></td>
				</tr>
				<tr v-if="round.songs">
					<td>Songs</td>
					<td>{{ round.songs.length }}</td>
					<td><button @click="clearProperty('songs')">Clear</button></td>
				</tr>
			</tbody>
			<tfoot v-if="!round.active && !round.complete">
				<tr v-if="!round.threads.theme">
					<td class="needs-action" colspan="3">
						Theme Nomination thread pending!
					</td>
				</tr>
        <tr v-if="round.threads.theme && !round.theme">
          <td class="needs-action" colspan="3">Awaiting theme nominations!</td>
        </tr>
				<tr v-if="round.theme && !round.threads.signup">
					<td class="needs-action" colspan="3">Signup thread pending!</td>
				</tr>
        <tr v-if="round.threads.signup && !round.participants">
					<td class="needs-action" colspan="3">Awaiting signups!</td>
				</tr>
        <tr v-if="round.participants && !round.teams">
					<td class="needs-action" colspan="3">Awaiting team allocation!</td>
				</tr>
        <tr v-if="round.teams">
					<td class="needs-action" colspan="3">Check teams and activate round!</td>
				</tr>
			</tfoot>
			<tfoot v-if="round.active">
				<tr>
					<td class="good" colspan="3">Round is active</td>
				</tr>

				<tr v-if="!round.threads.launch">
					<td class="needs-action" colspan="3">Launch thread pending!</td>
				</tr>
				<tr v-if="!round.threads.late">
					<td class="needs-action" colspan="3">
						Late Recruitment thread pending!
					</td>
				</tr>
			</tfoot>
			<tfoot v-if="round.complete">
				<tr>
					<td v-if="!round.threads.congrats" class="neutral" colspan="3">
						Round is over.
					</td>
					<td v-else class="static" colspan="3">Round is concluded</td>
				</tr>
				<tr v-if="!round.songs">
					<td class="needs-action" colspan="3">Awaiting song information!</td>
				</tr>
				<tr v-if="round.songs && !round.threads.voting">
					<td class="needs-action" colspan="3">Voting thread pending!</td>
				</tr>
        <tr v-if="round.threads.voting && !round.winners">
					<td class="needs-action" colspan="3">Awaiting voting information!</td>
				</tr>
				<tr v-if="round.winners && !round.threads.congrats">
					<td class="needs-action" colspan="3">Congrats thread pending!</td>
				</tr>
			</tfoot>
		</table>
		<button v-if="round.active" @click="clearBoolean('active')">
			Clear Active
		</button>
		<button v-if="round.complete" @click="clearBoolean('complete')">
			Clear Complete
		</button>
	</div>
</template>

<script>
import DatePickerWrapper from '../shared/DatePickerWrapper'

export default {
  name: "RoundMetadata",
  components: {
    DatePickerWrapper
  },
  data() {
    return {
      editing: null
    }
  },
	props: {
		round: {
			type: Object,
			required: true,
		},
  },
  inject: ["clearBoolean", "clearProperty"],
  methods: {
    setEditing(value) {
      this.editing = value;
    },
    clearEditing() {
      this.editing = null;
    }
  }
};
</script>

<style scoped>
table#metadata {
	border: 1px solid black;
	border-spacing: 1px;
	margin: 15px;
}

tbody td {
	padding: 8px 10px;
}

tbody > tr > td:first-child {
	text-transform: uppercase;
	text-align: right;
	font-size: 0.8rem;
	font-weight: bold;
}

thead {
	background-color: #2d2b38;
	color: white;
}

thead > tr:first-child > th {
	padding: 5px;
}

tbody {
	background-color: #3c3548;
	font-size: 0.9rem;
}

tfoot {
	font-size: 0.8rem;
	font-weight: bold;
}

td.good {
	color: greenyellow;
}

td.needs-action {
	color: salmon;
}

td.neutral {
	color: orange;
}

td.static {
	color: grey;
}
</style>