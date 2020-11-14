<template>
	<div>
		<!-- <DatePicker v-model="value" /> -->
		<DatePickerLite
			:id-attr="datePickerSetting.id"
			v-model="value"
			@value-changed="updateDate"
		/>
	</div>
</template>

<script>
// import DatePicker from "vue3-datepicker";
import DatePickerLite from 'vue3-datepicker-lite'

export default {
	name: "RoundMetadata",
	components: {
    // DatePicker,
    DatePickerLite
	},
	props: {
		date: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
      value: null,
      datePickerSetting: 
      {
        id: "date-picker",
        value: this.date.value
      }
		};
  },
  inject: ['setDate'],
  methods: {
    updateDate(value) {
      this.setDate(this.date.key, value)
    }
  },
	created() {
		this.value = this.date.value;
	},
};
</script>

<style>
/* DatePickerLite styles */
td[role="presentation"] {
	color: black;
}

div[class="picker__warp"] {
	box-shadow: none !important;
}

button[class="picker__button--today"],
button[class="picker__button--clear"],
button[class="picker__button--close"] {
  color: black !important;
}

input#date-picker {
	width: 100px;
}
</style>