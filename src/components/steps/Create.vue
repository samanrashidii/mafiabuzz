<template>
  <div class="create">
    <div class="dashboard-header">
      <p class="seo-clipboard">{{ $t('meta.home.description') }}</p>
      <WelcomeBox />
      <BaseButton
        @clicked="patchNotes = true"
        class="patch-bttn awesome3"
      >
        <span>{{ $t('general.patchButton') }}</span>
      </BaseButton>
      <PageBox>
        <PageTitle />
      </PageBox>
    </div>
    <Overlay :class="{'active': patchNotes}">
      <template>
        <img
          class="app-logo"
          src="@/assets/images/logo.png"
          :alt="$t('general.alt')"
        >
        <h2
          class="app-version"
          @click="sendPatchNote()"
        >
          {{ 'v' + appVersion }}
        </h2>
        <span class="patch-date">
          {{ $t('general.lastUpdate') }}
        </span>
        <ListItem :list="$t('patchNotes')" />
        <BaseButton
          @clicked="patchNotes = false"
          class="close-bttn danger has-top-margin"
        >
          <span>{{ $t('common.closeButton') }}</span>
        </BaseButton>
      </template>
    </Overlay>
    <InstagramBanner />
    <template>
      <div class="steps">
        <PageBox>
          <StepBox :type="'totalUnit'" />
        </PageBox>
        <PageBox>
          <StepBox :type="'totalMafia'" />
        </PageBox>
      </div>
      <DiscordBox />
      <Roles />
      <BaseButton
        @clicked="checkGame()"
        class="start-bttn has-top-margin active"
      >
        <span>{{ $t('pages.home.start') }}</span>
      </BaseButton>
      <Overlay :class="{'active': overlay,'dialog': isValid}">
        <template v-if="isValid">
          <ErrorBox
            :error-status="error"
            :mafia-numbers="gameSettings.mafia"
            :citizen-numbers="gameSettings.citizen"
          />
          <BaseButton
            @clicked="overlay = false"
            class="settings-bttn danger"
          >
            <span>{{ $t('pages.home.changeSettings') }}</span>
          </BaseButton>
        </template>
        <template v-else>
          <NoteBox />
          <Table
            class="mafia-table"
            :table-data="gameSettings.fMafias"
          />
          <Table
            class="citizen-table"
            :table-data="gameSettings.fCitizens"
          />
          <BaseButton
            @clicked="startGame()"
            class="start-bttn green"
          >
            <span>{{ $t('pages.home.start') }}</span>
          </BaseButton>
          <BaseButton
            @clicked="overlay = false"
            class="settings-bttn danger"
          >
            <span>{{ $t('pages.home.changeSettings') }}</span>
          </BaseButton>
        </template>
      </Overlay>
      <PowerMeter :class="{'active': !isValid}" />
    </template>
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
import StepBox from '@/components/StepBox.vue';
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
    StepBox,
    Table,
    WelcomeBox,
    InstagramBanner
  },
  computed: {
    appVersion () {
      return process.env.VUE_APP_VERSION
    },
    createSettings () {
      return JSON.parse(JSON.stringify(this.CreateSettings))
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
    checkGame () {
      this.overlay = true
    },
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
    sendPatchNote () {
      this.patchClicked += 1
      if (this.patchClicked === 5) {
        let text = this.$t('general.appVersion')
        text += `

        ${this.$t('general.lastUpdate')}
        
        `
        this.$t('patchNotes').forEach(item => {
          text += `
          ⚪️ ${item.text}
          
          `
        })
        const channelId = 'https://discordapp.com/api/webhooks/701346416626368522/KmerClaNMkxEqI3XzZOnlc8QiVlMKMfaAUauTeDpv_vab79gv0o-HgKIY2cmR4TxVVkJ'
        this.postDiscord(text, channelId)
      }
    }
  }
}
</script>
