export default class Round {
  // These should be changed to Type Objects later for customisability
  static stages = ['theme', 'signup', 'launch', 'late', 'voting', 'congrats'];

  constructor(number) {
    this.number = number;
    this.theme = null;
    this.participants = null;
    this.teams = null;
    this.active = false;
    this.complete = false;
    this.grace = false;
    this.songs = null;
    this.winners = null;
    this.threads = {};
    this.pools = {};
    this.constructor.stages.forEach(stage => {
      this.threads[stage] = null;
      this.pools[stage] = null
    })
    this.dates = {
      begin: null,
      end: null
    }
  }
}