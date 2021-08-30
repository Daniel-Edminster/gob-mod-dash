<template>
   <table>
      <thead>
         <tr>
            <th colspan="2">Reddit API Testing</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td>
               <button @click="testReddit()">Get Me</button>
            </td>
            <td class="description">
               Return information on the current logged in user (that's you!)
            </td>
         </tr>
      </tbody>
      <tfoot>
         <tr>
            <td colspan="2">
               <span id="message">{{ message }}</span>
            </td>
         </tr>
      </tfoot>
   </table>
</template>

<script>
import { mapState } from "vuex";

export default {
   name: "DebugReddit",
   data() {
      return {
         message: null,
         songRoundNumber: 1,
         messageElement: null,
      };
   },
   computed: mapState("auth", ["reddit"]),
   methods: {
      async testReddit() {
         const username = await this.reddit.getUsername();
         if (username) {
            this.messageElement.className = "ok";
            this.message = `Success: your username is ${username}`;
         } else {
            this.messageElement.className = "bad";
            this.message = `There was a problem connecting to the reddit api.`;
         }
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
      this.messageElement = document.getElementById("message");
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

span.ok {
   color: greenyellow;
}

span.bad {
   color: salmon;
}

span.fetch {
   color: white;
}
</style>