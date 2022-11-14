export default {
  methods: {
    nextAction (index) {
      this.dashboard.actionProgress++
      this.actionTarget1 = null
      this.actionTarget2 = null
      this.useAbility = false
      this.dashboard.targetData = {}
      localStorage.setItem(`action_${index}`, JSON.stringify(this.allStates))
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
    }
  }
}
