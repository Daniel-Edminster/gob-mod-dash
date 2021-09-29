<template>
   <div>
      <DatePickerLite
         :id-attr="datePickerSetting.id"
         :placeholder-attr="formattedDate"
         @value-changed="updateDate"
      />
   </div>
</template>

<script>
import DatePickerLite from 'vue3-datepicker-lite'
import { formatDateToISOString } from '../../js/functions/utils';

export default {
   name: "RoundMetadata",
   components: {
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
   computed: {
      formattedDate() {
         return formatDateToISOString(this.value);
      }
   },
   inject: ['setDate'],
   methods: {
      updateDate(value) {
         console.log(value)
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