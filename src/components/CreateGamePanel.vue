<template>
  <div
    class="create create-game-panel"
  >
    <!-- Patch Notes -->
    <div
      class="dashboard-header"
    >
      <BaseButton
        class="patch-bttn awesome3"
        @clicked="togglePatchNotes(true)"
      >
        <span>
          {{ $t('general.patchButton') }}
        </span>
      </BaseButton>
      <PageBox>
        <PageTitle />
      </PageBox>
    </div>
    <Overlay
      :class="{'active': patchNotes}"
    >
      <template>
        <img
          class="app-logo"
          src="@/assets/images/logo.png"
          :alt="$t('general.alt')"
        >
        <h2
          class="app-version"
        >
          {{ 'v' + appVersion }}
        </h2>
        <span
          class="patch-date"
        >
          {{ $t('general.lastUpdate') }}
        </span>
        <ListItem
          :items="$t('patchNotes')"
        />
        <BaseButton
          class="close-bttn danger has-top-margin"
          @clicked="togglePatchNotes(false)"
        >
          <span>
            {{ $t('common.closeButton') }}
          </span>
        </BaseButton>
      </template>
    </Overlay>
    <InstagramBanner />
    <PageBox>
      <SelectNumbers
        type="total-unit"
      />
    </PageBox>
    <PageBox>
      <SelectNumbers
        type="total-mafia"
      />
    </PageBox>
    <DiscordBox />
    <Roles />
    <BaseButton
      class="start-bttn has-top-margin active"
      @clicked="toggleOverlay(true)"
    >
      <span>
        {{ $t('pages.home.start') }}
      </span>
    </BaseButton>
    <!-- Start Game Alert -->
    <Overlay
      :class="{
        'active': overlay,
        'dialog': isValid
      }"
    >
      <template
        v-if="isValid"
      >
        <ErrorBox
          :error-status="error"
          :mafia-numbers="gameSettings.mafia"
          :citizen-numbers="gameSettings.citizen"
        />
        <BaseButton
          class="settings-bttn danger"
          @clicked="toggleOverlay(false)"
        >
          <span>
            {{ $t('pages.home.changeSettings') }}
          </span>
        </BaseButton>
      </template>
      <template
        v-else
      >
        <NoteBox />
        <Table
          :table-data="gameSettings.fMafias"
          class="mafia-table"
        />
        <Table
          :table-data="gameSettings.fCitizens"
          class="citizen-table"
        />
        <BaseButton
          class="start-bttn green"
          @clicked="startGame()"
        >
          <span>
            {{ $t('pages.home.start') }}
          </span>
        </BaseButton>
        <BaseButton
          class="settings-bttn danger"
          @clicked="toggleOverlay(false)"
        >
          <span>
            {{ $t('pages.home.changeSettings') }}
          </span>
        </BaseButton>
      </template>
    </Overlay>
    <PowerMeter
      :class="{'active': !isValid}"
    />
  </div>
</template>

<script>
import DiscordBox from '@/components/DiscordBox.vue';
import ErrorBox from '@/components/ErrorBox.vue';
import NoteBox from '@/components/NoteBox.vue';
import ListItem from '@/components/ListItem.vue';
import PageTitle from '@/components/PageTitle.vue';
import PowerMeter from '@/components/PowerMeter.vue';
import Roles from '@/components/Roles.vue';
import SelectNumbers from '@/components/SelectNumbers.vue';
import Table from '@/components/Table.vue';
import WelcomeBox from '@/components/WelcomeBox.vue';
import InstagramBanner from '@/components/InstagramBanner.vue';

export default {
  data() {
    return {
      error: {
        mafia: false,
        citizens: false,
      },
      overlay: false,
      patchNotes: false,
      patchClicked: 0
    }
  },
  components: {
    DiscordBox,
    ErrorBox,
    NoteBox,
    ListItem,
    PageTitle,
    PowerMeter,
    Roles,
    SelectNumbers,
    Table,
    WelcomeBox,
    InstagramBanner
  },
  computed: {
    appVersion () {
      return process.env.VUE_APP_VERSION
    },
    isValid () {
      if (this.gameSettings.selectedMafia != this.gameSettings.mafia) {
        this.error.mafia = true
      } else {
        this.error.mafia = false
      }
      if (this.gameSettings.selectedCitizen != this.gameSettings.citizen) {
        this.error.citizens = true
      } else {
        this.error.citizens = false
      }
      if (this.gameSettings.selectedMafia == this.gameSettings.mafia && this.gameSettings.selectedCitizen == this.gameSettings.citizen) {
        return false
      }
      return true
    },
  },
  methods: {
    startGame () {
      localStorage.setItem('defaultSettings', JSON.stringify(this.DefaultState))
      this.gameSettings.gameStarted = true
      this.SetGameSettings(this.gameSettings)
      localStorage.setItem('sameSettings', JSON.stringify(this.DefaultState))
      // Post Event To Discord
      let mafia = `
      • `
      let citizen = `
      • `
      let solo = `
      • `
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.mafia) {
          mafia += `${element.emoji} ${element.info[this.currentLang].name} • `
        } else if (!element.mafia && !element.solo) {
          citizen += `${element.emoji} ${element.info[this.currentLang].name} • `
        } else if (!element.mafia && element.solo) {
          solo += `${element.emoji} ${element.info[this.currentLang].name} • `
        }
      })
      let text = `${this.$t('general.welcomeToMafiabuzz')}

      `
      text += `
      ${this.$t('thirdparty.discordGameStarted')}
      `
      text += `

      ${this.$t('thirdparty.discordMafiaPower') + this.gameSettings.powerControl.mafiaPower}
      ${this.$t('thirdparty.discordCitizenPower') + this.gameSettings.powerControl.citizenPower}

      ${this.$t('thirdparty.discordMafia') + this.gameSettings.aliveMafia}
      `
      text += mafia
      text += `

      ${this.$t('thirdparty.discordCitizen') + this.gameSettings.aliveCitizen}
      `
      text += citizen

      if (solo.length > 10) {
      text += `

      ${this.$t('thirdparty.discordSolo') + this.gameSettings.aliveSolo}
      `
      text += solo
      }
      this.postDiscord(text)
    },
    togglePatchNotes (value) {
      this.patchNotes = value
    },
    toggleOverlay (value) {
      this.overlay = value
    }
  }
}
</script>
