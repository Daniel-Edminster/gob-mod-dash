<template>
   <table>
      <thead>
         <tr>
            <th>
               Comment ID
            </th>
            <th>
               Song ID
            </th>
            <th>
               Edit
            </th>
            <th>
               Delete
            </th>
         </tr>
      </thead>
      <tbody>
         <tr
            v-for="id in ids"
            :key="id.comment"
         >
            <td>
               {{ id.comment }}
            </td>
            <td v-if="editing === id.comment">
               <input type="text" :id="`input-${id.comment}`" :value="id.song" />
            </td>
            <td v-else>
               {{ id.song }}
            </td>
            <td>
               <button v-if="!editing" @click="editSongId(id.comment)" :name="id.comment">Edit</button>
               <button v-if="editing === id.comment" @click="cancelEditing">Cancel</button>
               <button v-if="editing === id.comment" @click="confirmEdit(id.comment)" :name="id.comment">Confirm</button>
            </td>
            <td>
               <button class="delete" @click="deleteId(id.comment)">Delete</button>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script>
export default {
   name: "IdsTable",
   props: {
      ids: {
         type: Object,
         required: true,
      },
      deleteId: {
         type: Function,
         required: true
      },
      setId: {
         type: Function,
         required: true
      }
   },
   data() {
      return {
         editing: null
      }
   },
   methods: {
      editSongId(commentId) {
         this.editing = commentId;
         console.log("Editing song Id for", commentId);
      },
      cancelEditing() {
         this.editing = null;
      },
      confirmEdit(commentId) {
         const input = document.getElementById(`input-${commentId}`);
         const value = input.value;
         this.setId(commentId, value);
         this.editing = null;
      }
   },
};
</script>

<style scoped>
button.delete {
   background-color: salmon;
   color: black;
}
</style>