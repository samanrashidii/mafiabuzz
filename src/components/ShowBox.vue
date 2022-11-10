<template>
  <div
    class="show-box"
  >
    <p
      v-if="!showrole"
    >
      {{ $t('pages.home.passMobile') }}
    </p>
    <p
      v-else
    >
      {{ $t('pages.home.gotMobile') }}
    </p>
    <div
      v-for="(role, index) in gameSettings.selectedRoles"
      :key="index"
    >
      <div
        class="player-displayer"
        v-if="(index + 1) === personNumber"
      >
        <strong
          :class="showrole ? {
            'mafia-color': role.mafia,
            'solo-color': !role.mafia && role.solo,
            'citizen-color': !role.mafia && !role.solo}
          : ''"
        >
          {{ role.player }}
        </strong>
        <transition
          name="fade"
          mode="out-in"
        >
          <BaseButton
            v-if="!showrole"
            class="yellow"
            key="showButton"
            @clicked="toggleShowRole(true)"
          >
            {{ $t('pages.home.beforeShowButton') }}
          </BaseButton>
          <div
            v-else
            class="role-info-wrapper"
          >
            <div
              class="role-info"
              :class="{
                'solo': !role.mafia && role.solo,
                'citizen': !role.mafia && !role.solo
              }"
            >
              <img
                :src="getImg('/roles', role.icon)"
                :alt="role.info[currentLang].name"
              >
              <h4>
                {{ role.info[currentLang].name }}
              </h4>
            </div>
            <BaseButton
              class="green"
              @clicked.once="nextPerson()"
            >
              {{ $t('pages.home.afterShowButton') }}
            </BaseButton>
            <BaseButton
              v-if="gameSettings.discordChannel"
              class="discord-bttn purple"
              @clicked="copyToClipboard(role)"
            >
              <span>
                {{ $t('common.copyToClipboard') }}
              </span>
              <input
                type="hidden"
                :value="role.emoji + ' ' + role.info[currentLang].name"
                ref="copyToDiscord"
              >
            </BaseButton>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showrole: false,
      personNumber: 1
    }
  },
  methods: {
    nextPerson () {
      this.toggleShowRole(false)
      if (this.personNumber == this.gameSettings.selectedRoles.length) {
        this.gameSettings.stepCounter = 3
        this.SetGameSettings(this.gameSettings)
        // Post Start Game By God To Discord
        const text = this.$t('thirdparty.discordGodGameStarted')
        this.postDiscord(text)
      } else {
        this.personNumber++
      }
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
    },
    toggleShowRole (value) {
      this.showrole = value
    }
  }
}
</script>
