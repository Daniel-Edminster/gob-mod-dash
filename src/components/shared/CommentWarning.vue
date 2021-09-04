<template>
   <div id="important-box">
      <div class="warning">
         <h4>Warning: It looks like your {{ thread }} thread is in /r/gameofbands!</h4>
         <p>During testing, we don't want to post new comments to /r/gameofbands threads.</p>
      </div>
      <div
         class="instructions"
         v-if="thread === 'launch'"
      >
         <h5>This screen will disappear as soon as you begin clearing things, so read the next bit fully before acting.</h5>
         <h4>Instructions to fix:</h4>
         <h5>The following 3 items require clearing:</h5>
         <ul>
            <li>Active</li>
            <li>Teams</li>
            <li>Participants</li>
         </ul>
         <p>If you want to continue using the existing /r/gameofbands thread, be sure to use Fetch Teams after rescreening the participants.</p>
         <p>Alternatively, if you want to post a new test thread to /r/waitingforgobot, you'll also need to clear the Launch thread ID.</p>
      </div>
      <div
         class="instructions"
         v-if="thread === 'voting'"
      >
         <h4>Instructions to fix:</h4>
         <p>Just use the Find Comments button above.</p>
         <p>Or if you want to post a new test thread, clear the Voting thread ID.</p>
      </div>
   </div>
</template>

<script>
export default {
   name: "CommentWarning",
   props: {
      thread: {
         type: String,
         required: true,
      },
   },
   inject: ["found"],
};
</script>

<style scoped>
div.important-box {
   display: flex;
   justify-content: center;
}

div.warning {
   color: orange;
   border: 1px solid orange;
   background-color: black;
   padding: 0 21px 5px 21px;
   max-width: 90ch;
   margin: 10px 0;
}

div.instructions {
   margin: 10px 0;
   max-width: 90ch;
   padding: 0 21px 5px 21px;
   border: 1px solid greenyellow;
   background-color: black;
   color: #b5e668;
}

ul {
   list-style-type: none;
   padding-left: 0;
}
</style>