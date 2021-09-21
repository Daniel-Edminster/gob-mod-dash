import { client, q } from '@/js/api/fauna'

export default async function saveRoundToDatabase(round) {
   console.log(client);
   console.log(`Saving round ${round.number} to database...`);
   console.log(round);
   console.log(q);
   const doc = constructRoundDocument(round);
   const response = await saveRoundDocument(doc);
   const id = response.ref?.value?.id;
   return id ? id : null;
}

function constructRoundDocument(round) {
   const { number, theme, roles } = round;
   return {
      number,
      ...(theme?.id && { theme: q.Ref(q.Collection('themes'), theme.id) }),
      ...(roles && { roles })
   }
}

async function saveRoundDocument(doc) {
   try {
      const response = await client.query(
         q.Call('create_or_update_round', doc)
      )
      return response;
   } catch (err) {
      console.log(err);
   }
}