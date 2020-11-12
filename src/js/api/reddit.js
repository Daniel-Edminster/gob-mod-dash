import snoowrap from 'snoowrap';

// const config = {
// 	userAgent: process.env.VUE_APP_REDDIT_USER_AGENT,
// 	clientId: process.env.VUE_APP_REDDIT_CLIENT_ID,
// 	clientSecret: process.env.VUE_APP_REDDIT_CLIENT_SECRET,
// 	refreshToken: process.env.VUE_APP_REDDIT_REFRESH_TOKEN,
// }

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
}

export default new Reddit();