import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      GameSettings: 'gameSettings/gameSettings',
      Dashboard: 'dashboard/dashboard',
      Roles: 'roles/Roles',
      ReplacingRoles: 'roles/ReplacingRoles',
      DefaultState: 'DefaultState'
    }),
    gameSettings () {
      return JSON.parse(JSON.stringify(this.GameSettings))
    },
    dashboard () {
      return JSON.parse(JSON.stringify(this.Dashboard))
    },
    replacingRoles () {
      return JSON.parse(JSON.stringify(this.ReplacingRoles))
    },
    checkRoute () {
      return this.$route.name
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
    setStatus (target, status, condition) {
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.player === target) {
          role.status[status] = condition
        }
      })
    },
    startGameEngine (type) {
      if (type) {
        let state = {}
        const discordToken = window.localStorage.getItem('discordToken')

        if (type === 'hard') {
          state = JSON.parse(window.localStorage.getItem('defaultState'))
        } else if (type === 'soft') {
          state = JSON.parse(window.localStorage.getItem('sameSettings'))
        } else if (type === 'change') {
          state = JSON.parse(window.localStorage.getItem('defaultSettings'))
        } else if (type === 'captured') {
          state = JSON.parse(window.localStorage.getItem('capturedState'))
        }

        this.SetRoles(state.roles.Roles)
        this.SetReplacingRoles(state.roles.ReplacingRoles)
        this.SetGameSettings(state.gameSettings.gameSettings)
        this.SetDashboard(state.dashboard.dashboard)

        if (discordToken) {
          this.SetDiscordChannel(discordToken)
        }
      }
    },
    dice (number) {
      return Math.floor(Math.random() * number) + 1
    },
    getImg (dir, pic) {
      return require(`@/assets/images${dir}/${pic}`)
    }
  }
}
