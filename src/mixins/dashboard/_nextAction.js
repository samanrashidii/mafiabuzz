export default {
    methods: {
      nextAction(time1, time2) {
        this.logAction = true
        setTimeout(() => {
          this.logAction = false
          this.logActionDone = true
          setTimeout(() => {
            this.dashboard.actionProgress++
            this.logActionDone = false
            this.dashboard.info.target = '?'
            this.dashboard.info.targetRole = 'replacingRoles.preTarget.role'
            this.dashboard.info.targetID = 0
            this.dashboard.info.targetMafia = null
            this.dashboard.info.targetIcon = 'replacingRoles.preTarget.icon'
            this.dashboard.log.target = null
            this.dashboard.log.targetRole = 'replacingRoles.preTarget.role'
            this.dashboard.log.targetPassive = 'common.None'
          }, time2);
        }, time1);
        this.SetDashboard(this.dashboard)
        this.SetGameSettings(this.gameSettings)
      }
    }
}