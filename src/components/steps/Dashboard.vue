<template>
  <div
    class="dashboard"
  >
    <div
      class="dashboard-header"
    >
      <PageBox>
        <PageTitle
          dashboard-title
        />
      </PageBox>
      <BaseButton
        v-if="gameSettings.stepCounter !== 3"
        class="settings-bttn danger has-small-top-margin"
        @clicked="toggleAlertBox(true)"
      >
        <span>
          {{ $t('pages.home.changeSettings') }}
        </span>
      </BaseButton>
    </div>
    <Overlay
      :class="{
        'active': alertBox,
        'dialog': true
      }"
    >
      <img
        class="has-xsmall-bottom-margin"
        src="@/assets/images/icons/warning.svg"
        :alt="$t('general.warningIcon')"
      >
      <template>
        <p>
          {{ $t('pages.home.changeSettingsText') }}
        </p>
        <BaseButton
          class="green"
          @clicked="changeGameSettings()"
        >
          <span>
            {{ $t('pages.home.confirmButton') }}
          </span>
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="toggleAlertBox(false)"
        >
          <span>
            {{ $t('pages.home.cancelButton') }}
          </span>
        </BaseButton>
      </template>
    </Overlay>
    <transition
      name="slide"
      mode="out-in"
    >
      <PageBox
        v-if="gameSettings.stepCounter === 1"
        class="has-top-padding"
        key="step1"
      >
        <a
        v-if="checkUsers"
          class="predefined type-2"
          :class="{'active': showSavedNames}"
          href="javascript:void(0)"
          @click="handleSavedNames()"
        >
          <span>
            {{ $t('pages.home.lastNames') }}
          </span>
        </a>
        <a
          v-else
          href="javascript:void(0)"
          :class="{'active': showPredefined}"
          class="predefined"
          @click="handlePredefine()"
        >
          <span>
            {{ $t('pages.home.defaultNames') }}
          </span>
        </a>
        <p>
          {{ $t('pages.home.chooseNameHint') }}
        </p>
        <p
          class="important-hint"
        >
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
        <BaseButton
          class="active assign-bttn"
          @clicked="assignRoles()"
        >
          <span>
            {{ $t('pages.home.assign') }}
          </span>
        </BaseButton>
      </PageBox>
      <PageBox
        v-else-if="gameSettings.stepCounter === 2"
        class="display autoheight"
        key="step2"
      >
        <div
          class="inner-display"
        >
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
import God from '@/components/steps/God.vue';
import ShowBox from '@/components/ShowBox.vue';
import PageTitle from '@/components/PageTitle.vue';

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
    ShowBox,
    PageTitle
  },
  computed: {
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
    assignRoles () {
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
    handlePredefine () {
      if (this.showPredefined === false) {
        this.preDefined()
        this.showPredefined = true
        this.showSavedNames = false
      } else {
        this.players = []
        this.showPredefined = false
        this.showSavedNames = true
      }
    },
    handleSavedNames () {
      if (this.showSavedNames === false) {
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
    preDefined () {
      this.gameSettings.selectedRoles.forEach((element, index) => {
        this.players.push(`${this.$t('pages.home.playerDefault')} ${index + 1}`)
      })
    },
    toggleAlertBox (value) {
      this.alertBox = value
    },
    randomFunc () {
      this.gameSettings.selectedRoles.sort(() => 0.5 - Math.random())
    },
    changeGameSettings () {
      this.startGameEngine('change')
    }
  }
}
</script>
