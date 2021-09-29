export default class Round {

   // static stages = ['theme', 'signup', 'launch', 'late', 'voting', 'congrats'];
   // static daysOffsets = [0, 14, 21, 21, 36, 45];

   static stages = {
      theme: 0,
      signup: 14,
      launch: 21,
      late: 21,
      voting: 36,
      congrats: 45
   }

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
      this.dates = {};
      Object.keys(this.constructor.stages).forEach(stage => {
         console.log(stage);
         this.threads[stage] = null;
         this.pools[stage] = null;
         this.dates[stage] = createDate(this.constructor.stages[stage], 'standard');
      });
      this.dates.deadline = createDate(35, 'deadline');
      this.dates.cutoff = createDate(43, 'cutoff');
      this.experience = {}
   }
}

function createDate(daysOffset, key) {
   const times = {
      standard: [21,0,0,0],
      deadline: [6,0,0,0],
      cutoff: [0,59,59,999]
   }

   const date = new Date();
   date.setUTCHours(times[key][0])
   date.setUTCMinutes(times[key][1])
   date.setUTCSeconds(times[key][2])
   date.setUTCMilliseconds(times[key][3])
   date.setDate(date.getDate() + daysOffset)
   return date.toISOString();
}