const body = `This thread is for people to sign up for Round %num of Game of Bands. By popular vote, this round's theme will be **"%theme"** 

Make a song that has the same title as a popular song, but is otherwise unrelated to that song.

This round will start at **%begin**, at which time everybody who has signed up will be matched randomly into teams by GameOfBand's AI, Gobot. The teams shall consist of one musician, one lyricist, and one vocalist.

To sign up, simply reply to the main post and state whether you want to do Music, Lyrics or Vocals. Feel free to sign up for multiple roles, as this helps us form teams easier. You will still only be selected for just one. If you change your mind about a signup, please delete your comment.

Thank you for participating!

**Instructions**:  
In the body of your submission reply, use one or more of the following words : **Vocals Lyrics Music**. This precise wording is required so our automated system knows what role you're signing up for. That means typos will leave you out. If you sign up for multiple roles, it will ignore the order you put them in, in favor of creating the largest amount of teams. So, only sign up for roles you're willing to do.

P.S. Be sure to reply at the main level with everyone else, sub-replies don't get assigned.

P.P.S. If you don't get assigned, do not fret! You can always join up with a team in the Late Joiners thread, or hop onto the [GoB "Angel and Late Recruit" Discord Channel](https://discord.gg/hemX8nj) and find a team to be on. It always works out!`

export default {
  name: 'Signup Default',
  title: 'Signups for Round %num: "%theme"',
  body
}