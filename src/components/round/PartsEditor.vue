<template>
   <base-modal :title="`Edit parts for round ${roundNum}`" :open="open" @close="closeEditor">
      <template #default>
         <table>
            <thead>
               <tr>
                  <th>Part</th>
                  <th>Qty</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(element, index) in parts" :key="index">
                  <td>
                     <input type="text" v-model="element.key" />
                  </td>
                  <td>
                     <input type="number" v-model="element.value" />
                  </td>
                  <td>
                     <button @click="deletePart(index)">Delete</button>
                  </td>
               </tr>
            </tbody>
            <tfoot>
               <tr>
                  <td colspan="2">
                     <button @click="addPart">Add Part</button>
                  </td>
               </tr>
            </tfoot>
         </table>
      </template>
      <template #actions>
         <button @click="closeEditor">Cancel</button>
         <button @click="setParts">Confirm</button>
      </template>
   </base-modal>
</template>

<script>
export default {
   name: 'PartsEditor',
   props: {
      open: {
         type: Boolean,
         required: true
      },
      roundNum: {
         type: String,
         required: true
      },
      roundParts: {
         type: Object,
         required: true
      },
   },
   data() {
      return {
         parts: null
      }
   },
   inject: ["clearEditing", "setProperty"],
   methods: {
      setParts() {
         const obj = {};
         this.parts.forEach(el => { if (el.key.length > 0) obj[el.key] = el.value });
         this.setProperty("parts", obj);
         // passing the obj to rebuild the local data directly
         // since relying on the prop has a delay for some reason
         // unsure why... a closure maybe?
         this.buildLocalPartsData(obj);
         this.closeEditor();
      },
      addPart() {
         this.parts.push({ key: "", value: 1 })
      },
      deletePart(index) {
         this.parts.splice(index, 1);
      },
      buildLocalPartsData(obj) {
         const array = [];
         for (const [key, value] of Object.entries(obj)) array.push({ key, value });
         this.parts = array;
      },
      closeEditor() {
         // this.buildLocalPartsData(this.roundParts);
         this.clearEditing();
      }
   },
   mounted() {
      this.buildLocalPartsData(this.roundParts);
   }
}
</script>

<style>
th {
   color: white
}
</style>