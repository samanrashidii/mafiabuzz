export default {
  methods: {
    killByVote (target, revenge) {
      let voteText = ''
      let voteImage = ''
      this.gameSettings.selectedRoles.forEach((element) => {
        if (target === element.player) {
          if (revenge) {
            // Kill Revenge Target
            this.kill(element.player)
            // Kill Avenger After that
            this.kill(this.dashboard.avenger)
            // Check that Revenge Target is another Avenger or not
            if (element.ability.revenge) {
              this.dashboard.revengeKillBox = true
            } else {
              this.dashboard.revengeKillBox = false
            }
            this.dashboard.revengeUsed = true
            this.dashboard.avenger = null
            voteText = `<span>${this.$t('god.revengeKill')}</span> <strong>${element.player}</strong>`
            voteImage = `${this.$t('god.revengeIcon')}`
            if (this.dashboard.voteKill) {
              this.SetDashboard(this.dashboard)
              this.SetGameSettings(this.gameSettings)
              this.finishDay()
            } else {
              this.SetDashboard(this.dashboard)
              this.SetGameSettings(this.gameSettings)
              this.finishNight()
            }
          } else {
            voteText = `<span>${this.$t('god.voteKill')}</span> <strong>${element.player}</strong>`
            voteImage = `${this.$t('god.voteIcon')}`
            this.kill(element.player, 'straight')
            this.dashboard.voteKill = true
            this.dashboard.lastPhaseAction = false
            this.dashboard.justiceUsed = false
            if (element.ability.voteSeeker) {
              this.gameSettings.soloWinner = element
              this.gameSettings.soloWins = true
            }
            if (!element.ability.revenge) {
              this.SetDashboard(this.dashboard)
              this.SetGameSettings(this.gameSettings)
              this.finishDay()
            }
          }
          this.saveHistory(voteImage, voteText)
          this.SetDashboard(this.dashboard)
          this.SetGameSettings(this.gameSettings)
        }
      })
    }
  }
}
