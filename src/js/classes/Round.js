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
      end: null,
      endVote: null
    }
    // temporary guard against posting comments to found threads on reddit
    this.found = {}
  }
}

/* To clean this object up a bit, I'd probably move the following to an "assets" object:

- theme
- participants
- teams (this one is a maybe... other functionality might inidicate it should be kept at the root level)
- songs
- winners

I would then also move the following to a 'flags' object

- active
- grace

Presently the only reason those flags exist is that I haven't coded the logic checks.
The grace period is over once pools.launch is not-null, so that removes the need for that.

Active is essentially the same as launch and late threads made, but songs null. So that could be removed also.

Should probably refactor the code to utilise computed values for these things, or a finite state machine, maybe using xState.
*/