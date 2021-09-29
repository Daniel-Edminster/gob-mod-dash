import { client, q } from '@/js/api/fauna'
import Round from "@/js/classes/Round"

export async function loadRoundsListFromDatabase() {
   try {
      const response = await client.query(q.Call("get_rounds_list"));
      if (response) return formatRoundsList(response);
   } catch (err) {
      console.log(err);
   }
}

function formatRoundsList(data) {
   console.log(data);
   const { roundsList, themesList } = data;
   return roundsList.map(el => ({
      id: el[0],
      number: el[1],
      theme: themesList.find(theme => theme[0] === el[2])[1]
   }))
}

export async function loadRoundFromDatabase(roundNum) {
   try {
      const response = await client.query(q.Call("load_entire_round", roundNum));
      return response ? formatRound(response, roundNum) : null;
   } catch (err) {
      console.log(err)
   }
}

function formatRound(data, roundNum) {
   const round = new Round(roundNum);
   round.id = data.id;
   round.theme = data.theme;
   const loadedThreads = formatThreads(data.threads); // need the IDs to know they're saved to DB
   Object.keys(loadedThreads).forEach(key => round.threads[key] = loadedThreads[key]);
   round.parts = formatParts(data.parts);
   round.participants = formatParticipants(data.participants, data.teams, data.users, data.parts, roundNum);
   round.teams = formatTeams(data.teams);
   round.songs = formatSongs(data.songs, data.teams); // need IDs to know they're saved to DB
   return round;
}

function formatThreads(array) {
   const obj = {};
   array.forEach(el => {
      obj[el[0]] = {
         source: el[1],
         parent: el[2],
         id: el[3]
      }
   })
   return obj;
}

function formatParts(array) {
   const obj = {};
   array.forEach(el => {
      obj[el[1]] = 1
   })
   return obj;
}

function formatTeams(array) {
   return array.map(el => {
      return {
         id: el[0],
         number: el[1]
      }
   })
}

function formatSongs(array, teams) {
   return array.map(el => {
      return {
         number: el[0],
         title: el[1],
         url: el[2],
         id: el[3],
         teamnumber: teams.find(team => team[2] === el[3])[1]
      }
   })
}

// ideally we could do more of this work on fauna, but I'm unsure 
// if it's possible without drastically increasing the readOps.
function formatParticipants(array, teams, users, parts, roundNum) {
   return array.map(el => formatParticipant(el, teams, users, parts, roundNum));
}

function formatParticipant(participant, teams, users, parts, roundNum) {
   const id = participant[0];
   const username = users.find(el => el[0] === participant[3])[1]
   const instance = formatInstance(participant, teams, roundNum)
   const part = parts.find(el => el[0] === participant[4])[1]
   return { id, username, instance, part };
}

function formatInstance(participant, teams, roundNum) {
   const collection = participant[1].value.id;
   const number = collection === "rounds" ? roundNum : teams.find(el => el[0] === participant[2])[1];
   return { collection, number }
}

/*

// Fauna returns this
const element = [
   participant.id,
   participant.instance.collection,
   participant.instance.id,
   participant.user.id,
   participant.part.id
]

// This is what we want
const participantObj = {
   username,
   instance: {
      collection,
      number
   },
   part,
   id
}

*/