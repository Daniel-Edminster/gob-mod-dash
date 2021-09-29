export function addIds(docs) {
   return docs.map(doc => {
      return {
         ...doc.data,
         id: doc.ref.value.id
      }
   })
}

function isolateFaunaError(errors) {
   let error;
   error = errorDive(errors[0]);

   function errorDive(error) {
      while(error.cause) {
         error = errorDive(error.cause[0]);
      }
      return error;
   }

   return error;
}

export function FaunaError(err) {
   const error = isolateFaunaError(err.errors());

   this.name = error.code;
   this.message = error.description;
   this.position = error.position;
}