# gob-mod-dash

Alpha for now.

GOB mods: This is ready to play with on your own localhost, super easy to set up. See below for installation instructions.

Currently this mod dash can do the following:

- create a new round
- create templates for posting threads to reddit
- post theme nomination thread, fetch nominations and commit theme to round
- post signup thread, fetch signups and commit participants to round
- allocate teams (enhanced drag-drop interface soon!)
- post launch thread to reddit and populate with team comments
- retrieve song information from the gob api (it will use the round number)
- post voting thread to reddit, fetch vote comments and add them to songs

Further improvements:

- more customisable team manager so adjustments can be made before launching round
- team veteran/noob balancing and incompatibility checks
- congrats thread posting
- saving updated information to the gob api
- date macros
- notifications for async functions such as api calls
- edit theme readability before commit 

---

## Installation

Just run `npm i` to install dependencies, then set up your `.env` file with the following:

Reddit Credentials:
```
VUE_APP_REDDIT_SCRIPT_USER_AGENT
VUE_APP_REDDIT_SCRIPT_CLIENT_ID
VUE_APP_REDDIT_SCRIPT_CLIENT_SECRET
VUE_APP_REDDIT_USERNAME
VUE_APP_REDDIT_PASSWORD
VUE_APP_REDDIT_SUBREDDIT
```
GOB credentials:

```
VUE_APP_GAME_OF_BANDS_API_KEY
```

Then use `npm run serve` to launch the app.

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
