export function addIds(docs) {
   return docs.map(doc => {
      return {
         ...doc.data,
         id: doc.ref.value.id
      }
   })
}

export function isolateFaunaError(errors) {
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

export function FaunaError(error) {
   this.name = error.code;
   this.message = error.description;
}