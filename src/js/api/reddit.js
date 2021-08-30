import snoowrap from 'snoowrap';

const appConfig = {
   userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
   clientId: process.env.VUE_APP_REDDIT_CLIENT_ID_APP,
   // clientSecret: process.env.VUE_APP_REDDIT_CLIENT_SECRET,
   refreshToken: process.env.VUE_APP_REDDIT_REFRESH_TOKEN,
}

const config = {
   userAgent: process.env.VUE_APP_REDDIT_SCRIPT_USER_AGENT,
   clientId: process.env.VUE_APP_REDDIT_SCRIPT_CLIENT_ID,
   clientSecret: process.env.VUE_APP_REDDIT_SCRIPT_CLIENT_SECRET,
   username: process.env.VUE_APP_REDDIT_USERNAME,
   password: process.env.VUE_APP_REDDIT_PASSWORD
}

class Reddit extends snoowrap {
   constructor() {
      super(config);
      this.subreddit = process.env.VUE_APP_REDDIT_SUBREDDIT;
   }

   async setSubreddit(name) {
      try {
         const check = await this.getSubreddit(name).fetch();
         console.log(check);
         if (check) console.log("Subreddit exists");
         const listing = await this.getModeratedSubreddits();
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
         const results = await this.getSubmission(postId).comments;
         return results;
      } catch (err) {
         console.log(err);
      }
   }

   fetchPost = (postId) => {
      return this.getSubmission(postId);
   }

   // getSubmission is fine to use instead of fetchPost

   submitPost = async (post) => {
      const options = {
         subredditName: this.subreddit,
         title: post.title,
         text: post.body
      }
      try {
         const submission = await this.submitSelfpost(options);
         console.log(submission);
         return submission;
      } catch (err) {
         console.log(err);
         return null;
      }
   }

   submitComment = async (postId, comment) => {
      try {
         const submission = await this.getSubmission(postId);
         const result = await submission.reply(comment);
         return result;
      } catch (err) {
         console.log(err)
         return null;
      }
   }

   getLoginUrl = () => {
      let url = '';
      try {
         url = snoowrap.getAuthUrl({
            clientId: appConfig.clientId,
            scope: ['read', 'submit', 'mysubreddits', 'identity'],
            redirectUri: process.env.VUE_APP_REDDIT_REDIRECT_URI,
            permanent: false,
            state: 'changetorandomstring'
         })
         return url;
      } catch (err) {
         console.log(err);
      }
   }

   instantiateViaAuth = async (code) => {
      try {
         const instance = await snoowrap.fromAuthCode({
            code,
            userAgent: appConfig.userAgent,
            clientId: appConfig.clientId,
            // clientSecret: appConfig.clientSecret,
            redirectUri: process.env.VUE_APP_REDDIT_REDIRECT_URI
         })
         return instance;
      } catch (err) {
         console.log(err);
      }

   }
}

const reddit = new Reddit();

export default reddit;