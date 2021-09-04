export default `
# How to Use the Dash During Beta Testing

Begin by creating a round. Your best bet is to use a number between 83 and the most recent round. Note that the round number you enter will lock you into that round when fetching songs from the existing Game of Bands website api, but you can link to any threads in /r/gameofbands. Though you probably don't want to.

Click on the newly created round to go to the Round view. This view will dynamically display the correct component, depending on what stage the round is at.

Here you can control every aspect of the round. The structure follows a "Canvas, Collect, Commit" pattern where first a thread is posted, then that thread is scraped for info, then the user has a chance to review the info before committing it to the round metadata.

The dashboard will post threads to waitingforgobot, and comments to the relevant thread (e.g. team comments will go to the thread id that is specified in the launch thread field.) If a round already exists, you should be able to find any existing threads for that round. Just watch out for posting comments directly to a gameofbands thread; you probably don't want to do that. Any threads posted by the dash will go to waitingforgobot, but if you find an existing thread and then generate comments, either for teams or for songs, you might inadvertently post those comments to the linked gameofbands thread.

## Data Persistence

Currently the dash will save its info to localStorage. This means anything you do is only stored on your computer, with the exception of threads and comments that you post to reddit. Again, be wary of linking existing /r/gameofbands threads to round stages that post comments. This means Launch and Voting.

## Templates

The app comes with default templates for **theme nomination**, **signups**, **launch**, **late recruitment** and **voting** threads.

Create a template by entering a name into the input element. Clicking on the newly created template will take you to the template editor. This will automatically save as you update it. You'll be able to access these templates in the Round View later.

Note that **comments** and the **congrats** thread are constructed programmatically currently, owing to their additional complexity, and as such are not editable.

## Dates and Times

The dash currently supports **round begin**, **round end** and **voting cutoff** dates. The times (hours and minutes) are hard coded - you can edit them in the template but it won't affect the hour that gets added to the WorldTimeServer link. This will be improved in a later version.

## Round Architecture

The Round object is quite complex, but I've tried to organise it intuitively. Improvements are still likely, of course.

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

- Vote information goes directly onto the song objects. In future we probably don't want to design it this way.

The round object also has several booleans: \`active\` and \`complete\`. When both are false, the round is pre-launch. The round must be activated to post the launch and late threads. Teams can be managed as long as active is true and complete is false. Ending the round will set complete to true, at which stage the voting can begin.

Feel free to edit the thread IDs to pull information from existing game of bands threads. Strange things might happen if you use IDs that aren't for that stage (like signups to theme for instance). Further handlers will be required there probably. Also note that the new signup format was implemented properly in round 83, so signup threads before then may yield strange results.

If a round gets stuck at a particular stage (like signups) try deleting the corresponding thread and/or pool. This is how the app knows which component to display. If it still seems funky, check the Round Metadata as well.

## Known Issues

Besides the voting stage being a bit naff, there are also some issues with relocating multiple-role participants on the Team Manager screen. 

Hit me up on Discord if you find anything else while playing around.

-- RetroTheft
`