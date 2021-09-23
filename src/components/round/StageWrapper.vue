<template>
   <div id="stage-wrapper">
      <DatasaveWarning 
         v-if="stage === 'save-round'"
         thing="Round"
         action="continuing"
      />
      <ThemeIndex
         v-if="stage === 'theme'"
         :metadata="metadata"
         :post="round.threads.theme"
         :nominations="round.pools.theme"
      />
      <SignupIndex
         v-if="stage === 'signups'"
         :metadata="metadata"
         :post="round.threads.signup"
         :signups="round.pools.signup"
      />
      <TeamIndex
         v-if="stage === 'team'"
         :metadata="metadata"
         :launch="round.threads.launch"
         :participants="round.participants"
         :teams="round.teams"
         :active="round.active"
      />
      <LaunchIndex
         v-if="stage === 'launch'"
         :metadata="metadata"
         :launch="round.threads.launch"
         :late="round.threads.late"
         :participants="round.participants"
         :teams="round.teams"
         :active="round.active"
         :complete="round.complete"
      />
      <RoundOver v-if="stage === 'round-over'" :number="metadata.number" />
      <VoteIndex
         v-if="stage === 'voting'"
         :metadata="metadata"
         :post="round.threads.voting"
         :songs="round.songs"
         :songComments="round.threads.song"
         :votes="round.pools.voting"
      />
      <CongratsIndex
         v-if="stage === 'congrats'"
         :metadata="metadata"
         :post="round.threads.congrats"
         :winners="round.winners"
      />
      <p v-if="stage === 'wtf'">WTF</p>
   </div>
</template>

<script>
// this component handles displaying the appropriate component
// based on what stage the round is at. As it contains a lot of imports
// and if checks, it's its own component.
import ThemeIndex from "@/components/theme/ThemeIndex";
import SignupIndex from "@/components/signup/SignupIndex";
import TeamIndex from "@/components/team/TeamIndex";
import LaunchIndex from "@/components/launch/LaunchIndex";
import RoundOver from "./RoundOver";
import VoteIndex from "@/components/vote/VoteIndex";
import CongratsIndex from "@/components/congrats/CongratsIndex";
import DatasaveWarning from "@/components/shared/DatasaveWarning";

export default {
   name: "StageWrapper",
   components: {
      ThemeIndex,
      SignupIndex,
      TeamIndex,
      LaunchIndex,
      RoundOver,
      VoteIndex,
      CongratsIndex,
      DatasaveWarning
   },
   props: {
      round: {
         type: Object,
         required: true,
      },
   },
   data() {
      return {
         path: 'standard'
      }
   },
   computed: {
      stage() {
         return this[this.path];
      },
      standard() { // Note that active is not used here
         const { id, theme, participants, songs, complete, teams, winners } = this.round;
         if (!id) return "save-round";
         if (!theme) return "theme";
         if (!participants) return "signups";
         if (!teams) return "team";
         if (!complete && !songs) return "launch";
         if (complete && !songs) return "round-over";
         if (songs && !winners) return "voting";
         if (winners) return "congrats";
         return "wtf";
      },
      reverse() {
         const { id, theme, songs, winners } = this.round;
         if (!id) return "save-round";
         if (!theme) return 'theme';
         if (!songs) return 'round-over';
         if (!winners) return 'voting';
         if (winners) return 'congrats';
         return 'wtf';
      },
      metadata() {
         return {
            id: this.round.id,
            number: this.round.number,
            theme: this.round.theme,
            dates: this.round.dates,
            parts: this.round.parts,
            experience: this.round.experience
         };
      },
   }
};
</script>

<style scoped>
div#stage-wrapper {
   background-color: #2d2b38;
   color: white;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
}
</style>