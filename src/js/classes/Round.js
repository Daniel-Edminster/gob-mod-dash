export default class Round {

   static stages = ['theme', 'signup', 'launch', 'late', 'voting', 'congrats'];

   constructor(number) {
      this.id = null;
      this.number = number;
      this.theme = null;
      this.parts = {
         music: 1,
         lyrics: 1,
         vocals: 1
      };
      this.votes = {
         theme: null,
         songs: null
      };
      this.participants = null;
      this.teams = null;
      this.active = false;
      this.complete = false;
      this.songs = null;
      this.winners = null;
      this.threads = {};
      this.pools = {};
      this.constructor.stages.forEach(stage => {
         this.threads[stage] = null;
         this.pools[stage] = null
      });
      this.dates = {
         begin: null,
         end: null,
         endVote: null
      };
      this.experience = {}
   }
}