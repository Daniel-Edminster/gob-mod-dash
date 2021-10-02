export default class Reddit {
   constructor(snoowrap) {
      this.snoowrap = snoowrap;
      this.subreddit = process.env.VUE_APP_REDDIT_SUBREDDIT;
   }

   async setSubreddit(name) {
      try {
         const check = await this.snoowrap.getSubreddit(name).fetch();
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

   fetchPost = (postId) => {
      return this.snoowrap.getSubmission(postId);
   }

   async searchPosts(query) {
      const found = await this.snoowrap.search({
         query,
         time: 'all',
         subreddit: 'gameofbands',
         sort: 'new'
      })
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
         submission.subreddit = { display_name: this.subreddit };
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

   verifyUser = async () => {
      try {
         const [ username, isMod ] = await Promise.all([
            this.getUsername(),
            this.isModerator('gameofbands')
         ])
         return { username, isMod };
      } catch(err) {
         console.log(err);
         return null;
      }
   }

   getUsername = async () => {
      try {
         const username = await this.snoowrap.getMe();
         return username.name;
      } catch (err) {
         console.log(err);
         return null;
      }
   }

   async isModerator(subredditName) {
      try {
         const listing = await this.snoowrap.getModeratedSubreddits();
         const isMod = listing.find(subreddit => subreddit.display_name == subredditName);
         return isMod ? true : null;
      } catch (err) {
         console.log(err)
      }
   }
}