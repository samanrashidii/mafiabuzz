export default {
  methods: {
    navigateActions (index, state) {
      let savedState
      if (state === 'prev') {
        savedState = JSON.parse(localStorage.getItem(`action_${index - 1}`))
        this.SetDashboard(savedState.dashboard.dashboard)
        this.SetGameSettings(savedState.gameSettings.gameSettings)
      } else if (state === 'next') {
        this.skipAction(index)
      }
    },
    nextAction (index) {
      this.dashboard.actionProgress++
      this.actionTarget1 = null
      this.actionTarget2 = null
      this.useAbility = false
      this.dashboard.targetData = {}
      localStorage.setItem(`action_${index}`, JSON.stringify(this.allStates))
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
    },
    skipAction (index) {
      this.alertBox = false
      this.nextAction(index)
    }
  }
}
