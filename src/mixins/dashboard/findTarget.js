export default {
    methods: {
      findTarget(target) {
        this.gameSettings.selectedRoles.forEach((element) => {
          if (element.player === target) {
            this.dashboard.info.targetInfo = element
            this.dashboard.info.targetRole = element.name
            this.dashboard.info.targetPassive = element.action.passive
            this.dashboard.info.targetMafia = element.mafia
            this.dashboard.info.targetIcon = element.icon
            this.dashboard.info.targetID = element.id
            this.dashboard.info.status = element.status
            this.dashboard.info.damageReturned = element.status.damageReturned
          }
        })
        this.dashboard.info.target = target
        this.SetDashboard(this.dashboard)
      }
    }
}