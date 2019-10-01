<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <PageBox>
        <PageTitle
          dashboard-title
          :check-route="checkRoute()"
        />
      </PageBox>
      <AppButton
        @click.native="alertBox = true, totRestart = false"
        class="settings-bttn danger has-small-top-margin"
        v-if="gameSettings.stepCounter !== 3 && !gameSettings.gameReset"
      >
        <span>{{ $t('pages.creator.changeSettings') }}</span>
      </AppButton>
      <AppButton
        @click.native="alertBox = true, totRestart = true"
        class="danger has-small-top-margin"
        v-else-if="gameSettings.stepCounter !== 3 && gameSettings.gameReset"
      >
        <span>{{ $t('pages.creator.restartGame') }}</span>
      </AppButton>
    </div>

    <Overlay :class="{'active': alertBox,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        :src="getImgUrl('/icons', $t('general.warning'))"
        :alt="$t('general.warningIcon')"
      >
      <template v-if="!totRestart">
        <p>{{ $t('pages.creator.changeSettingsText') }}</p>
        <AppButton
          @click.native="resetGame()"
          class="green"
        >
          <span>{{ $t('pages.creator.confirmButton') }}</span>
        </AppButton>
        <AppButton
          @click.native="alertBox = false"
          class="danger"
        >
          <span>{{ $t('pages.creator.cancelButton') }}</span>
        </AppButton>
      </template>
      <template v-else>
        <p>{{ $t('pages.creator.resetTotalText') }}</p>
        <AppButton
          @click.native="restartGame()"
          class="green"
        >
          <span>{{ $t('pages.creator.restartButton') }}</span>
        </AppButton>
        <AppButton
          @click.native="alertBox = false"
          class="danger"
        >
          <span>{{ $t('pages.creator.cancelButton') }}</span>
        </AppButton>
      </template>
    </Overlay>

    <transition
      name="slide"
      mode="out-in"
    >
      <PageBox
        class="has-top-padding"
        v-if="gameSettings.stepCounter === 1"
        key="step1"
      >
        <a
          @click="handleSavedNames()"
          class="predefined type-2"
          :class="{'active': showSavedNames}"
          href="javascript:void(0)"
          v-if="checkUsers"
        >
          <span>{{ $t('pages.creator.lastNames') }}</span>
        </a>
        <a
          @click="handlePredefine()"
          :class="{'active': showPredefined}"
          class="predefined"
          href="javascript:void(0)"
          v-else
        >
          <span>{{ $t('pages.creator.defaultNames') }}</span>
        </a>
        <p>{{ $t('pages.creator.chooseNameHint') }}</p>
        <template v-for="(roleInput, index) in gameSettings.selectedRoles">
          <input
            @keyup.enter="$event.target.nextElementSibling.focus();"
            type="text"
            class="has-xsmall-bottom-margin"
            :key="index"
            v-model="players[index]"
          >
        </template>
        <AppButton
          @click.native="assignRoles()"
          class="active assign-bttn"
        >
          <span>{{ $t('pages.creator.assign') }}</span>
        </AppButton>
      </PageBox>

      <PageBox
        class="display autoheight"
        v-else-if="gameSettings.stepCounter === 2"
        key="step2"
      >
        <div class="inner-display">
          <p v-if="!showrole">
            {{ $t('pages.creator.passMobile') }}
          </p>
          <p v-else>
            {{ $t('pages.creator.gotMobile') }}
          </p>
          <div
            v-for="(role, index) in gameSettings.selectedRoles"
            :key="index"
          >
            <div
              class="player-displayer"
              v-if="(index+1) === gameSettings.personNumb"
            >
              <strong :class="showrole === true ? {'mafia-color': role.mafia === true, 'citizen-color': role.mafia === false} : ''">{{ role.player }}</strong>
              <transition
                name="fade"
                mode="out-in"
              >
                <AppButton
                  @click.native="showrole = true"
                  class="yellow"
                  key="showButton"
                  v-if="!showrole"
                >
                  {{ $t('pages.creator.beforeShowButton') }}
                </AppButton>
                <div
                  class="role-info-wrapper"
                  v-else
                >
                  <div
                    class="role-info"
                    :class="{'citizen': role.mafia === false}"
                  >
                    <img
                      :src="getImgUrl('/roles', role.icon)"
                      :alt="$t(role.alt)"
                    >
                    <h4>{{ $t(role.name) }}</h4>
                  </div>
                  <AppButton
                    @click.native.once="nextPerson()"
                    class="green"
                  >
                    {{ $t('pages.creator.afterShowButton') }}
                  </AppButton>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </PageBox>

      <God
        v-else-if="gameSettings.stepCounter === 3"
        key="step3"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import God from '@/components/main/God.vue';
