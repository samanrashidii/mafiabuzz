import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      allStates: 'allStates',
      GameSettings: 'gameSettings/gameSettings',
      Dashboard: 'dashboard/dashboard',
      Roles: 'roles/Roles',
      ReplacingRoles: 'roles/ReplacingRoles'
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
    dice (number) {
      return Math.floor(Math.random() * number) + 1
    },
    getImg (dir, pic) {
      return require(`@/assets/images${dir}/${pic}`)
    },
    setStatus (target, statuses = {}) {
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.player === target) {
          for (const [key, value] of Object.entries(statuses)) {
            role.status[key] = value
          }
        }
      })
    },
    getRoleObjectByName (target) {
      return this.gameSettings.selectedRoles.filter(role => role.player === target)[0]
    },
    getRoleObjectByIndex (roleIndex) {
      return this.gameSettings.selectedRoles.filter((role, index) => index === roleIndex)[0]
    },
    getRoleObjectById (id) {
      return this.gameSettings.selectedRoles.filter(role => role.id === id)[0]
    },
    startGameEngine (type) {
      if (type) {
        let state = {}
        const discordToken = window.localStorage.getItem('discordToken')

        if (type === 'roles-selected-create') {
          state = JSON.parse(window.localStorage.getItem('save-roles-selected-create'))
        } else if (type === 'roles-selected-dashboard') {
          state = JSON.parse(window.localStorage.getItem('save-roles-selected-dashboard'))
        } else if (type === 'autosave') {
          state = JSON.parse(window.localStorage.getItem('save-automatic'))
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
