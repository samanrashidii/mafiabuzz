
export default {
  methods: {
    checkLockedStatus (state) {
      state.roles.Roles.forEach((element) => {
        this.Roles.forEach((el) => {
          if (element.id === el.id) {
            element.lock = el.lock
            element.owned = el.owned
          }
        })
      })
    },
    startGameEngine (type) {
      if (type === 'hard') {
        const defaultState = JSON.parse(window.localStorage.getItem('defaultState'))
        this.checkLockedStatus(defaultState)
        this.SetRoles(defaultState.roles.Roles)
        this.SetReplacingRoles(defaultState.roles.ReplacingRoles)
        this.SetGameSettings(defaultState.gameStatus.gameSettings)
        this.SetDashboard(defaultState.dashboard.dashboard)
      } else if (type === 'soft') {
        const sameSettings = JSON.parse(window.localStorage.getItem('sameSettings'))
        this.checkLockedStatus(sameSettings)
        this.SetRoles(sameSettings.roles.Roles)
        this.SetReplacingRoles(sameSettings.roles.ReplacingRoles)
        this.SetGameSettings(sameSettings.gameStatus.gameSettings)
        this.SetDashboard(sameSettings.dashboard.dashboard)
      } else if (type === 'change') {
        const defaultSettings = JSON.parse(window.localStorage.getItem('defaultSettings'))
        this.checkLockedStatus(defaultSettings)
        this.SetRoles(defaultSettings.roles.Roles)
        this.SetReplacingRoles(defaultSettings.roles.ReplacingRoles)
        this.SetGameSettings(defaultSettings.gameStatus.gameSettings)
        this.SetDashboard(defaultSettings.dashboard.dashboard)
      } else if (type === 'captured') {
        const capturedState = JSON.parse(window.localStorage.getItem('capturedState'))
        this.checkLockedStatus(capturedState)
        this.SetRoles(capturedState.roles.Roles)
        this.SetReplacingRoles(capturedState.roles.ReplacingRoles)
        this.SetGameSettings(capturedState.gameStatus.gameSettings)
        this.SetDashboard(capturedState.dashboard.dashboard)
      }
      const discordToken = window.localStorage.getItem('discordToken')
      if (discordToken) {
        this.SetDiscordChannel(discordToken)
      }
    }
  }
}
