const body = `Team assignments are listed in the comments below.

This round will end at **[5am UTC %end](%ewts)**. Songs are to be submitted [here](http://gameofbands.com/user_submitsong) by the end-of-round deadline. Submissions will be linked in a single voting post the next day.  Voting will begin the following day and run for 7 days ending at [**23:59 UTC %vcut**](%vwts), upon which votes will be tallied, results posted, and flair awarded.

This round's theme is **%theme**!  Team assignments are listed below.

Each team is responsible for contacting its members. If you have any issues, please contact the mods or [join the chat](http://gameofbands.com/beta/teamhub/).

Songs must be hosted on SoundCloud in order to be played by our web player. Please do not submit private links as they do not work in our player.

Get started right away!!

**Check in is compulsory. If you have not checked in within 48 hours, you will be replaced.**

---

If you need a replacement, or are available to join a team, please visit the [Late Recruitment Thread](https://www.reddit.com/r/gameofbands/).`

export default {
  name: 'Launch Default',
  title: 'Round %num: %theme has begun! Teams and Rules inside. Check-in compulsory.',
  body
}