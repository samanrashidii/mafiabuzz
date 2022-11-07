import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      GameSettings: 'gameSettings/gameSettings',
      Dashboard: 'dashboard/Dashboard',
      Roles: 'roles/Roles',
      ReplacingRoles: 'roles/ReplacingRoles',
      DefaultState: 'DefaultState'
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
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDashboard: 'dashboard/SetDashboard',
      SetDiscordChannel: 'gameSettings/SetDiscordChannel',
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
