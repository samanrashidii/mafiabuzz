export default {
    methods: {
      fireAction(player) {
        if (player.actionStatus === false) {
          this.dashboard.info.id = player.id
          this.dashboard.info.name2 = player.name
          this.dashboard.info.player = player.player
          this.dashboard.info.icon2 = player.icon
          this.dashboard.info.action = player.action.action
          this.dashboard.info.passive = player.action.passive
          this.dashboard.info.ability = player.ability
          this.dashboard.info.status = player.status
          this.dashboard.info.actionIcon = player.actionIcon
          this.dashboard.info.mafia = player.mafia
          this.dashboard.readyToLog = true
        }
        this.SetDashboard(this.dashboard)
      }
    }
}