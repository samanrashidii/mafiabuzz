export default {
  methods: {
    navigateActions (index, state) {
      let savedState
      if (state === 'prev') {
        savedState = JSON.parse(window.localStorage.getItem(`action_${index - 1}`))
        this.SetDashboard(savedState.dashboard.dashboard)
        this.SetGameSettings(savedState.gameSettings.gameSettings)
      } else if (state === 'next') {
        this.skipAction(index)
      }
    }
  }
}
