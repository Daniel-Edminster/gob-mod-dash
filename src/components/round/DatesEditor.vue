<template>
   <base-modal :title="`Edit dates for round ${roundNum}`" :open="open" @close="closeWindow">
      <template #default>
         <table>
            <thead>
               <tr>
                  <th>Stage</th>
                  <th>Time (UTC)</th>
                  <th>Date</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(value, key) of dates" :key="key">
                  <td>{{ key }}</td>
                  <td>{{ formatTime(value) }}</td>
                  <td v-if="editing === key">
                     <DatePickerWrapper :date="{ key, value }" />
                  </td>
                  <td v-else>{{ formatDate(value) }}</td>
                  <td v-if="editing === key">
                     <button @click="clearEditing">Done</button>
                  </td>
                  <td v-else>
                     <button @click="setediting(key)">Edit</button>
                  </td>
               </tr>
            </tbody>
         </table>
      </template>
      <template #actions>
         <button @click="closeWindow">Cancel</button>
         <button @click="setDates">Confirm</button>
      </template>
   </base-modal>
</template>

<script>
import { formatDateToISOString } from "../../js/functions/utils";
import DatePickerWrapper from "../shared/DatePickerWrapper.vue"

export default {
   name: 'DatesEditor',
   components: {
      DatePickerWrapper
   },
   props: {
      open: {
         type: Boolean,
         required: true
      },
      roundNum: {
         type: String,
         required: true
      },
      roundDates: {
         type: Object,
         required: true
      },
   },
   data() {
      return {
         dates: null,
         editing: null
      }
   },
   inject: ["closeEditor"],
   methods: {
      clearEditing() {
         this.editing = null;
      },
      formatDate(date) {
         return formatDateToISOString(date);
      },
      formatTime(ISOString) {
         const date = new Date(ISOString);
         const hour = date.getUTCHours();
         let min = date.getUTCMinutes().toString();
         if (min.length === 1) min = '0' + min;
         return `${hour}:${min}`;
      },
      setDates() {
         console.log("Setting dates...");
         this.editing = null;
         this.closeEditor();
      },
      setediting(key) {
         this.editing = key;
      },
      closeWindow() {
         this.clearEditing
         this.closeEditor();
      }
   },
   mounted() {
      this.dates = { ...this.roundDates };
   }
}
</script>

<style scoped>
table {
   color: white;
   text-align: left;
   border-spacing: 15px 8px;
}
</style>