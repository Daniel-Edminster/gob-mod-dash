import { client, q } from '@/js/api/fauna'
// import { addIds } from "./shared"

// Also need the round ID from database to be passed in by this point.
// Need to separate experience info onto its own object when screening.

export default async function saveSignupsToDatabase(pool, roundNum) {
   // construct participant documents
   const formattedDocs = pool.map(participant => constructParticipantDocument(participant, roundNum));
   // save them
   
   // might want to delete all participants for that round first
   // just to be on the safe side
   const savedDocs = await saveParticipantDocuments(formattedDocs);
   const usernamesToIds = new Map();
   savedDocs.map(doc => usernamesToIds.set(doc.username, doc.id));
   
   // const loadedDocs = await loadParticipantsFromDatabase(roundNum);
   // console.log(loadedDocs);
   // rather than add the IDs, better to reload the Participants from the database
   // since then we can fix the data up and load the username.
   // add the ids
   const identifiedDocs = addIds(formattedDocs, usernamesToIds);
   console.log("Identified:", identifiedDocs)
   return identifiedDocs;
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

// END OF DAY insights:
// should just return the correct data from here
// should also maybe just construct the user ref first, but still not sure
// remember to delete existing first - function is already written

async function saveParticipantDocuments(docs) {
   const filteredDocs = docs.filter(doc => !doc.id);
   try {
      const response = await client.query(
         q.Call("register_signups", filteredDocs)
      )
      return response;
   } catch(err) {
      console.log(err);
   }
}

// function constructRoundDocument(round) {
//    const { number, theme, roles } = round;
//    return {
//       number,
//       ...(theme?.id && { theme: q.Ref(q.Collection('themes'), theme.id) }),
//       ...(roles && { roles })
//    }
// }

// async function loadParticipantsFromDatabase(roundNum) {
//    try {
//       const response = await client.query(
//          q.Call("load_participants", roundNum)
//       )
//       return response;
//    } catch (err) {
//       console.log(err)
//    }
// }