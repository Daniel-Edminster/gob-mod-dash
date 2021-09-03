# Mod Dashboard for Game of Bands (/r/gameofbands)

Alpha.

## Features

- create a new round
- set begin and end dates for the round's active period
- create templates for posting threads to reddit, with macros for num, theme and dates
- post theme nomination thread, fetch nominations
- approve and edit winning theme, commit to round
- post signup thread, fetch signups and commit participants to round
- allocate teams and balance vets/noobs before launching round
- post launch thread to reddit and populate with team comments
- alternatively, populate teams from an existing launch thread
- retrieve song information from the gob api (it will use the round number)
- post voting thread to reddit, fetch vote comments and add them to songs
- tabulate votes to determine winners
- post congrats thread, concluding the round
- extended date handling for begin, end and voting cutoff dates.

## Coming soon:

- Find and Identify Song voting comments in threads
- Scrape Check-ins from reddit signup thread
- team incompatibility checks
- automated balancing of vets/bandits/noobs
- Persistent Data Storage, either using the new API or an interim.
- create teams and manage angels during round (integration with Discord and Persistent data required)

Some of these features will require interaction between tools made by different moderators, such as the backend API and Discord bots.