<template>
   <table id="pools">
      <thead>
         <tr>
            <th>Stage</th>
            <th>Pool</th>
            <th>View</th>
            <th>Delete</th>
         </tr>
      </thead>
      <tbody>
         <tr
            v-for="(value, key) in pools"
            :key="key"
         >
            <td class="thread">{{ key }}</td>
            <td>
               {{ value ? value.length : "" }}
            </td>
            <td>
               <button v-if="value" @click="logPool(key)">Print to Console</button>
            </td>
            <td>
               <button v-if="value"
                  :name="key"
                  @click="deletePool(key)"
                  class="delete"
               >Delete</button>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script>
export default {
   name: "RoundPools",
   props: {
      pools: {
         type: Object,
         required: true,
      },
   },
   inject: ["setPool"],
   methods: {
      deletePool(key) {
         this.setPool(key, null);
      },
      logPool(key) {
         console.log(this.pools[key]);
      },
   },
};
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

tr {
   height: calc(100%/6);
}

td.thread {
   text-transform: uppercase;
   text-align: right;
   font-size: 0.7rem;
   font-weight: bold;
   padding: 0 5px;
}

thead {
   background-color: #2d2b38;
   color: white;
}

tbody {
   background-color: #3c3548;
   font-size: 0.9rem;
}

button.delete {
   background: salmon;
   color: black;
}
</style>