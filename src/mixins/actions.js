export default {
  methods: {
    checkDetonator (target) {
      return this.checkStatus(target, {
        readyToDetonate: true,
        hack: false
      })
    },
    checkKillReturner (target) {
      return this.checkStatus(target, {
        returnKill: true,
        hack: false
      })
    },
    checkIdentity (name) {
      const targetObject = this.getRoleObjectByName(name)
      this.actionLog(targetObject, 'checkIdentity')
    },
    checkRole (name) {
      const targetObject = this.getRoleObjectByName(name)
      targetObject.status.roleChecked = true
      this.gameSettings.viewerItems.push(targetObject)
      this.gameSettings.roleViewer = true
    },
    activateLink (name) {
      const linkTarget = this.gameSettings.selectedRoles.filter((role) => role.player !== name && role.status.link)[0]
      this.kill(linkTarget.player)
    },
    changeIdentity (name) {
      const targetObject = this.getRoleObjectByName(name)
      this.setStatus(name, {
        identityChanged: true,
        fakeIdentity: !targetObject.status.fakeIdentity
      })
    },
    antiSilence (name) {
      this.setStatus(name, {
        silence: false,
        recentlySilenced: false
      })
    },
    damageReturn (player, target) {
      this.kill(player)
      const targetObject = this.getRoleObjectByName(target)
      this.passiveActive(targetObject)
    },
    destroyMinions (element) {
      this.gameSettings.selectedRoles.forEach((el) => {
        if (el.status.minion && !el.status.heal) {
          this.kill(el.player)
          el.status.minion = false
        }
      })
      this.passiveActive(element)
    },
    deadWatcher (value, name) {
      this.dashboard.revengeKillBox = value
      this.dashboard.avenger = name
      this.SetDashboard(this.dashboard)
    },
    detonate (target) {
      // Get Index of main target and siblings
      const mainTargetIndex = this.gameSettings.selectedRoles.findIndex(role => role.player === target)
      // Check if index is 0 set it to length of array - 1
      const prevIndex = mainTargetIndex === 0 ? this.gameSettings.selectedRoles.length - 1 : mainTargetIndex - 1
      // Check if index is equal to array's length set it to 0
      const nextIndex = mainTargetIndex === this.gameSettings.selectedRoles.length ? 0 : mainTargetIndex + 1
      // Get Index of main target and siblings
      const mainTarget = this.getRoleObjectByIndex(mainTargetIndex)
      const prevTarget = this.getRoleObjectByIndex(prevIndex)
      const nextTarget = this.getRoleObjectByIndex(nextIndex)
      // Alert Passive Activation
      this.passiveActive(mainTarget)
      // Kill siblings
      this.kill(prevTarget.player)
      this.kill(nextTarget.player)
    },
    explosion (player) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (!(element.player === player && element.ability.explosioner)) {
          this.kill(element.player, 'straight')
        }
      })
    },
    hack (target, forever) {
      this.setStatus(target, {
        hack: true,
        hackForever: forever ? true : false
      })
    },
    hackAura (player) {
      let prevTarget = ''
      let nextTarget = ''
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === player) {
          if (i === this.gameSettings.selectedRoles.length - 1) {
            prevTarget = i - 1
            nextTarget = 0
          } else if (i === 0) {
            prevTarget = this.gameSettings.selectedRoles.length - 1
            nextTarget = i + 1
          } else {
            prevTarget = i - 1
            nextTarget = i + 1
          }
        }
      }
      this.hack(this.gameSettings.selectedRoles[prevTarget].player)
      this.hack(this.gameSettings.selectedRoles[nextTarget].player)
    },
    heal (target) {
      this.setStatus(target, {
        heal: true
      })
    },
    link (target1, target2) {
      this.setStatus(target1, {
        link: true
      })
      this.setStatus(target2, {
        link: true
      })
    },

    predict (target) {
      this.setStatus(target, {
        marked: true
      })
    },
    replacePlayer (target, replacer) {
      this.kill(replacer)
      this.gameSettings.selectedRoles.forEach((element, index) => {
        if (element.player === target) {
          const newCharacter = {
            ...element,
            ...this.replacingRoles.miniYakuza
          }
          this.gameSettings.selectedRoles[index] = newCharacter
        }
      })
    },
    revive (target) {
      this.gameSettings.selectedRoles.forEach((element, index) => {
        if (element.player === target) {
          const newCharacter = {
            ...element,
            ...this.replacingRoles.skeleton
          }
          newCharacter.status.recentlyRevived = true
          newCharacter.status.recentlyDead = false
          this.gameSettings.selectedRoles[index] = newCharacter
        }
      })
    },
    resurrect (target) {
      this.setStatus(target, {
        dead: false,
        recentlyRevived: true,
        recentlyDead: false
      })
    },
    silence (target) {
      this.setStatus(target, {
        silence: true,
        recentlySilenced: true
      })
    },
    bust (target) {
      this.setStatus(target, {
        busted: true
      })
    },
    kill (target, killType, player) {
      let checkLoyalty = []
      if (player) {
        checkLoyalty = this.gameSettings.selectedRoles.filter(role =>  player.ability.loyalty && role.player === target && player.mafia === role.mafia && player.solo === role.solo)
      }
      // Check If DeadMagnet is in the game, He should be the target
      const checkDeadMagnet = this.gameSettings.selectedRoles.filter(el => el.ability.deadMagnet && el.mafia && !el.status.dead)
      const checkKillerPlayer = this.gameSettings.selectedRoles.filter(el => el.player === target && el.ability.killer && el.mafia && !el.status.dead)
      const hasLoyalty = checkLoyalty.length > 0
      const hasDeadMagnet = checkDeadMagnet.length > 0
      const isTargetTheKiller = checkKillerPlayer.length > 0
      let killTarget
      if (hasDeadMagnet && isTargetTheKiller) {
        killTarget = checkDeadMagnet[0].player
      } else {
        if (hasLoyalty) {
          killTarget = player.player
        } else {
          killTarget = target
        }
      }
      this.gameSettings.selectedRoles.forEach((element) => {
        // Check if target is not healed
        if (element.player === killTarget && !element.status.heal) {
          // Check if target has shield
          if (element.status.shield && !element.status.hack && killType !== 'straight') {
            this.passiveActive(element)
            element.status.shield = false
          // Check if target has thick ability
          } else if (element.status.thick && killType !== 'straight') {
            element.status.poisoned = true
          // Check if target has revenge ability
          } else if (element.ability.revenge && !this.dashboard.avenger) {
            element.status.dead = true
            element.status.recentlyDead = true
            // Check if target ability is usable only in nights
            if (!element.status.dayOnly && !this.dashboard.day) {
              this.deadWatcher(true, element.player)
            } else if (element.status.dayOnly && this.dashboard.day) {
              // Check if target ability is usable only in days
              this.deadWatcher(true, element.player)
            }
          // Check if target is alive
          } else if (!element.status.dead) {
            element.status.dead = true
            element.status.recentlyDead = true
            element.status.recentlyRevived = false
          }
          // Check if target is linked to another person
          if (element.status.link) {
            element.status.link = false
            this.activateLink(element.player)
          }
          // Check if target is a reviver character
          if (element.ability.reviver) {
            this.destroyMinions(element)
          }
          // Check if target is detonatable
          if (this.checkDetonator(element.player)) {
            this.detonate(element.player)
          }
        }
      })
    }
  }
}
