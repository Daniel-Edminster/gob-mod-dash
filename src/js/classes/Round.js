export default class Round {
  // These should be changed to Type Objects later for customisability
  static stages = ['theme', 'signup', 'launch', 'late', 'voting', 'congrats'];

  constructor(number, existing) {
    this.number = number;
    this.theme = existing ? existing.theme : null;
    if (existing) {
      this.threads = existing.threads;
      this.pools = existing.pools;
      this.dates = existing.dates;
    } else {
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
}