export default `
# Helpful Info

Currently the dash will save its info to localStorage. The app comes with default templates for **theme nomination**, **signups**, **launch**, **late recruitment** and **voting** threads.

Note that **comments** and the **congrats** thread are constructed programmatically currently, owing to their additional complexity.

## Subreddit

You can select the subreddit to post to in settings. You can set a default in your .env file, and localStorage will remember your most recent setting also. If you want to go back to the default, just delete settings from localStorage and refresh.

## Dates and Times

The dash currently supports **round begin**, **round end** and **voting cutoff** dates. The times (hours and minutes) are currently hard coded - you can edit them in the template but it won't affect the hour that gets added to the WorldTimeServer link. This will be improved in a later version.

## Templates

Create a template by entering a name into the input element. Clicking on the newly created template will take you to the template editor. This will automatically save as you update it. You'll be able to access these templates in the Round View later.

## Rounds

Begin by creating a round. For now, enter the number you want to create. This will not lock it to any particular threads but it WILL lock it to the song information on the GOB api.

Click on the newly created round to go to the Round view. This view will dynamically display the correct component, depending on what stage the round is at.

Here you can control every aspect of the round. The structure follows a "Canvas, Collect, Commit" pattern where first a thread is posted, then that thread is scraped for info, then the user has a chance to review the info before committing it to the round metadata.

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