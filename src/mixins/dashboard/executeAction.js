export default {
  methods: {
    executeAction (player, target1, target2, index) {
      // Action Log
      if (this.useAbility) {
        this.dashboard.log.mainText = `<span>${this.$t(player.action.action)}</span> ${this.$t('god.logSideText')}`
      } else {
        this.dashboard.log.mainText = `<span>${this.$t(player.action.action)}</span> ${this.$t('god.logMainText')}<strong>${target1}</strong>`
      }
      this.dashboard.log.image = player.actionIcon
      this.saveHistory(this.dashboard.log.image, this.dashboard.log.mainText)

      if ((!player.ability.binder && this.actionTarget1 !== null) ||
        (player.ability.binder && this.actionTarget1 !== null && this.actionTarget2 !== null) ||
        (this.actionTarget1 === null && this.actionTarget2 === null && this.useAbility)) {
        // For All Each
        this.gameSettings.selectedRoles.forEach((el) => {
          // Shared
          if (el.player === player.player) {
            el.actionStatus = true
            // BooleanAbility
            if (this.useAbility) {
              if (el.ability.justice) {
                el.status.booleanAbility = true
              }
              if (el.ability.searching) {
                el.status.booleanAbility = true
              }
            }
          }
          // Check One Time Action
          if (el.player === player.player && el.status.hasOneAction) {
            el.action.oneTime = true
          }
          // Calc Hits
          if (el.player === target1 || el.player === target2) {
            el.status.hitByAction++
            if (el.ability.explosioner && this.peopleInSquareNumber === el.status.hitByAction) {
              this.explosion(el.player)
              this.gameSettings.soloWinner = el
              this.gameSettings.soloWins = true
            }
          }
          // Ability Counter
          if (el.player === player.player && player.status.actionLimit > 0) {
            el.status.actionLimit = el.status.actionLimit - 1
            if (el.status.actionLimit === 0) {
              el.status.hasAction = false
            }
          }
        })

        if (!player.status.hacked) {
          if (!player.ability.hacker &&
           !player.ability.binder &&
           !player.ability.prediction &&
           this.checkReturner(target1)) {
            this.damageReturn(player.player, target1)
          }
          // Binder
          if (player.ability.binder) {
            this.link(target1, target2)
          }
          // Hacker
          if (player.ability.hacker) {
            this.hack(target1)
          }
          // Killer
          if (player.ability.killer) {
            this.kill(target1, '', player)
          }
          // Identity Checker
          if (player.ability.identityChecker) {
            this.checkIdentity(target1)
          }
          // Role Checker
          if (player.ability.roleChecker) {
            this.checkRole(target1)
          }
          // Replacer
          if (player.ability.replacer) {
            this.replacePlayer(target1, player.player)
          }
          // Reviver
          if (player.ability.reviver) {
            this.resurrect(target1)
          }
          // Silencer
          if (player.ability.silencer) {
            this.silence(target1)
          }
          // Healer
          if (player.ability.healer) {
            this.heal(target1)
          }
          // Healer
          if (player.ability.antiSilencer) {
            this.antiSilence(target1)
          }
          // Magician
          if (player.ability.magician) {
            const dice = this.dice(4)
            if (dice === 1) {
              this.kill(target1)
            } else if (dice === 2) {
              this.silence(target1)
            } else if (dice === 3) {
              this.kill(player.player)
            } else if (dice === 4) {
              this.silence(player.player)
            }
          }
          // Psychic
          if (player.ability.prediction) {
            this.predict(target1)
          }
        }
        this.$notify({
          group: 'log',
          type: 'success',
          title: `${this.dashboard.log.image}`,
          text: `${this.dashboard.log.mainText}`,
          duration: 4000
        })
        this.nextAction(index)
      } else {
        // Error Log
        this.$notify({
          group: 'log',
          type: 'error',
          title: 'error.svg',
          image: `${this.dashboard.log.image}`,
          text: `${this.$t('god.errorChoosePlayer')}`
        })
      }
    }
  }
}
