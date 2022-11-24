export default {
  methods: {
    killByVote (target, revenge) {
      let voteText = ''
      let voteImage = ''
      this.gameSettings.selectedRoles.forEach((role) => {
        if (target === role.player) {
          // if type of vote is Revenge
          if (revenge) {
            // Kill Revenge Target
            this.kill(role.player)
            // Kill Avenger After that
            this.kill(this.dashboard.avenger)
            // Check that Revenge Target is another Avenger or not
            if (role.ability.revenge) {
              this.dashboard.revengeKillBox = true
            } else {
              this.dashboard.revengeKillBox = false
            }
            this.dashboard.revengeUsed = true
            this.dashboard.avenger = null
            voteText = `<span>${this.$t('god.revengeKill')}</span> <strong>${role.player}</strong>`
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
          // if type of vote is Default
          } else {
            voteText = `<span>${this.$t('god.voteKill')}</span> <strong>${role.player}</strong>`
            voteImage = `${this.$t('god.voteIcon')}`
            this.kill(role.player, 'straight')
            this.dashboard.voteKill = true
            this.dashboard.lastPhaseAction = false
            this.dashboard.justiceUsed = false
            if (role.ability.voteSeeker) {
              this.gameSettings.soloWinner = role
              this.gameSettings.soloWins = true
            }
            if (!role.ability.revenge) {
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
