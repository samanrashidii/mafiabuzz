<template>
  <div
    class="game-finished"
  >
    <template
      v-for="(winner, index) in $t('general.winner')"
    >
      <div
        :key="index"
        class="game-finish-box"
        :class="winner.class"
        v-if="winner.class === gameWinner"
      >
        <div class="inner-game-finish-box">
          <div v-if="soloWinnerDetails">
            <img
              :src="getImg('/roles', soloWinnerDetails.icon)"
              :alt="soloWinnerDetails.name"
              class="solo-player"
            >
            <h2 v-html="winner.title" />
            <h2><strong>{{ soloWinnerDetails.name }}</strong></h2>
          </div>
          <div v-else>
            <img
              :src="getImg('/game', winner.image)"
              :alt="winner.name"
            >
            <h2
              v-html="winner.title"
            />
          </div>
          <div
            class="button-holder"
          >
            <AppButton
              @click.native="changeGameFinshed(false)"
              class="active"
            >
              <span>{{ $t('god.viewButton') }}</span>
            </AppButton>
            <AppButton
              @click.native="resetSameGame()"
              class="awesome"
            >
              <span>{{ $t('god.restartButton') }}</span>
            </AppButton>
            <AppButton
              @click.native="resetFactory()"
              class="awesome2"
            >
              <span>{{ $t('god.startButton') }}</span>
            </AppButton>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import startGame from '@/mixins/startGame';

export default {
  props: {
    gameWinner: String,
    soloWinnerDetails: Object
  },
  computed: {
    ...mapGetters({
      Roles: 'roles/Roles'
    }),
    roles() {
      return JSON.parse(JSON.stringify(this.Roles))
    },
    gameSettings() {
      return JSON.parse(JSON.stringify(this.gameSettings))
    }
  },
  updated () {
    if (this.gameSettings.gameFinished) {
      let text = ''
      this.$t('general.winner').forEach((winner) => {
        if (winner.class === this.gameWinner) {
          text += winner.text
        }
      })
      if (this.soloWinnerDetails) {
        text += this.soloWinnerDetails.info[this.currentLang].name
      }
      // Post Finish Game Result To Discord
      this.postDiscord(text)
    }
  },
  methods: {
    ...mapActions({
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDashboard: 'dashboard/SetDashboard',
      SetDiscordChannel: 'gameSettings/SetDiscordChannel'
    }),
    resetFactory() {
      this.startGameEngine('hard')
    },
    resetSameGame() {
      this.startGameEngine('soft')
    },
    changeGameFinshed(state) {
      this.gameSettings.gameFinished = state
      this.gameSettings.reviewGame = !state
      this.SetGameSettings(this.gameSettings)
    }
  },
  mixins: [
    startGame
  ]
}
</script>
