import { mapActions } from 'vuex'

export default {
  computed: {
    currentLang () {
      const output = this.$root._i18n.locale
      return output
    }
  },
  methods: {
    ...mapActions({
      PostToDiscord: 'gameStatus/PostToDiscord'
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
