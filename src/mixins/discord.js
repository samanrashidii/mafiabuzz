import { mapActions } from 'vuex'

export default {
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
    }
  }
}
