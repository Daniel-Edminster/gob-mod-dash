# gob-mod-dash

Alpha for now.

GOB mods: This is ready to play with on your own localhost, super easy to set up. See below for installation instructions.

Currently this mod dash can do the following:

- create a new round
- set begin and end dates for the round's active period
- create templates for posting threads to reddit, with macros for num, theme and dates
- post theme nomination thread, fetch nominations
- approve and edit winning theme, commit to round
- post signup thread, fetch signups and commit participants to round
- allocate teams and balance vets/noobs before launching round
- post launch thread to reddit and populate with team comments
- retrieve song information from the gob api (it will use the round number)
- post voting thread to reddit, fetch vote comments and add them to songs
- tabulate votes to determine winners
- post congrats thread, concluding the round

Coming soon:

- create teams and manage angels during round
- team incompatibility checks
- saving updated information to the gob api
- toast notifications for async functions such as api calls
- styling updates, including trophies on song list after determining winners
- more informative rounds list
- voting cutoff

---

## Installation

Clone the repo iwth `git clone https://github.com/retrotheft/gob-mod-dash.git` or equivalent.

Navigate to the f`gob-mod-dash` folder, and type `npm install` to install dependencies, then set up your `.env` file with the following (entering your own relevant details in the quotes):

Reddit Credentials:
```
VUE_APP_REDDIT_SCRIPT_USER_AGENT = ''
VUE_APP_REDDIT_SCRIPT_CLIENT_ID = ''
VUE_APP_REDDIT_SCRIPT_CLIENT_SECRET = ''
VUE_APP_REDDIT_USERNAME = ''
VUE_APP_REDDIT_PASSWORD = ''
VUE_APP_REDDIT_SUBREDDIT = ''
```
GOB credentials:

```
VUE_APP_GAME_OF_BANDS_API_KEY = ''
```

Then use `npm run serve` to launch the app.

Your reddit app should be the `script` option in order to post threads.

If you run into any 403 errors with the reddit api, check to make sure your credentials are correct, that your linked user has access to and ideally is a mod of the appropriate subreddit, and that you don't have 2FA turned on.

The mod thing makes a difference for threads in contest mode - you'll only see a single upvote on comments in a contest mode thread.