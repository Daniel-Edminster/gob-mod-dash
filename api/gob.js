const fetch = require('node-fetch');

class GOB {
   constructor() {
     this.apiKey = process.env.GOB_API_KEY;
     this.rootUrl = process.env.GOB_ROOT_URL;
   }
 
   async fetchData(url) {
     try {
       const response = await fetch(url);
       console.log(response);
       const status = { code: response.status, text: response.statusText };
       const data = await response.json();
       return { status, data };
     } catch (err) {
       console.log(err);
       const status = 400;
       return { status, err };
     }
   }
 
   fetchThemes() {
     const url = `${this.rootUrl}${this.apiKey}&getThemes`;
     return this.fetchData(url);
   }
 
   fetchSongs(round) {
     console.log(+round);
     if (round == 0 || isNaN(+round)) {
       console.log("Bad round number input");
       return { status: { code: 400 , text: 'Invalid round number'}};
     } else {
       const url = `${this.rootUrl}${this.apiKey}&round=${round}`;
       return this.fetchData(url);
     }
   }
 
   fetchBandits() {
     const url = `${this.rootUrl}${this.apiKey}&viewallbandits=1`;
     return this.fetchData(url);
   }
 
   fetchVeterans() {
     const url = `${this.rootUrl}${this.apiKey}&veterans=1`;
     return this.fetchData(url);
   }
 
 }

module.exports = async (req, res) => {
   if (req.method === 'GET') {
      const gob = new GOB();
      const func = Object.keys(req.query)[0];
      let data;
      if (func === 'fetchSongs') {
         const round = Object.values(req.query)[0];
         data = await gob[func](round);
      } else {
         data = await gob[func]();
      }
      res.json(data);
   } else {
      res.status(400).send('Bad Request');
   }
}

