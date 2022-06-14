<template>
  <div class="show-box">
    <p v-if="!showrole">
      {{ $t('pages.home.passMobile') }}
    </p>
    <p v-else>
      {{ $t('pages.home.gotMobile') }}
    </p>
    <div
      v-for="(role, index) in gameSettings.selectedRoles"
      :key="index"
    >
      <div
        class="player-displayer"
        v-if="(index+1) === gameSettings.personNumb"
      >
        <strong :class="showrole ? {'mafia-color': role.mafia, 'solo-color': !role.mafia && role.solo, 'citizen-color': !role.mafia && !role.solo} : ''">{{ role.player }}</strong>
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
            {{ $t('pages.home.beforeShowButton') }}
          </AppButton>
          <div
            class="role-info-wrapper"
            v-else
          >
            <div
              class="role-info"
              :class="{'solo': !role.mafia && role.solo, 'citizen': !role.mafia && !role.solo}"
            >
              <img
                :src="getImg('/roles', role.icon)"
                :alt="$t(role.alt)"
              >
              <h4>{{ $t(role.name) }}</h4>
            </div>
            <AppButton
              @click.native.once="nextPerson()"
              class="green"
            >
              {{ $t('pages.home.afterShowButton') }}
            </AppButton>
            <AppButton
              v-if="gameSettings.discordChannel"
              @click.native="copyToClipboard(role)"
              class="discord-bttn purple"
            >
              <span>{{ $t('common.copyToClipboard') }}</span>
              <input
                type="hidden"
                :value="role.emoji + ' ' + $t(role.name)"
                ref="copyToDiscord"
              >
            </AppButton>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      showrole: false
    }
  },
  computed: {
    ...mapGetters({
      GameSettings: 'gameStatus/GameSettings'
    }),
    gameSettings () {
      return JSON.parse(JSON.stringify(this.GameSettings))
    }
  },
  methods: {
    ...mapActions({
      SetGameSettings: 'gameStatus/SetGameSettings'
    }),
    nextPerson () {
      this.showrole = false;
      if (this.gameSettings.personNumb == this.gameSettings.selectedRoles.length) {
        this.gameSettings.stepCounter = 3

        // Post Start Game By God To Discord
        const text = this.$t('thirdparty.discordGodGameStarted')
        this.postDiscord(text)
      } else {
        this.gameSettings.personNumb++
      }
      this.SetGameSettings(this.gameSettings)
    },
    copyToClipboard (role) {
      const container = this.$refs.copyToDiscord
      let text = container[0].value
      if (this.gameSettings.mafia > 1 && role.mafia && !role.status.traitor && !role.status.drunk) {
        text += `

🕵️‍♀️🕵️‍♂️ ${this.$t('thirdparty.discordMafiaTeam')}`
        this.gameSettings.selectedRoles.forEach((element) => {
          if (element.player !== role.player && element.mafia && !element.status.traitor) {
            text += `${element.player} • `
          }
        })
      }
      this.$copyText(text)
    }
  }
}
</script>
