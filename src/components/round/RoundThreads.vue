<template>
   <div>
      <table id="threads">
         <thead>
            <tr>
               <th>Stage</th>
               <th>Thread</th>
               <th>Action</th>
               <th>Database</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(value, key) in threads" :key="key">
               <td class="thread">{{ key }}</td>
               <td v-if="editing === key" class="middle">
                  <input type="text" :id="`input-${key}`" :value="value?.source" />
               </td>
               <td v-else class="middle">
                  <a :href="`http://www.reddit.com/by_id/${value?.source}`">{{ value?.source }}</a>
               </td>
               <td class="controls">
                  <button v-if="!editing" :name="key" @click="setEditing($event)">Edit</button>
                  <button v-if="value" class="delete" @click="deleteThread(key)">Delete</button>
                  <button v-if="editing === key" @click="cancelEditing">Cancel</button>
                  <button v-if="editing === key" :name="key" @click="confirmEdit($event)">Confirm</button>
               </td>
               <td class="controls" v-if="!value?.id">
                  <button v-if="value" @click="saveThreadsToDatabase([value])">Save to DB</button>
               </td>
               <td v-else>
                  {{ value.id }}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
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
   inject: ['deleteThread', 'saveThreadsToDatabase', 'setThread'],
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

<style scoped>
table {
   border: 1px solid black;
   border-spacing: 1px;
   margin: 15px;
}

td {
   padding: 3px;
}

td.thread {
   text-transform: uppercase;
   text-align: right;
   font-size: 0.7rem;
   font-weight: bold;
   padding: 0 5px;
}

td.middle {
   width: 100px;
   height: 40px;
   padding: 0;
}

td.controls {
   width: 150px;
}

thead {
   background-color: #2d2b38;
   color: white;
}

tbody {
   background-color: #3c3548;
   font-size: 0.9rem;
}

input {
   background-color: black;
   color: white;
   width: 100%;
   margin-left: 0;
   height: 100%;
   text-align: center;
}

button + button {
   margin-left: 5px;
}
</style>