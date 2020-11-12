# gob-mod-dash

GOB mods: This is ready to play with on your own localhost, super easy to set up.

Just run 'npm i' to install dependencies, then set up your .env file with the following:

Reddit Credentials:

- userAgent: VUE_APP_REDDIT_SCRIPT_USER_AGENT,
- clientId: VUE_APP_REDDIT_SCRIPT_CLIENT_ID,
- clientSecret: VUE_APP_REDDIT_SCRIPT_CLIENT_SECRET,
- username: VUE_APP_REDDIT_USERNAME,
- password: VUE_APP_REDDIT_PASSWORD
- subreddit: VUE_APP_REDDIT_SUBREDDIT

GOB credentials:

- api-key: VUE_APP_GAME_OF_BANDS_API_KEY

If you run into any 403 errors with the reddit api, check to make sure your credentials are correct, that your linked user has access to and ideally is a mod of the appropriate subreddit, and that you don't have 2FA turned on.

The mod thing makes a difference for threads in contest mode - you'll only see a single upvote on comments in a contest mode thread.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
