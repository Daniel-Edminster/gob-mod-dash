import { client, q } from '@/js/api/fauna'

// votes should already be in correct format... consider doing for other docs
export default async function saveVotesToDatabase(array) {
   const formattedDocs = array.filter(element => element);
   const staticDocs = formattedDocs.filter(doc => doc.id);
   const filteredDocs = formattedDocs.filter(doc => !doc.id);
   const savedDocs = await saveVoteDocuments(filteredDocs);
   const identifiedDocs = addIds(savedDocs);
   return [ ...identifiedDocs, ...staticDocs ];
}

async function saveVoteDocuments(docs) {
   try {
      const response = await client.query(
         q.Call("update_votes", docs)
      )
      console.log(response);
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