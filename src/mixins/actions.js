export default {
  methods: {
    activateLink (target) {
      let linkTarget = ''
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player !== target && this.gameSettings.selectedRoles[i].status.link) {
          linkTarget = i
          this.gameSettings.selectedRoles[i].status.link = false
        }
      }
      this.kill(this.gameSettings.selectedRoles[linkTarget].player)
    },
    antiSilence (target) {
      this.setStatus(target, {
        silence: false,
        recentlySilenced: false
      })
    },
    checkIdentity (target) {
      const targetObject = this.gameSettings.selectedRoles.filter(role => role.player === target)[0]
      this.actionLog(targetObject, 'checkIdentity')
    },
    changeIdentity (target) {
      const targetObject = this.gameSettings.selectedRoles.filter(role => role.player === target)[0]
      this.setStatus(target, {
        identityChanged: true,
        fakeIdentity: !targetObject.status.fakeIdentity
      })
    },
    checkRole (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.roleChecked = true
          this.gameSettings.viewerItems.push(element)
          this.gameSettings.roleViewer = true
        }
      })
    },
    checkDetonator (target) {
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target &&
         this.gameSettings.selectedRoles[i].ability.detonator &&
         !this.gameSettings.selectedRoles[i].status.hack) {
          return true
        }
      }
    },
    checkReturner (target) {
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target &&
        !this.gameSettings.selectedRoles[i].status.dead &&
        this.gameSettings.selectedRoles[i].ability.returner &&
        !this.gameSettings.selectedRoles[i].status.hack) {
          return true
        }
      }
    },
    damageReturn (player, target) {
      this.kill(player)
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          this.passiveActive(element)
          element.status.damageReturned = true
        }
      })
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
    deadWatcher (value, player) {
      this.dashboard.revengeKillBox = value
      this.dashboard.avenger = player
      this.SetDashboard(this.dashboard)
    },
    detonate (target) {
      let mainTarget = ''
      let prevTarget = ''
      let nextTarget = ''
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target) {
          mainTarget = i
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
          this.gameSettings.selectedRoles[i].status.detonated = true
        }
      }
      this.passiveActive(this.gameSettings.selectedRoles[mainTarget])
      this.kill(this.gameSettings.selectedRoles[prevTarget].player)
      this.kill(this.gameSettings.selectedRoles[nextTarget].player)
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
          } else if (element.status.thick && !element.status.poisoned && killType !== 'straight') {
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
    },
    predict (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.marked = true
        }
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
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.dead = false
          element.status.recentlyRevived = true
          element.status.recentlyDead = false
        }
      })
    },
    silence (target) {
      this.setStatus(target, {
        silence: true,
        recentlySilenced: true
      })
    },
    bust (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.busted = true
        }
      })
    }
  }
}
