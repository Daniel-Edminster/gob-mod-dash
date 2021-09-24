import { client, q } from '@/js/api/fauna'

// this function will also update the relevant participants
export default async function saveTeamsToDatabase(teamDocs, participantDocs, round) {
   const payload = {round, teamDocs, participantDocs}
   const docs = await saveTeamDocuments(payload);
   return docs;
}

async function saveTeamDocuments(payload) {
   try {
      const response = await client.query(
         q.Call("update_teams_prep", payload)
      )
      return response;
   } catch(err) {
      console.log(err);
   }
}