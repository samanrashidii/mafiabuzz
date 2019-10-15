export default {
  methods: {
    activeLink(target) {
      let linkTarget = ''
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player !== target
        && this.gameSettings.selectedRoles[i].status.linked
        && !this.gameSettings.selectedRoles[i].status.healed) {
          linkTarget = i
          this.gameSettings.selectedRoles[i].status.linked = false;
        }
      }
      this.kill(this.gameSettings.selectedRoles[linkTarget].player)
    },
    destroyMinions(element){
      this.gameSettings.selectedRoles.forEach((el) => {
        if (el.status.minion && !el.status.healed) {
          this.kill(el.player)
          el.status.minion = false
        }
      });
      this.passiveActive(element)
    },
    checkIdentity(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.identityChecked = true
          this.actionLog(element, 'checkIdentity')
        }
      });
    },
    checkRole(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.roleChecked = true
          this.actionLog(element, 'checkRole')
        }
      });
    },
    checkDetonator(target) {
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target
         && this.gameSettings.selectedRoles[i].ability.detonator
         && !this.gameSettings.selectedRoles[i].status.hacked) {
          return true;
        }
      }
    },
    checkReturner(target) {
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target
                   && this.gameSettings.selectedRoles[i].ability.returner
                   && !this.gameSettings.selectedRoles[i].status.hacked) {
          return true;
        }
      }
    },
    detonate(target) {
      let mainTarget = ''
      let prevTarget = ''
      let nextTarget = ''
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target) {
          mainTarget = i
          if (i === this.gameSettings.selectedRoles.length - 1) {
            prevTarget = i - 1
            nextTarget = 0;
          } else if (i === 0) {
            prevTarget = this.gameSettings.selectedRoles.length - 1;
            nextTarget = i + 1
          } else {
            prevTarget = i - 1
            nextTarget = i + 1
          }
          this.gameSettings.selectedRoles[i].status.detonated = true;
        }
      }
      this.passiveActive(this.gameSettings.selectedRoles[mainTarget])
      this.kill(this.gameSettings.selectedRoles[prevTarget].player)
      this.kill(this.gameSettings.selectedRoles[nextTarget].player)
    },
    damageReturn(player, target) {
      this.kill(player);
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          this.passiveActive(element)
          element.status.damageReturned = true
        }
      });
    },
    hack(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.hacked = true
        }
      });
    },
    heal(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.healed = true
        }
      });
    },
    link(target1, target2) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target1) {
          element.status.linked = true;
        }
        if (element.player === target2) {
          element.status.linked = true
        }
      });
    },
    kill(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target && !element.status.healed) {
          if (element.status.shield && !element.status.hacked) {
            this.passiveActive(element)
            element.status.shield = false
          } else {
            element.status.dead = true
            element.status.recentlyDead = true
          }
          if (element.status.linked) {
            element.status.linked = false
            this.activeLink(element.player)
          }
          if (element.ability.reviver) {
            this.destroyMinions(element)
          }
          if (this.checkDetonator(element.player)) {
            this.detonate(element.player)
          }
        }
      });
    },
    replacePlayer(target, replacer) {
      this.kill(replacer);
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          this.trackingStatus(element.status)
          element.name = this.replacingRoles.miniYakuza.name
          element.icon = this.replacingRoles.miniYakuza.icon
          element.alt = this.replacingRoles.miniYakuza.alt
          element.description = this.replacingRoles.miniYakuza.description
          element.action = this.replacingRoles.miniYakuza.action
          element.actionStatus = this.replacingRoles.miniYakuza.actionStatus
          element.ability = this.replacingRoles.miniYakuza.ability
          element.status = this.replacingRoles.miniYakuza.status
          element.status.linked = this.dashboard.freezeStatus.linked
          element.status.hacked = this.dashboard.freezeStatus.hacked
          element.status.healed = this.dashboard.freezeStatus.healed
          element.status.silenced = this.dashboard.freezeStatus.silenced
        }
      });
    },
    resurrect(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.name = this.replacingRoles.skeleton.name
          element.icon = this.replacingRoles.skeleton.icon
          element.alt = this.replacingRoles.skeleton.alt
          element.description = this.replacingRoles.skeleton.description
          element.action = this.replacingRoles.skeleton.action
          element.actionStatus = this.replacingRoles.skeleton.actionStatus
          element.ability = this.replacingRoles.skeleton.ability
          element.status = this.replacingRoles.skeleton.status
          element.status.recentlyRevived = true
        }
      });
    },
    revive(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.dead = false
          element.status.recentlyRevived = true
        }
      });
    },
    silence(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.silenced = true
          element.status.recentlySilenced = true
        }
      });
    },
  },
};