import Overlay from '@/components/Overlay.vue';
import PageTitle from '@/components/PageTitle.vue';
import checkRoute from '@/mixins/checkRoute';
import getImg from '@/mixins/getImg';

export default {
  data() {
    return {
      players: [],
      ready: false,
      showPredefined: false,
      showSavedNames: false,
      showrole: false,
      alertBox: false,
      totRestart: false,
    };
  },
  components: {
    God,
    Overlay,
    PageTitle,
  },
  computed: {
    ...mapGetters({
      GameSettings: 'gameStatus/GameSettings',
    }),
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings));
    },
    checkUsers() {
      if (localStorage.getItem('savedPlayers') && localStorage.getItem('savedPlayers').length > 0) {
        return true;
      }
      return false;
    },

  },
  methods: {
    ...mapActions({
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    assignRoles() {
      const gR = this.gameSettings.selectedRoles;
      const pL = this.players;
      const checkPlayersInput = pL.filter((item, index) => pL.indexOf(item) >= index);
      if (pL.length === gR.length && checkPlayersInput.length === pL.length) {
        for (let i = 0; i < pL.length; i++) {
          if (pL[i].length < 1) {
            this.ready = false;
            break;
          } else {
            this.ready = true;
          }
        }
      }
      if (this.ready) {
        this.randomFunc();
        for (let i = gR.length - 1; i >= 0; i--) {
          gR[i].player = pL[i];
        }
        this.gameSettings.stepCounter = 2;
      }
      if (pL.length > 0) {
        localStorage.setItem('savedPlayers', pL);
      }
      this.SetGameSettings(this.gameSettings);
    },
    handlePredefine() {
      if (this.showPredefined == false) {
        this.preDefined();
        this.showPredefined = true;
        this.showSavedNames = false;
      } else {
        this.players = [];
        this.showPredefined = false;
        this.showSavedNames = true;
      }
    },
    handleSavedNames() {
      if (this.showSavedNames == false) {
        this.players = localStorage.getItem('savedPlayers').split(',');
        if (this.gameSettings.selectedRoles.length < this.players.length) {
          this.players = this.players.slice(0, this.gameSettings.selectedRoles.length);
        }
        this.showPredefined = false;
        this.showSavedNames = true;
      } else {
        this.players = [];
        this.showPredefined = true;
        this.showSavedNames = false;
      }
    },
    nextPerson() {
      this.showrole = false;
      if (this.gameSettings.personNumb == this.gameSettings.selectedRoles.length) {
        this.gameSettings.stepCounter = 3;
      } else {
        this.gameSettings.personNumb++;
      }
      this.SetGameSettings(this.gameSettings);
    },
    preDefined() {
      this.gameSettings.selectedRoles.forEach((element, index) => {
        this.players.push(`${this.$t('pages.creator.playerDefault')} ${index + 1}`);
      });
    },
    randomFunc() {
      this.gameSettings.selectedRoles.sort(() => 0.5 - Math.random());
    },
    resetGame() {
      this.gameSettings.gameStatus = false;
      this.gameSettings.stepCounter = 1;
      this.SetGameSettings(this.gameSettings);
    },
    restartGame() {
      const defaultSettings = localStorage.getItem(defaultState);
      this.SetGameSettings(defaultSettings);
      this.$router.push({ name: 'creator' });
    },
  },
  mixins: [
    checkRoute,
    getImg,
  ],
};
</script>
