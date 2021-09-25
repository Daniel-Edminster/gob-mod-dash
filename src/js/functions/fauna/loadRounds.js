import { client, q } from '@/js/api/fauna'

export default async function loadRoundsList() {
   try {
      const response = await client.query(q.Call("get_rounds_list"));
      if (response) return response;
   } catch(err) {
      console.log(err);
   }
}