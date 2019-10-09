export default {
  methods: {
    checkIdentity(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.identityChecked = true
        }
      });
    },
    checkRole(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.roleChecked = true
        }
      });
    },
    checkDetonator(target) {
      for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
        if (this.gameSettings.selectedRoles[i].player === target
                   && this.gameSettings.selectedRoles[i].ability.detonator
                   && !this.gameSettings.selectedRoles[i].status.hacked
                   && !this.gameSettings.selectedRoles[i].status.healed) {
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
          if (i === this.gameSettings.selectedRoles.length) {
            prevTarget = i - 1
            nextTarget = 0;
          } else if (i === 0) {
            prevTarget = this.gameSettings.selectedRoles.length;
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
          if (element.status.shield) {
            element.status.shield = false
          } else {
            element.status.dead = true
          }
          if (element.status.linked) {
            this.gameSettings.selectedRoles.forEach((el) => {
              if (el.status.linked && !el.status.healed) {
                el.status.dead = true
                el.status.linked = false
              }
            });
          }
          if (element.ability.reviver) {
            this.gameSettings.selectedRoles.forEach((el) => {
              if (el.status.minion && !el.status.healed) {
                el.status.dead = true
                el.status.minion = false
              }
            });
          }
          if (!element.status.shield) {
            this.gameSettings.selectedRoles.forEach((el) => {
              if (el.status.linked && !el.status.healed) {
                el.status.dead = true
                el.status.linked = false
              }
            });
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
        }
      });
    },
    revive(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.dead = false
        }
      });
    },
    silence(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          element.status.silenced = true
        }
      });
    },
  },
};
