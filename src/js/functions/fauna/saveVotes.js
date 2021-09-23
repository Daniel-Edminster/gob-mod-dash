import { client, q } from '@/js/api/fauna'

// votes should already be in correct format... consider doing for other docs
export default async function saveVotesToDatabase(array) {
   const docs = await saveVoteDocuments(array);
   return docs;
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