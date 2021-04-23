export default {
  methods: {
    changePhase (phase) {
      if (!phase) {
        // Log Actions
        this.saveTotalHistory(this.dashboard.historyLog)
        // Reset Night Stuff
        this.dashboard.actionBox.forEach((element, index) => {
          window.localStorage.removeItem(`action_${index}`)
        })
        this.dashboard.startAction = false
        this.dashboard.actionBox = []
        this.dashboard.actionProgress = 0
        this.dashboard.voteKill = false
        let hasRevenger
        const revengeTime = this.gameSettings.selectedRoles.filter(element => element.ability.revenge && element.status.dead).length
        revengeTime > 0 ? hasRevenger = true : hasRevenger = false
        this.finishNight()
        if (hasRevenger && !this.dashboard.revengeUsed) {
          this.deadWatcher(true)
        }
      } else if (this.dashboard.round === 0) {
        this.finishDay()
      } else {
        this.dashboard.lastPhaseAction = true
      }
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
    },
    finishDay () {
      this.dashboard.lastNight = []
      let resultForDiscord = `

      📢 📢 📢 📢
      `

      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.status.poisoned) {
          this.kill(element.player)
        }
        if (element.status.silenced) {
          element.status.silenced = false
        }
        if (element.status.damageReturned) {
          element.status.damageReturned = false
        }
        if (element.status.marked) {
          element.status.marked = false
        }
        if (element.status.recentlyDead) {
          const logNote = `<span class='last-log red-bg dead-icon'><i>${element.player}</i> ${this.$t('god.logDeadText')}</span><em>${this.$t(element.roleType)}</em>`
          resultForDiscord += `
          💀 ${element.player} ${this.$t('god.logDeadText')}
          ----------
          `
          this.dashboard.lastNight.push(logNote)
        }
        if (element.status.recentlyRevived) {
          const logNote = `<span class='last-log green-bg revived-icon'><i>${element.player}</i> ${this.$t('god.logRevivedText')}</span>`
          resultForDiscord += `
          💚 ${element.player} ${this.$t('god.logRevivedText')}
          ----------
          `
          this.dashboard.lastNight.push(logNote)
        }
        if (element.status.recentlySilenced) {
          const logNote = `<span class='last-log blue-bg silenced-icon'><i>${element.player}</i> ${this.$t('god.logSilencedText')}</span>`
          resultForDiscord += `
          🔇 ${element.player} ${this.$t('god.logSilencedText')}
          ----------
          `
          this.dashboard.lastNight.push(logNote)
        }
        if (element.ability.defuser && element.status.dead) {
          this.hackAura(element.player)
        }
        element.status.recentlySilenced = false
        element.status.recentlyRevived = false
        element.status.recentlyDead = false
      })
      this.dashboard.targetData = {}
      this.dashboard.day = false
      if (!this.gameSettings.gameFinished) {
        if (this.dashboard.lastNight.length > 0) {
          this.dashboard.lastNightBox = true
          // Post Game Result To Discord
          this.postDiscord(resultForDiscord)
        }
      }
      this.dashboard.round++
      this.setActionsByPriority()

      // Post Night Phase To Discord
      if (!this.gameSettings.gameFinished) {
        const text = `${this.$t('thirdparty.discordNightPhase')} ${this.dashboard.round}`
        this.postDiscord(text)
      }
    },
    finishNight () {
      this.dashboard.lastNight = []
      let resultForDiscord = `
      
      📢 📢 📢 📢
      `

      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.status.recentlyDead) {
          const logNote = `<span class='last-log red-bg dead-icon'><i>${element.player}</i> ${this.$t('god.logDeadText')}</span><em>${this.$t(element.roleType)}</em>`
          resultForDiscord += `
          💀 ${element.player} ${this.$t('god.logDeadText')}
          ----------
          `
          this.dashboard.lastNight.push(logNote)
        }
        if (element.status.recentlyRevived) {
          const logNote = `<span class='last-log green-bg revived-icon'><i>${element.player}</i> ${this.$t('god.logRevivedText')}</span>`
          resultForDiscord += `
          💚 ${element.player} ${this.$t('god.logRevivedText')}
          ----------
          `
          this.dashboard.lastNight.push(logNote)
        }
        if (element.status.recentlySilenced) {
          const logNote = `<span class='last-log blue-bg silenced-icon'><i>${element.player}</i> ${this.$t('god.logSilencedText')}</span>`
          resultForDiscord += `
          🔇 ${element.player} ${this.$t('god.logSilencedText')}
          ----------
          `
          this.dashboard.lastNight.push(logNote)
        }
        // About Roles
        if (element.action.oneTime) {
          element.actionStatus = true
        } else {
          element.actionStatus = false
        }
        if (element.status.healed) {
          element.status.healed = false
        }
        if (element.status.antiSilenced) {
          element.status.antiSilenced = false
        }
        if (element.status.identityChecked) {
          element.status.identityChecked = false
        }
        if (element.status.roleChecked) {
          element.status.roleChecked = false
        }
        if (element.status.hacked) {
          element.status.hacked = false
        }
        element.status.recentlySilenced = false
        element.status.recentlyRevived = false
        element.status.recentlyDead = false
        element.vote = 0
        if (element.ability.justice && !element.status.dead && element.status.booleanAbility) {
          this.dashboard.justiceUsed = true
          element.status.booleanAbility = false
        }
        if (element.status.marked && element.status.dead) {
          this.gameSettings.selectedRoles.forEach((element) => {
            if (element.ability.prediction) {
              element.status.successMarks++
              // Calc Marks
              if (element.status.successMarks === this.chanceByPeopleNumber) {
                this.gameSettings.soloWinner = element
                this.gameSettings.soloWins = true
              }
            }
          })
        }
      })
      if (!this.gameSettings.gameFinished) {
        if (this.dashboard.lastNight.length > 0) {
          this.dashboard.lastNightBox = true
          // Post Event To Discord
          this.postDiscord(resultForDiscord)
        }
      }
      this.dashboard.day = true

      // Post Day Phase To Discord
      const text = `${this.$t('thirdparty.discordDayPhase')} ${this.dashboard.round}`
      this.postDiscord(text)
    }
  }
}
