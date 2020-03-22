<template>
  <div class="game-finished">
    <template v-for="(winner, index) in this.$t('general.winner')">
      <div
        :key="index"
        class="game-finish-box"
        :class="winner.class"
        v-if="winner.class === gameWinner"
      >
        <div class="inner-game-finish-box">
          <img
            :src="getImgUrl('/game', winner.image)"
            :alt="winner.alt"
          >
          <h2 v-html="winner.title" />
          <div class="button-holder">
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
import getImg from '@/mixins/getImg';
import startGame from '@/mixins/startGame';

export default {
  props: {
    gameWinner: String,
  },
  computed: {
    ...mapGetters({
      GameSettings: 'gameStatus/GameSettings',
    }),
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings));
    },
  },
  methods: {
    ...mapActions({
      SetMainApp: 'main/SetMainApp',
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    // Reset Game From Start
    resetFactory() {
      this.startGameEngine('hard');
    },
    // Reset Game with Same Roles and Names
    resetSameGame() {
      this.startGameEngine('soft');
    },
    changeGameFinshed(state) {
      this.gameSettings.gameFinished = state;
      this.gameSettings.reviewGame = !state;
      this.SetGameSettings(this.gameSettings);
    },
  },
  mixins: [
    getImg,
    startGame,
  ],
};
</script>
