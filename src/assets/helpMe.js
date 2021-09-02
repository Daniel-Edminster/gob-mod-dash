export default `
# How to Use the Dash During Beta Testing

Begin by creating a round. Your best bet is to use a number between 70 and the most recent round. This will ensure you can find existing round threads. Note that the round number you enter will lock you into that round when fetching songs from the existing Game of Bands website api.

Click on the newly created round to go to the Round view. This view will dynamically display the correct component, depending on what stage the round is at.

Here you can control every aspect of the round. The structure follows a "Canvas, Collect, Commit" pattern where first a thread is posted, then that thread is scraped for info, then the user has a chance to review the info before committing it to the round metadata.

# Data Persistence

Currently the dash will save its info to localStorage. This means anything you do is only stored on your computer, with the exception of threads and comments that you post to /r/waitingforgobot. 

# Templates

The app comes with default templates for **theme nomination**, **signups**, **launch**, **late recruitment** and **voting** threads.

Note that **comments** and the **congrats** thread are constructed programmatically currently, owing to their additional complexity, and as such are not editable.

The dashboard will post threads to waitingforgobot, and comments to the relevant thread (e.g. team comments will go to the thread that is specified in the launch thread field.) While testing, it's best to find existing threads from /r/gameofbands, with the exception of the Launch and Voting threads, since they need comments posted to them.

## Dates and Times

The dash currently supports **round begin**, **round end** and **voting cutoff** dates. The times (hours and minutes) are currently hard coded - you can edit them in the template but it won't affect the hour that gets added to the WorldTimeServer link. This will be improved in a later version.

## Templates

Create a template by entering a name into the input element. Clicking on the newly created template will take you to the template editor. This will automatically save as you update it. You'll be able to access these templates in the Round View later.

## Rounds

Begin by creating a round. For now, enter the number you want to create. This will not lock it to any particular threads but it WILL lock it to the song information on the GOB api.

Click on the newly created round to go to the Round view. This view will dynamically display the correct component, depending on what stage the round is at.

Thread IDs are stored in the \`round.threads\` object, and scraped info in the \`round.pools\` object. Pools should be considered the temporary intermediaries between the reddit threads and the committed round information. Both \`.threads\` and \`.pools\` use the same keys:

- theme
- signup
- launch
- late
- voting
- congrats

Committed information is stored in the following:

- \`round.theme\`
- \`round.participants\`
- \`round.teams\`
- \`round.songs\`
- \`round.winners\`. 
- Vote information goes directly onto the song objects.

The round object also has several booleans: \`active\` and \`complete\`. When both are false, the round is pre-launch. The round must be activated to post the launch and late threads. Teams can be managed as long as active is true and complete is false. Ending the round will set complete to true, at which stage the voting can begin.

Feel free to edit the thread IDs to pull information from existing game of bands threads. Strange things might happen if you use IDs that aren't for that stage (like signups to theme for instance). Further handlers will be required there probably. Also note that the new signup format was implemented properly in round 83, so signup threads before then may yield strange results.

If a round gets stuck at a particular stage (like signups) try deleting the corresponding pool. This is how the app knows which component to display.
`