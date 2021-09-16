import { client, q } from '@/js/api/fauna'

// Need to separate experience info onto its own object when screening.

export default async function saveSignupsToDatabase(pool, roundNum) {
   const formattedDocs = pool.map(participant => constructParticipantDocument(participant, roundNum));
   const staticDocs = formattedDocs.filter(doc => doc.id);
   const filteredDocs = formattedDocs.filter(doc => !doc.id);
   const savedDocs = await saveParticipantDocuments(roundNum, filteredDocs);
   const usernamesToIds = new Map();
   savedDocs.map(doc => usernamesToIds.set(doc.username, doc.id));
   const identifiedDocs = addIds(formattedDocs, usernamesToIds);
   return [ ...identifiedDocs, ...staticDocs ];
}

function constructParticipantDocument(participant, round) {
   const { username, roles } = participant;
   return {
      round,
      username,
      roles
   }
}

function addIds(docs, usernamesToIds) {
   return docs.map(doc => {
      return {
         ...doc,
         id: usernamesToIds.get(doc.username)
      }
   })
}

async function saveParticipantDocuments(round, docs) {
   try {
      const response = await client.query(
         q.Call("register_signups", { round, docs })
      )
      return response;
   } catch(err) {
      console.log(err);
   }
}