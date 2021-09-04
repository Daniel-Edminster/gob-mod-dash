export default class Reddit {
   constructor(snoowrapInstance) {
      this.snoowrap = snoowrapInstance;
      this.subreddit = process.env.VUE_APP_REDDIT_SUBREDDIT;
   }

   async setSubreddit(name) {
      try {
         const check = await this.snoowrap.getSubreddit(name).fetch();
         console.log(check);
         if (check) console.log("Subreddit exists");
         const listing = await this.snoowrap.getModeratedSubreddits();
         const isMod = listing.find(subreddit => subreddit.display_name == name);
         this.subreddit = name;
         if (isMod) {
            console.log("User is mod of", name);
            return true;
         }
      } catch (err) {
         if (err.message === "403") {
            console.log(`User is not a mod of ${name}`);
            return false;
         } else {
            console.log(`Subreddit ${name} does not exist`)
            return null;
         }
      }
   }

   fetchComments = async (postId) => {
      try {
         const results = await this.snoowrap.getSubmission(postId).comments;
         return results;
      } catch (err) {
         console.log(err);
      }
   }

   // unused: getSubmission is fine to use instead of fetchPost
   fetchPost = (postId) => {
      return this.snoowrap.getSubmission(postId);
   }

   // Unused: see below
   // fetchNew = (after = null) => {
   //    console.log("Searching after", after);
   //    return this.snoowrap.getNew('gameofbands', {after});
   // }

   // // Unused, since the reddit search endpoint can filter by round number in a single API call.
   // async findPost(thread, roundNum) {
   //    console.log(`Finding ${thread} thread for round ${roundNum}`);
   //    console.log(`Search text: ${this.titles[thread]}`);
   //    let found = [];
   //    let listing;
   //    let after;
   //    let count = 0;
   //    while (found.length === 0) {
   //       console.log(`Searching next hundred posts, beginning at ${count * 100}`);
   //       listing = await this.fetchNew(after);
   //       found = listing.filter(submission => {
   //          console.log(submission.title);
   //          return submission.title.toLowerCase().includes(this.titles[thread]) &&
   //          submission.title.includes(roundNum);
   //       });
   //       count++;
   //       after = listing[listing.length-1].name;
   //    }
   //    return found;
   // }

   async searchPosts(query) {
      const found = await this.snoowrap.search({
         query,
         time: 'all',
         subreddit: 'gameofbands',
         sort: 'new'
      })
      console.log(found);
      return found;
   }


   submitPost = async (post) => {
      const options = {
         subredditName: this.subreddit,
         title: post.title,
         text: post.body
      }
      try {
         const submission = await this.snoowrap.submitSelfpost(options);
         console.log(submission);
         return submission;
      } catch (err) {
         console.log(err);
         return null;
      }
   }

   submitComment = async (postId, comment) => {
      try {
         const submission = await this.snoowrap.getSubmission(postId);
         const result = await submission.reply(comment);
         return result;
      } catch (err) {
         console.log(err)
         return null;
      }
   }

   getUsername = async () => {
      try {
         const username = await this.snoowrap.getMe();
         return username.name;
      } catch (err) {
         console.log(err);
      }
   }

   getUsernameTwo = async () => {
      const response = await this.snoowrap.getMe();
      console.log(response);
   }
}