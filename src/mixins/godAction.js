export default {
  methods: {
    godAction (target) {
      let godActionText = ''
      let godActionImage = ''
      if (target.status.dead) {
        this.resurrect(target.player)
        godActionText = `<span>${this.$t('god.godRevive')}</span> <strong>${target.player}</strong>`
        godActionImage = `${this.$t('god.godReviveIcon')}`
      } else {
        this.kill(target.player)
        godActionText = `<span>${this.$t('god.godKill')}</span> <strong>${target.player}</strong>`
        godActionImage = `${this.$t('god.godKillIcon')}`
      }
      this.saveHistory(godActionImage, godActionText)
      this.SetGameSettings(this.gameSettings)
      this.SetDashboard(this.dashboard)
    }
  }
}
