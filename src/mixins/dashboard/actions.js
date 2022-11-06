export default {
  methods: {
    activeLink (target) {
      let linkTarget = ''
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player !== target &&
        this.gameSettings.selectedRoles[i].status.linked) {
          linkTarget = i
          this.gameSettings.selectedRoles[i].status.linked = false
        }
      }
      this.kill(this.gameSettings.selectedRoles[linkTarget].player)
    },
    antiSilence (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.antiSilenced = true
        }
      })
    },
    checkIdentity (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.identityChecked = true
          this.actionLog(element, 'checkIdentity')
        }
      })
    },
    changeIdentity (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.mafia = !element.mafia
          element.status.identityChanged = true
        }
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
         !this.gameSettings.selectedRoles[i].status.hacked) {
          return true
        }
      }
    },
    checkReturner (target) {
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target &&
        !this.gameSettings.selectedRoles[i].status.dead &&
        this.gameSettings.selectedRoles[i].ability.returner &&
        !this.gameSettings.selectedRoles[i].status.hacked) {
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
        if (el.status.minion && !el.status.healed) {
          this.kill(el.player)
          el.status.minion = false
        }
      })
      this.passiveActive(element)
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
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.hacked = true
          if (forever) {
            element.status.hackedForever = true
          }
        }
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
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.healed = true
        }
      })
    },
    link (target1, target2) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target1) {
          element.status.linked = true
        }
        if (element.player === target2) {
          element.status.linked = true
        }
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
        if (element.player === killTarget && !element.status.healed) {
          // Check if target has shield
          if (element.status.shield && !element.status.hacked && killType !== 'straight') {
            this.passiveActive(element)
            element.status.shield = false
          // Check if target has thick ability
          } else if (element.status.thick && !element.status.poisoned && killType !== 'straight') {
            element.status.poisoned = true
          // Check if target has revenge ability
          } else if (element.ability.revenge && !this.dashboard.avenger) {
            if (!element.status.dayOnly && !this.dashboard.day) {
              this.deadWatcher(true, element.player)
            } else {
              if (this.dashboard.day) {
                this.deadWatcher(true, element.player)
              } else {
                element.status.dead = true
                element.status.recentlyDead = true
              }
            }
          // Check if target is alive
          } else if (!element.status.dead) {
            element.status.dead = true
            element.status.recentlyDead = true
            element.status.recentlyRevived = false
          }
          // Check if target is linked to another person
          if (element.status.linked) {
            element.status.linked = false
            this.activeLink(element.player)
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
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          this.trackingStatus(element.status)
          if (element.ability.reviver) {
            this.destroyMinions(element)
          }
          element.name = this.replacingRoles.miniYakuza.name
          element.icon = this.replacingRoles.miniYakuza.icon
          element.description = this.replacingRoles.miniYakuza.description
          element.action = this.replacingRoles.miniYakuza.action
          element.actionStatus = this.replacingRoles.miniYakuza.actionStatus
          element.ability = this.replacingRoles.miniYakuza.ability
          element.status = this.replacingRoles.miniYakuza.status
          element.killPriority = this.replacingRoles.miniYakuza.mafia
          element.potentialKiller = this.replacingRoles.miniYakuza.mafia
          element.mafia = this.replacingRoles.miniYakuza.mafia
          element.status.linked = this.dashboard.freezeStatus.linked
          element.status.hacked = this.dashboard.freezeStatus.hacked
          element.status.healed = this.dashboard.freezeStatus.healed
          element.status.antiSilenced = this.dashboard.freezeStatus.antiSilenced
          element.status.silenced = this.dashboard.freezeStatus.silenced
          element.status.recentlySilenced = this.dashboard.freezeStatus.recentlySilenced
          element.status.recentlyDead = this.dashboard.freezeStatus.recentlyDead
          element.status.recentlyRevived = this.dashboard.freezeStatus.recentlyRevived
        }
      })
    },
    revive (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.name = this.replacingRoles.skeleton.name
          element.icon = this.replacingRoles.skeleton.icon
          element.description = this.replacingRoles.skeleton.description
          element.action = this.replacingRoles.skeleton.action
          element.actionStatus = this.replacingRoles.skeleton.actionStatus
          element.ability = this.replacingRoles.skeleton.ability
          element.status = this.replacingRoles.skeleton.status
          element.status.recentlyRevived = true
          element.status.recentlyDead = false
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
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target && !element.status.antiSilenced) {
          element.status.silenced = true
          element.status.recentlySilenced = true
        }
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
