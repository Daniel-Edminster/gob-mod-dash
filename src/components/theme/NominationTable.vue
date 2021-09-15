<template>
   <table>
      <thead>
         <tr>
            <th>DB ID</th>
            <th>Description</th>
            <th>Score</th>
            <th>Comment</th>
            <th>User</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="nom in nominations" :key="nom.source">
            <td>
               <span v-if="nom.id">{{ nom.id }}</span>
            </td>
            <td>{{ nom.description }}</td>
            <td>{{ scores[nom.source] }}</td>
            <td>{{ nom.source }}</td>
            <td>{{ nom.user }}</td>
         </tr>
      </tbody>
      <tfoot></tfoot>
   </table>
</template>

<script>
export default {
   name: 'NominationTable',
   props: {
      nominations: {
         type: Array,
         required: true
      },
      scores: {
         type: Object,
         required: true
      }
   },
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

thead {
   background-color: #2d2b38;
   color: white;
}

tbody {
   background-color: #3c3548;
   font-size: 0.9rem;
}
</style>