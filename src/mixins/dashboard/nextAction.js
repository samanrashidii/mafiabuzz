export default {
    methods: {
      nextAction(time1, time2) {
        this.dashboard.logAction = true
        setTimeout(() => {
          this.dashboard.logAction = false
          this.dashboard.logActionDone = true
          setTimeout(() => {
            this.dashboard.actionProgress++
            this.dashboard.logActionDone = false
            this.dashboard.info.target = this.$t('replacingRoles.preTarget.name')
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