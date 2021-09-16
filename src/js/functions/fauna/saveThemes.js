import { client, q } from '@/js/api/fauna'

// themes from pool will create a new theme with a description, 
// user and source (reddit fullname), but no title
// only themes which have been committed and edited will be given a title

// themes must be saved to fauna before the winner can be committed
// this will add the id property to each nomination
// committing the theme saves the theme id to the round now, rather than the text
// it also updates the committed theme with the title from the edit

export default async function saveThemesToDatabase(pool) {
   const formattedDocs = pool.map(theme => constructThemeDocument(theme));
   const staticDocs = formattedDocs.filter(doc => doc.id);
   const filteredDocs = formattedDocs.filter(doc => !doc.id);
   const savedDocs = await saveThemeDocuments(filteredDocs);
   const identifiedDocs = addIds(savedDocs);
   return [ ...identifiedDocs, ...staticDocs ];
}

function constructThemeDocument(theme) {
   const { description, source, user, date, id } = theme;
   return {
      description,
      user,
      source,
      date,
      ...(id && { id })
   }
}

async function saveThemeDocuments(docs) {
   // filter documents that already have ids
   try {
      const response = await client.query(
         q.Call("update_themes", docs)
      )
      return response;
   } catch (err) {
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