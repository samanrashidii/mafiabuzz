<template>
  <div
    class="game-finished"
  >
    <template
      v-for="(winner, index) in $t('general.winner')"
    >
      <div
        v-if="winner.class === gameWinner"
        :key="index"
        :class="winner.class + ' game-finish-box'"
      >
        <div
          class="inner-game-finish-box"
        >
          <div
            v-if="soloWinnerDetails"
          >
            <img
              :src="getImg('/roles', soloWinnerDetails.icon)"
              :alt="soloWinnerDetails.name"
              class="solo-player"
            >
            <h2
              v-html="winner.title"
            />
            <h2>
              <strong>
                {{ soloWinnerDetails.name }}
              </strong>
            </h2>
          </div>
          <div
            v-else
          >
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
            <BaseButton
              class="active"
              @clicked="changeGameFinshed(false)"
            >
              <span>{{ $t('god.viewButton') }}</span>
            </BaseButton>
            <BaseButton
              class="awesome"
              @clicked="resetSameGame()"
            >
              <span>{{ $t('god.restartButton') }}</span>
            </BaseButton>
            <BaseButton
              class="awesome2"
              @clicked="resetFactory()"
            >
              <span>
                {{ $t('god.startButton') }}
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    gameWinner: {
      type: String,
      default: ''
    },
    soloWinnerDetails: {
      type: Object,
      default: () => {}
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
  }
}
</script>
