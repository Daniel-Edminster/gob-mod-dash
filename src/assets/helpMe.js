export default `
# Helpful Info

Currently the dash will save its info to localStorage, so you'll need to create rounds and templates yourself for now.

Also ignore the barebones styling, this hasn't been started yet. :)

## Templates

Create a template by entering a name into the input element. Clicking on the newly created template will take you to the template editor. This will automatically save as you update it. You'll be able to access these templates in the Round View later.

## Rounds

Begin by creating a round. For now, enter the number you want to create. This will not lock it to any particular threads but it WILL lock it to the song information on the GOB api.

Click on the newly created round to go to the Round view. This view will dynamically display the correct component, depending on what stage the round is at.

Here you can select a template to use to post as a thread, with preview. Each thread's postId is saved to the threads object on the round, which has a key for each stage.

You can then fetch relevant information from each thread. This information will be stored in the pools object of the round, which has the same keys as the threads. The pools should be considered the temporary intermediaries between the reddit threads and the committed round information. When you commit something to the round after fetching comments from reddit, the information will committed to one of the following properties of the round object:

- theme
- participants
- teams
- songs
- active (true between the launch/late and voting stages)

Feel free to edit the thread IDs to pull information from existing game of bands threads. Strange things might happen if you use IDs that aren't for that stage (like signups to theme for instance). Further handlers will be required there probably. Also note that the new signup format was implemented properly in round 83, so signup threads before then may yield strange results.

If a round gets stuck at a particular stage (like signups) try deleting the corresponding pool. This is how the app knows which component to display.
`