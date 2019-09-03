export default {
  methods: {
    passiveCalc(element) {
      // Bomb Activate Passive ; Check Detonated ; Check One Time ; Check Not Hacked
      setTimeout(() => {
        if (element.ability.detonator && !element.status.detonated && element.action.oneTime && !element.status.hacked) {
          element.status.detonated = true
          this.dashboard.log.target = element.player
          this.dashboard.log.passiveLog = true
          this.dashboard.log.passive = element.action.passive
          this.dashboard.log.passiveIcon = element.icon
          element.status.detonated = true
          element.actionStatus = true
          element.action.oneTime = false
          this.dashboard.historyLog.push({ ...this.dashboard.log })
          this.dashboard.log.passiveLog = false
        }
        // Grandma Activate Passive ; Check Not Hacked
        else if (element.ability.returner && !element.status.hacked && !element.status.revived) {
          this.dashboard.log.target = element.player
          this.dashboard.log.passiveLog = true
          this.dashboard.log.passive = element.action.passive
          this.dashboard.log.passiveIcon = element.icon
          this.dashboard.historyLog.push({ ...this.dashboard.log })
          this.dashboard.log.passiveLog = false
        }
        // Bulletproof Activate Passive ; Check Detonated ; Check One Time ; Check Not Hacked
        else if (element.ability.hasShield && element.status.shield && element.action.oneTime && !element.status.hacked) {
          this.dashboard.log.target = element.player
          this.dashboard.log.passiveLog = true
          this.dashboard.log.passive = element.action.passive
          this.dashboard.log.passiveIcon = element.icon
          element.status.shield = false
          element.actionStatus = true
          element.action.oneTime = false
          this.dashboard.historyLog.push({ ...this.dashboard.log })
          this.dashboard.log.passiveLog = false;
        }
      }, 3500);
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
    }
  },
};
