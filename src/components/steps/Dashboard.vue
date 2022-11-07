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
        @click.native="alertBox = true"
        class="settings-bttn danger has-small-top-margin"
        v-if="gameSettings.stepCounter !== 3"
      >
        <span>{{ $t('pages.home.changeSettings') }}</span>
      </AppButton>
    </div>

    <Overlay :class="{'active': alertBox,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        src="@/assets/images/icons/warning.svg"
        :alt="$t('general.warningIcon')"
      >
      <template>
        <p>{{ $t('pages.home.changeSettingsText') }}</p>
        <AppButton
          @click.native="changeGameSettings()"
          class="green"
        >
          <span>{{ $t('pages.home.confirmButton') }}</span>
        </AppButton>
        <AppButton
          @click.native="alertBox = false"
          class="danger"
        >
          <span>{{ $t('pages.home.cancelButton') }}</span>
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
          <span>{{ $t('pages.home.lastNames') }}</span>
        </a>
        <a
          @click="handlePredefine()"
          :class="{'active': showPredefined}"
          class="predefined"
          href="javascript:void(0)"
          v-else
        >
          <span>{{ $t('pages.home.defaultNames') }}</span>
        </a>
        <p>{{ $t('pages.home.chooseNameHint') }}</p>
        <p class="important-hint">
          {{ $t('pages.home.nameExtraHint') }}
        </p>
        <input
            v-for="(roleInput, index) in gameSettings.selectedRoles"
            @keyup.enter="$event.target.nextElementSibling.focus()"
            type="text"
            class="has-xsmall-bottom-margin"
            :key="index"
            v-model="players[index]"
          >
        <AppButton
          @click.native="assignRoles()"
          class="active assign-bttn"
        >
          <span>{{ $t('pages.home.assign') }}</span>
        </AppButton>
      </PageBox>

      <PageBox
      v-else-if="gameSettings.stepCounter === 2"
        class="display autoheight"
        key="step2"
      >
        <div class="inner-display">
          <ShowBox />
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
import God from '@/components/steps/God.vue';
import Overlay from '@/components/Overlay.vue';
import ShowBox from '@/components/ShowBox.vue';
import PageTitle from '@/components/PageTitle.vue';
import checkRoute from '@/mixins/checkRoute';
import startGame from '@/mixins/startGame';

export default {
  data() {
    return {
      players: [],
      ready: false,
      showPredefined: false,
      showSavedNames: false,
      alertBox: false
    }
  },
  components: {
    God,
    Overlay,
    ShowBox,
    PageTitle
  },
  computed: {
    ...mapGetters({
      Roles: 'roles/Roles'
    }),
    roles() {
      return JSON.parse(JSON.stringify(this.Roles))
    },
    checkUsers() {
      const savedPlayers = JSON.parse(localStorage.getItem('savedPlayers'))
      if (savedPlayers && savedPlayers.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDiscordChannel: 'gameSettings/SetDiscordChannel',
      SetDashboard: 'dashboard/SetDashboard'
    }),
    assignRoles() {
      const gR = this.gameSettings.selectedRoles
      const pL = this.players
      let text = this.$t('thirdparty.discordPlayers')
      const checkPlayersInput = pL.filter((item, index) => pL.indexOf(item) >= index)
      if (pL.length === gR.length && checkPlayersInput.length === pL.length) {
        for (let i = 0; i < pL.length; i++) {
          if (pL[i].length < 1) {
            this.ready = false
            break
          } else {
            this.ready = true
          }
        }
      } else {
        this.$notify({
          group: 'log',
          type: 'error',
          title: 'error.svg',
          text: `${this.$t('general.errors.uniquePlayers')}`,
          duration: 4000
        })
      }
      if (this.ready) {
        this.randomFunc()
        for (let i = gR.length - 1; i >= 0; i--) {
          gR[i].player = pL[i]
        }
        this.gameSettings.stepCounter = 2
        text += `• `
        pL.forEach((element) => {
          text += `${element} • `
        })
        // Post Players To Discord
        this.postDiscord(text)
      }
      if (pL.length > 0) {
        localStorage.setItem('savedPlayers', JSON.stringify(pL))
      }
      this.SetGameSettings(this.gameSettings)
    },
    handlePredefine() {
      if (this.showPredefined == false) {
        this.preDefined()
        this.showPredefined = true
        this.showSavedNames = false
      } else {
        this.players = []
        this.showPredefined = false
        this.showSavedNames = true
      }
    },
    handleSavedNames() {
      if (this.showSavedNames == false) {
        this.players = JSON.parse(localStorage.getItem('savedPlayers'))
        if (this.gameSettings.selectedRoles.length < this.players.length) {
          this.players = this.players.slice(0, this.gameSettings.selectedRoles.length)
        }
        this.showPredefined = false
        this.showSavedNames = true
      } else {
        this.players = []
        this.showPredefined = true
        this.showSavedNames = false
      }
    },
    preDefined() {
      this.gameSettings.selectedRoles.forEach((element, index) => {
        this.players.push(`${this.$t('pages.home.playerDefault')} ${index + 1}`)
      })
    },
    randomFunc() {
      this.gameSettings.selectedRoles.sort(() => 0.5 - Math.random())
    },
    changeGameSettings() {
      this.startGameEngine('change')
    }
  },
  mixins: [
    checkRoute,
    startGame
  ]
}
</script>
