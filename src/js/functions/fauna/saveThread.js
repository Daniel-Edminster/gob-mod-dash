import { client, q } from '@/js/api/fauna'

// probably best to receive an array of threads even with one
export default async function saveThreadsToDatabase(threads) {
   const array = Object.values(threads);
   const formattedDocs = array.filter(element => element);
   const staticDocs = formattedDocs.filter(doc => doc.id);
   const filteredDocs = formattedDocs.filter(doc => !doc.id);
   const savedDocs = await saveThreadDocuments(filteredDocs);
   const identifiedDocs = addIds(savedDocs);
   return [ ...identifiedDocs, ...staticDocs ];
}

async function saveThreadDocuments(docs) {
   try {
      const response = await client.query(
         q.Call("update_threads", docs)
      )
      return response;
   } catch(err) {
      console.log(err);
   }
}

function addIds(docs) {
   return docs.map(doc => {
      return {
         ...doc.data,
         id: doc.ref.value.id
      }
   })
}

// superfluous, but the round/stage properties might not stay. See saveParticipants.js
// If I delete those, will need to add them here later.
// function constructThreadDocument(thread) {
//    const { round, stage, source, subreddit, id } = thread;
//    return {
//       round,
//       stage,
//       source,
//       subreddit,
//       ...(id && { id })
//    }
// }