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
      this.useAbility = false
      this.dashboard.targetData = {}
      localStorage.setItem(`action_${index}`, JSON.stringify(this.allStates))
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
      if (this.dashboard.actionProgress === this.dashboard.actionBox.length) {
        setTimeout(() => {
          const container = document.getElementById('ChangePhase')
          this.$scrollTo(container, 500, {
            offset: -15
          })
        }, 200)
      }
    },
    skipAction (index) {
      this.alertBox = false
      this.nextAction(index)
    }
  }
}
