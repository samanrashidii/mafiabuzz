export default {
  methods: {
    executeAction(player, target1, target2) {
      // 
      //   const attacker = info.ability
      //   const attackerID = info.id
      //   const attackerStatus = info.status
      //   const defender = info.targetInfo
      //   const defenderAbility = defender.ability
      //   const defenderID = defender.id
      //   const { linked } = defender.status
      //   const { healed } = defender.status
      //   const { shield } = defender.status
      //   const { hacked } = defender.status
      //   const { damageReturned } = defender.status
      //   // Check not being cupid and second selectmenu is turned off
      //   if (!(attacker.binder && this.dashboard.log.target2 === null)) {
      //     this.dashboard.log.id = this.dashboard.info.id
      //     this.dashboard.log.attacker = this.dashboard.info.player
      //     this.dashboard.log.action = this.dashboard.info.action
      //     this.dashboard.log.passive = this.dashboard.info.passive
      //     this.dashboard.log.ability = this.dashboard.info.ability
      //     this.dashboard.log.status = this.dashboard.info.status
      //     this.dashboard.log.actionIcon = this.dashboard.info.actionIcon
      //     this.dashboard.log.mafia = this.dashboard.info.mafia
      //     this.dashboard.log.targetInfo = this.dashboard.info.targetInfo
      //     this.dashboard.log.targetRole = this.dashboard.info.targetRole
      //     this.dashboard.log.targetMafia = this.dashboard.info.targetMafia
      //     this.dashboard.log.targetPassive = this.dashboard.info.targetPassive
      //     this.dashboard.log.targetID = this.dashboard.info.targetID

      //     this.dashboard.historyLog.push({ ...this.dashboard.log })

      //     this.gameSettings.selectedRoles.forEach((element, index) => {
      //       if (element.player === this.dashboard.log.attacker) {
      //         element.actionStatus = true
      //         // Yakuza Attacker
      //         if (attacker.playerSwapper && !element.status.healed) {
      //           element.status.dead = true
      //           element.status.recentlyDead = true
      //           element.action.oneTime = false
      //         }
      //         // Cupid Attacker
      //         if (attacker.binder) {
      //           element.action.oneTime = false
      //         }
      //         // Grandma Attacker Check if not Hacked ; Attacker not being Cupid or Hacker or Night King ;
      //         if (defenderAbility.returner && !hacked && !attacker.binder && !attacker.reviver && !attacker.hacker && element.id === attackerID) {
      //           element.status.dead = true
      //           element.status.recentlyDead = true
      //         }
      //       }
      //       // Yakuza Target ; Check if damageReturned ; Check if Hacked
      //       if (element.player === this.dashboard.log.target && attacker.playerSwapper && !damageReturned || element.player === this.dashboard.log.target && attacker.playerSwapper && damageReturned && hacked) {
      //         element.status.playerSwapped = true
      //         element.status.damageReturned = false
      //         element.status.shield = false
      //         element.name = 'replacingRoles.miniYakuza.name'
      //         element.icon = 'replacingRoles.miniYakuza.icon'
      //         element.description = 'replacingRoles.miniYakuza.description'
      //         element.actionStatus = false
      //         element.status.hasAction = false
      //         element.status.hasPassive = false
      //         element.action.action = 'common.None'
      //         element.action.passive = 'common.None'
      //       }
      //       // Cupid Targets
      //       if (attacker.binder) {
      //         if (element.player === this.dashboard.log.target) {
      //           element.status.linked = true
      //         }
      //         if (element.player === this.dashboard.log.target2) {
      //           element.status.linked = true
      //         }
      //       }
      //       // Night King
      //       if (attacker.reviver && element.player === this.dashboard.log.target) {
      //         // Revive Cupid Targets
      //         if (element.status.linked && element.status.dead) {
      //           element.status.linked = false
      //         }
      //         // Revive
      //         element.name = 'replacingRoles.skeleton.name'
      //         element.icon = 'replacingRoles.skeleton.icon'
      //         element.description = 'replacingRoles.skeleton.description'
      //         element.actionStatus = false
      //         element.status.hasAction = false
      //         element.status.hasPassive = false
      //         element.action.action = 'common.None'
      //         element.action.passive = 'common.None'
      //         element.status.invisible = false
      //         element.status.dead = false
      //         element.status.revived = true
      //         element.status.recentlyRevived = true
      //       }
      //       // Police
      //       if (attacker.playerChecker && element.id === defenderID) {
      //         element.status.identityChecked = true
      //       }
      //       // Chef
      //       if (attacker.roleChecker && element.id === defenderID) {
      //         element.status.roleChecked = true
      //       }
      //       // Hacker Target
      //       if (attacker.hacker && element.id === defenderID) {
      //         element.status.hacked = true
      //       }
      //       // Grandma Being Target Check if not Hacked ; Attacker not being Cupid or Hacker ;
      //       if (defenderAbility.returner && element.id === defenderID && !attacker.binder && !attacker.hacker) {
      //         if (attackerStatus.linked) {
      //           this.gameSettings.selectedRoles.forEach((element) => {
      //             if (element.status.linked) {
      //               element.status.dead = true
      //               element.status.recentlyDead = true
      //             }
      //           });
      //         }
      //         this.passiveCalc(element, attackerStatus)
      //       }
      //       // Godfather and Mafia Targets -- Kill if not Healed
      //       if (attacker.killer && !healed) {
      //         // Check not damageReturned
      //         if (!damageReturned || damageReturned && hacked) {
      //           if (element.player === this.dashboard.log.target) {
      //             // Bulletproof; Check Has shield ; Check if not Hacked
      //             if (shield && !hacked) {
      //               this.passiveCalc(element)
      //               element.status.shield = false
      //             } else {
      //               element.status.dead = true
      //               element.status.recentlyDead = true
      //             }
      //           }
      //           // Night King Targets
      //           if (defenderAbility.reviver && element.id === defenderID) {
      //             this.gameSettings.selectedRoles.forEach((element) => {
      //               if (element.status.revived) {
      //                 element.status.dead = true
      //                 element.status.recentlyDead = true
      //               }
      //             });
      //           }
      //           // Bomb Targets | Passive
      //           if (defenderAbility.detonator && element.id === defenderID) {
      //             this.passiveCalc(element)
      //           }
      //           // Cupid Targets | Status
      //           if (linked && !element.status.healed && element.id === defenderID) {
      //             element.status.dead = true
      //             element.status.recentlyDead = true
      //             this.gameSettings.selectedRoles.forEach((element) => {
      //               if (element.status.linked) {
      //                 element.status.dead = true
      //                 element.status.recentlyDead = true
      //               }
      //             });
      //           }
      //         }
      //       }
      //       // Ruspy Targets ; Check not damageReturned
      //       if (attacker.silencer && !damageReturned || attacker.silencer && damageReturned && hacked) {
      //         if (element.player === this.dashboard.log.target) {
      //           element.status.silenced = true
      //           element.status.recentlySilenced = true
      //         }
      //       }
      //       // Doctor Targets ; Check not damageReturned
      //       if (attacker.healer && !damageReturned || attacker.healer && damageReturned && hacked) {
      //         if (element.player === this.dashboard.log.target) {
      //           element.status.healed = true
      //         }
      //       }
      //     });
        // Notifications
        if (this.actionTarget1.length > 0 && this.actionTarget1 !== null) {
          this.log.mainText = `<span>${this.$t(player.action.action)}</span> ${this.$t('god.logMainText')}<strong>${target1}</strong>`
          this.log.image = player.actionIcon
          this.$notify({ 
            group: 'log', 
            type: 'success', 
            title: `${this.log.image}`,
            text: `${this.log.mainText}`,       
          })
          this.nextAction()
        } else{
          this.$notify({ 
            group: 'log', 
            type: 'error', 
            title: `error.svg`,
            image: `${this.log.image}`,
            text: `${this.$t('god.errorChoosePlayer')}`,
          })
        }
      // }
    },
  },
};
