import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      GameSettings: 'gameSettings/gameSettings'
    }),
    gameSettings () {
      return JSON.parse(JSON.stringify(this.GameSettings))
    },
    currentLang () {
      const output = this.$root._i18n.locale
      return output
    }
  },
  methods: {
    ...mapActions({
      SetGameSettings: 'gameSettings/SetGameSettings',
      PostToDiscord: 'gameSettings/PostToDiscord'
    }),
    postDiscord (text, staticUrl) {
      const discordPayload = {
        payload: {
          embeds: [{
            description: text,
            color: 1160836
          }],
          tts: false
        },
        url: staticUrl || this.gameSettings.discordChannel
      }
      if (this.gameSettings.discordChannel || staticUrl) {
        this.PostToDiscord(discordPayload)
      }
    },
    getImg (dir, pic) {
      return require(`@/assets/images${dir}/${pic}`)
    }
  }
}
