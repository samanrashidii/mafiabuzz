
export default {
  methods: {
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
    }
  }
}
