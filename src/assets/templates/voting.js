const body = `All submitted songs and their lyrics can be found on the Game of Bands Website:
[Game of Bands Song Depository, Round %num: %theme](http://new.gameofbands.com/#/round/%num). If you have reddit enhancement suite you can listen to them all in this thread (but without lyrics). 

---
You can vote for multiple songs and roles as you wish, but only once for each role on each song.  You can also vote for your own team but only for your teammates' work (i.e. you can't vote for yourself or your own track - it will not be counted).       
 
**Reply [at the correct level!] to the comment of the song you wish to vote for, and type what you see below after the equals(=) sign.**  *Also, do not reply to someone else's vote; reply to the song-level comment for it to count.*

* [](/t) = \\[](/t)

* [](/m) = \\[](/m)

* [](/l) = \\[](/l)

* [](/v) = \\[](/v)

They're just links, really, or spoiler tags if you use them in other sub-reddits. You'll know you've done it correctly because your comment will have nice colorful buttons! Hooray! This will enable us to automate the vote tallying process and just looks a lot nicer as well!
    
Please include some info on why you voted the way you did; positive and constructive feedback is always appreciated!

Voting will end on [**%vcut at 23:59 UTC**](%vwts).

*If you participated in this round or the previous or next round, please vote as a courtesy to your fellow bandits!*
     
**YOU BETTER VOTE OR ELSE**`

export default {
  name: 'Voting Default',
  title: 'Official Voting Post for Round %num: %theme',
  body
}