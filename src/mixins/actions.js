export default {
  methods: {
    checkDetonator (target) {
      const output = this.checkStatus(target, {
        readyToDetonate: true,
        hack: false
      })
      return output
    },
    checkHackBomber (target) {
      const output = this.checkStatus(target, {
        hackBomber: true,
        hack: false
      })
      return output
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
      this.setStatus(name, {
        link: false
      })
      this.setStatus(linkTarget.player, {
        link: false
      })
      this.kill(linkTarget.player)
    },
    antiSilence (name) {
      this.setStatus(name, {
        silence: false,
        recentlySilenced: false
      })
    },
    changeIdentity (name) {
      const targetObject = this.getRoleObjectByName(name)
      this.setStatus(name, {
        identityChanged: true,
        fakeIdentity: !targetObject.status.fakeIdentity
      })
    },
    destroyMinions (target) {
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.status.minion) {
          this.kill(role.player)
          role.status.minion = false
        }
      })
      this.passiveActive(target)
    },
    deadWatcher (value, name) {
      this.dashboard.revengeKillBox = value
      this.dashboard.avenger = name
      this.SetDashboard(this.dashboard)
    },
    deflectAbility (target) {
      this.setActionInUseStatus(target, {
        deflectAbility: true
      })
    },
    detonate (target) {
      const allTargets = this.getSiblingTargets(target)
      // Alert Passive Activation
      this.passiveActive(allTargets.mainTarget)
      // Kill siblings
      this.kill(allTargets.prevTarget.player)
      this.kill(allTargets.nextTarget.player)
    },
    detonateHackBomb (target) {
      const allTargets = this.getSiblingTargets(target)
      // Alert Passive Activation
      this.passiveActive(allTargets.mainTarget)
      // Kill siblings
      this.hack(allTargets.prevTarget.player, true)
      this.hack(allTargets.nextTarget.player, true)
    },
    empowerAbility (target) {
      const targetObject = this.getRoleObjectByNameInAction(target)
      this.setActionInUseStatus(target, {
        empowered: true,
        targetNumbers: targetObject.status.targetNumbers * 2
      })
    },
    explosion (player) {
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.player !== player) {
          this.kill(role.player, 'straight')
        }
      })
    },
    hack (target, forever) {
      const isAntiHack = this.checkStatus(target, {
        antiHack: true
      })
      if (!isAntiHack) {
        this.setStatus(target, {
          hack: true,
          hackForever: forever ? true : false
        })
      }
    },
    hackForever (target) {
      this.setStatus(target, {
        hackForever: true
      })
    },
    heal (target) {
      this.setStatus(target, {
        heal: true
      })
    },
    link (target) {
      this.setStatus(target, {
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
      this.gameSettings.selectedRoles.forEach((role, index) => {
        if (role.player === target) {
          const newCharacter = {
            ...role,
            ...this.replacingRoles.miniYakuza,
            lastRoleInfo: role.info,
            lastRoleIcon: role.icon
          }
          this.gameSettings.selectedRoles[index] = newCharacter
        }
      })
    },
    returnKill (player, target) {
      const targetObject = this.getRoleObjectByName(target)
      this.kill(player)
      this.passiveActive(targetObject)
    },
    reviveSkeletons (target) {
      this.gameSettings.selectedRoles.forEach((role, index) => {
        if (role.player === target) {
          const newCharacter = {
            ...role,
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
      const checkDeadMagnet = this.gameSettings.selectedRoles.filter(role => role.status.deadMagnet && !role.status.dead)
      const checkKillerPlayer = this.gameSettings.selectedRoles.filter(role => role.player === target && role.ability.killer && role.mafia && !role.status.dead)
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
      this.gameSettings.selectedRoles.forEach((role) => {
        // Check if target is not healed
        if (role.player === killTarget && !role.status.heal) {
          // Check if target has shield
          if (role.status.shield && !role.status.hack && killType !== 'straight') {
            this.passiveActive(role)
            role.status.shield = false
          // Check if target has thick ability
          } else if (role.status.thick && killType !== 'straight') {
            role.status.poisoned = true
          // Check if target has revenge ability
          } else if (role.ability.revenge && !this.dashboard.avenger) {
            role.status.dead = true
            role.status.recentlyDead = true
            // Check if target ability is usable only in nights
            if (!role.status.dayOnly && !this.dashboard.day) {
              this.deadWatcher(true, role.player)
            } else if (role.status.dayOnly && this.dashboard.day) {
              // Check if target ability is usable only in days
              this.deadWatcher(true, role.player)
            }
          // Check if target is immortal
          } else if (role.status.immortal && killType !== 'straight') {
            this.passiveActive(role)
          // Check if target is alive
          } else if (!role.status.dead) {
            role.status.dead = true
            role.status.recentlyDead = true
            role.status.recentlyRevived = false
          }
          if (role.status.recentlyDead) {
            // Check if target is linked to another person
            if (role.status.link) {
              this.activateLink(role.player)
            }
            // Check if target is a reviver character
            if (role.ability.reviver) {
              this.destroyMinions(role)
            }
            // Check if target is detonatable
            if (this.checkDetonator(role.player)) {
              this.detonate(role.player)
            }
            // Check if target is hack detonatable
            if (this.checkHackBomber(role.player)) {
              this.detonateHackBomb(role.player)
            }
          }
        }
      })
    }
  }
}
