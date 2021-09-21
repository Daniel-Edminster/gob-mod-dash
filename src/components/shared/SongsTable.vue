<template>
   <table>
      <thead>
         <tr>
            <th>
               ID
            </th>
            <th>
               Title
            </th>
            <th>
               URL
            </th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="song in songs" :key="song.id">
            <td>
               {{ song.id }}
            </td>
            <td>
               {{ song.title }}
            </td>
            <td>
               {{ song.url }}
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script>
export default {
   name: "SongsTable",
   props: {
      songs: {
         type: Array,
         required: true
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

thead {
   background-color: #2d2b38;
   color: white;
}

tbody {
   background-color: #3c3548;
   font-size: 0.9rem;
}
</style>