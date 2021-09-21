import { client, q } from '@/js/api/fauna'

export default async function saveSongsToDatabase(songs) {
   const payload = songs.map(song => constructPayload(song));
   const savedDocs = await saveSongDocumentsInReverse(payload);
   return savedDocs ? savedDocs : null;
}

function constructPayload(song) {
   const songDoc = constructSongDocument(song.id, song.name, song.url);
   const teamDoc = constructTeamDocument(song.round, song.teamnumber);
   const participantDocs = extractParticipants(song);
   return { songDoc, teamDoc, participantDocs }
}

function constructSongDocument(id, title, url) {
   let number = null;
   if (id.length < 5) number = id;
   return { title, url, ...(number && { number }) }
}

function constructTeamDocument(round, number) {
   return { round, number }
}

function extractParticipants(song) {
   // might be other roles in the past to add here
   const { music, lyrics, vocals, video } = song;
   const obj = {
      music,
      lyrics,
      vocals,
      ...(video && { video })
   }
   const participants = [];
   for (const [role, username] of Object.entries(obj)) {
      const array = username.replaceAll(" ", "").replaceAll("&", ",").split(",");
      array.forEach(username => participants.push({ username, part: role }))
   }
   return participants;
}

async function saveSongDocumentsInReverse(payload) {
   try {
      const response = await client.query(
         q.Call("add_songs_in_reverse_prep", payload)
      )
      return response?.data;
   } catch (err) {
      console.log(err);
   }
}