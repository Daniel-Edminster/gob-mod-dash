<template>
   <table>
      <thead>
         <tr>
            <th colspan="2">Game of Bands API Testing</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td>
               <button @click="testGobApi('fetchBandits')">Fetch Bandits</button>
            </td>
            <td class="description">
               Return all users who have participated in GOB
            </td>
         </tr>
         <tr>
            <td>
               <button @click="testGobApi('fetchVeterans')">Fetch Veterans</button>
            </td>
            <td class="description">
               Return all users who have played more than 5 rounds
            </td>
         </tr>
         <tr>
            <td>
               <button @click="testGobApi('fetchThemes')">Fetch Themes</button>
            </td>
            <td class="description">
               Return list of rounds with themes and songcounts
            </td>
         </tr>
         <tr>
            <td><button @click="testGobApiSongs()">Fetch Songs</button></td>
            <td class="description">
               Return songs for round:
               <input
                  type="number"
                  v-model="songRoundNumber"
               />
            </td>
         </tr>
      </tbody>
      <tfoot>
         <tr>
            <td colspan="2">
               <p id="gobmessage">{{ message }}</p>
               <base-spinner v-if="isLoading" />
            </td>
         </tr>
      </tfoot>
   </table>
</template>

<script>
export default {
   name: "DebugGOB",
   data() {
      return {
         isLoading: false,
         message: null,
         songRoundNumber: 1,
         messageElement: null,
      };
   },
   methods: {
      async testGobApi(func) {
         const rootUrl = process.env.VUE_APP_BASE_URL;
         this.isLoading = true;
         const response = await fetch(`${rootUrl}/api/gob?${func}`);
         const obj = await response.json();
         this.isLoading = false;
         this.handleResponse(obj)
      },
      async testGobApiSongs() {
         const rootUrl = process.env.VUE_APP_BASE_URL;
         this.isLoading = true;
         const response = await fetch(`${rootUrl}/api/gob?fetchSongs=${this.songRoundNumber}`);
         const obj = await response.json();
         this.isLoading = false;
         this.handleResponse(obj);
      },
      setFetchingMessage() {
         this.messageElement.className = "fetch";
         this.message = "fetching request...";
      },
      handleResponse(obj) {
         const { status, data } = obj;
         this.message = `${status.code} ${status.text}.`;
         if (status.code === 200) {
            console.log(data);
            this.messageElement.className = "ok";
            this.message += " Check console for data.";
         } else {
            this.messageElement.className = "bad";
         }
      },
   },
   mounted() {
      this.messageElement = document.getElementById("gobmessage");
   },
};
</script>

<style scoped>
td.description {
   font-size: 0.8rem;
   text-align: left;
}

button {
   width: 100%;
}

p.ok {
   color: greenyellow;
}

p.bad {
   color: salmon;
}

p.fetch {
   color: white;
}
</style>