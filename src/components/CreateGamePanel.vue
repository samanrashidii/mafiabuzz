<template>
  <div
    class="create create-game-panel"
  >
    <WelcomeBox />
    <!-- Instagram Banner -->
    <InstagramBanner />
    <!-- Connect to Discord Channel -->
    <DiscordBox />
    <!-- Setup Game Settings -->
    <PageBox>
      <SelectNumbers
        total-players
      />
    </PageBox>
    <PageBox>
      <SelectNumbers />
    </PageBox>
    <!-- Choose Characters -->
    <AllCharacters />
    <!-- Start Game Button -->
    <BaseButton
      class="start-bttn has-top-margin primary"
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
      <!-- Show errors when Game Settings are not correct -->
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
      <!-- Show all selected characters when Game Settings are correct -->
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
          class="start-bttn primary"
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
import PowerMeter from '@/components/PowerMeter.vue';
import AllCharacters from '@/components/AllCharacters.vue';
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
      patchClicked: 0
    }
  },
  components: {
    DiscordBox,
    ErrorBox,
    NoteBox,
    PowerMeter,
    AllCharacters,
    SelectNumbers,
    Table,
    WelcomeBox,
    InstagramBanner
  },
  computed: {
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
      localStorage.setItem('save-roles-selected-create', JSON.stringify(this.allStates))
      this.gameSettings.gameStarted = true
      this.SetGameSettings(this.gameSettings)
      localStorage.setItem('save-roles-selected-dashboard', JSON.stringify(this.allStates))
      // Post Event To Discord
      let mafia = `
      • `
      let citizen = `
      • `
      let solo = `
      • `
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.mafia) {
          mafia += `${role.emoji} ${role.info[this.currentLang].name} • `
        } else if (!role.mafia && !role.solo) {
          citizen += `${role.emoji} ${role.info[this.currentLang].name} • `
        } else if (!role.mafia && role.solo) {
          solo += `${role.emoji} ${role.info[this.currentLang].name} • `
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

      ${this.$t('thirdparty.discordCitizen') + this.gameSettings.aliveCitizens}
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
    toggleOverlay (value) {
      this.overlay = value
    }
  }
}
</script>
