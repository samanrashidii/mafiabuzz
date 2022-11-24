export default {
  methods: {
    changePhase (day) {
      this.dashboard.lastNight = []
      if (!day) {
        // Log Actions
        this.saveTotalHistory(this.dashboard.historyLog)
        // Reset Night Stuff
        this.dashboard.actionBox.forEach((role, index) => {
          localStorage.removeItem(`action_${index}`)
        })
        this.dashboard.actionBox = []
        this.dashboard.actionProgress = 0
        this.dashboard.voteKill = false
        // Finish Night phase
        this.finishNight()
      } else if (this.dashboard.round === 0) {
        // Finish Day phase
        this.finishDay()
      } else {
        // Ask Vote before change phase
        this.dashboard.lastPhaseAction = true
      }
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
    },
    finishDay () {
      // Reset Statuses
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.status.busted) {
          role.status.inJail = true
        }
        if (role.status.poisoned) {
          this.kill(role.player)
        }
        if (role.status.silence) {
          role.status.silence = false
        }
        if (role.status.marked) {
          role.status.marked = false
        }
      })
      this.logEventsToUser()
      this.dashboard.targetData = {}
      this.dashboard.day = false
      this.dashboard.round++
      this.setActionsByPriority()
      // Post Start of Night Phase To Discord
      const text = `${this.$t('thirdparty.discordNightPhase')} ${this.dashboard.round}`
      this.postDiscord(text)
    },
    finishNight () {
      this.logEventsToUser()
      this.gameSettings.selectedRoles.forEach((role) => {
        // Reset Statuses
        if (role.status.actionLimit === 0) {
          // User done his actions
          role.hasDoneAction = true
        } else {
          // User already has pending actions
          role.hasDoneAction = false
        }
        if (role.status.heal) {
          role.status.heal = false
        }
        if (role.status.inJail) {
          role.status.busted = false
          role.status.inJail = false
        }
        if (role.status.identityChanged) {
          role.status.fakeIdentity = !role.status.fakeIdentity
          role.status.identityChanged = false
        }
        if (role.status.roleChecked) {
          role.status.roleChecked = false
        }
        if (role.status.hack && !role.status.hackForever) {
          role.status.hack = false
        }
        if (role.status.hackForever) {
          role.status.hack = true
        }
        role.status.recentlySilenced = false
        role.status.recentlyRevived = false
        role.status.recentlyDead = false
        role.vote = 0
        if (role.ability.justice && !role.status.dead && role.status.booleanAbilityUsed) {
          this.dashboard.justiceUsed = true
          role.status.booleanAbilityUsed = false
        }
        if (role.ability.searching && role.status.booleanAbilityUsed) {
          this.gameSettings.searchingUsed = true
          role.status.booleanAbilityUsed = false
        }
        if (role.status.marked && role.status.dead) {
          this.gameSettings.selectedRoles.forEach((role) => {
            if (role.ability.prediction) {
              role.status.successMarks++
              // Calc Marks
              if (role.status.successMarks === this.chanceByPeopleNumber) {
                this.gameSettings.soloWinner = role
                this.gameSettings.soloWins = true
              }
            }
          })
        }
      })
      this.dashboard.day = true
      // Post Start of Day Phase To Discord
      const text = `${this.$t('thirdparty.discordDayPhase')} ${this.dashboard.round}`
      this.postDiscord(text)
    },
    logEventsToUser () {
      let resultForDiscord = `
  
      📢 📢 📢 📢
      `
      const lastNightEvents = []
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.status.recentlyDead) {
          let currentIdentity = this.$t('common.Citizen')
          if (role.mafia) {
            currentIdentity = this.$t('common.Mafia')
          }
          const logNote = `<span class='last-log red-bg dead-icon'><i>${role.player}</i> ${this.$t('god.logDeadText')}</span><em>${currentIdentity}</em>`
          resultForDiscord += `
          💀 ${role.player} ${this.$t('god.logDeadText')}
          ----------
          `
          lastNightEvents.push(logNote)
        }
        if (role.status.recentlyRevived) {
          const logNote = `<span class='last-log green-bg revived-icon'><i>${role.player}</i> ${this.$t('god.logRevivedText')}</span>`
          resultForDiscord += `
          💚 ${role.player} ${this.$t('god.logRevivedText')}
          ----------
          `
          lastNightEvents.push(logNote)
        }
        if (role.status.recentlySilenced) {
          const logNote = `<span class='last-log blue-bg silenced-icon'><i>${role.player}</i> ${this.$t('god.logSilencedText')}</span>`
          resultForDiscord += `
          🔇 ${role.player} ${this.$t('god.logSilencedText')}
          ----------
          `
          lastNightEvents.push(logNote)
        }
      })
      if (lastNightEvents.length > 0) {
        this.dashboard.lastNight = lastNightEvents
        this.dashboard.lastNightBox = true
        // Post Game Result To Discord
        this.postDiscord(resultForDiscord)
      }
    }
  }
}
