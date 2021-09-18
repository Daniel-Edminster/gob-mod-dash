import { client, q } from '@/js/api/fauna'

// Need to separate experience info onto its own object when screening.

export default async function saveSignupsToDatabase(pool, roundNum) {
   const formattedDocs = flattenParticipantPool(pool);
   const savedDocs = await saveParticipantDocuments(formattedDocs, roundNum);
   console.log(savedDocs);
   if (typeof savedDocs === String) return pool;
   return savedDocs;
}

function flattenParticipantPool(pool) {
   console.log(pool);
   const participants = [];
   pool.forEach(signup => {
      signup.roles.forEach(part => {
         participants.push({ username: signup.username, part })
      })
   })
   return participants;
}

async function saveParticipantDocuments(docs, round) {
   try {
      const response = await client.query(
         q.Call("register_signups", { docs, round })
      )
      return response;
   } catch(err) {
      console.log(err);
   }
}