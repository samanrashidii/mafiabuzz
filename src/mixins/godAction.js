export default {
  methods: {
    godAction (target) {
      if (target.status.dead) {
        this.resurrect(target.player)
        this.dashboard.log.godText = `<span>${this.$t('god.godRevive')}</span> <strong>${target.player}</strong>`
        this.dashboard.log.godImage = `${this.$t('god.godReviveIcon')}`
      } else {
        this.kill(target.player)
        this.dashboard.log.godText = `<span>${this.$t('god.godKill')}</span> <strong>${target.player}</strong>`
        this.dashboard.log.godImage = `${this.$t('god.godKillIcon')}`
      }
      this.saveHistory(this.dashboard.log.godImage, this.dashboard.log.godText)
      this.SetGameSettings(this.gameSettings)
      this.SetDashboard(this.dashboard)
    }
  }
}
