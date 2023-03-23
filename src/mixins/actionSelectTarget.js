import Vue from 'vue'

export default {
  methods: {
    checkGroupToSelectTarget (player = {}) {
      let output = []
      if (player.ability) {
        if (player.ability.reviver || player.ability.resurrect) {
          // List should contain all dead people
          output = this.gameSettings.selectedRoles.filter(role => role.status.dead)
        } else if (player.status.targetGroup === 'citizen') {
          // List should contain all Non-Mafia people who are alive
          output = this.gameSettings.selectedRoles.filter(role => role.mafia !== player.mafia && !role.status.dead)
        } else if (player.status.targetGroup === 'mafia') {
          // List should contain all Mafia people who are alive
          output = this.gameSettings.selectedRoles.filter(role => role.mafia === player.mafia && !role.status.dead)
        } else {
          // List should contain all alive people
          output = this.gameSettings.selectedRoles.filter(role => !role.status.dead)
        }
      } else {
        // List should contain all alive people
        output = this.gameSettings.selectedRoles.filter(role => !role.status.dead)
      }
      return output
    },
    findTarget (target) {
      this.gameSettings.selectedRoles.forEach((role) => {
        if (role.player === target) {
          Vue.set(this.dashboard, 'targetData', role)
        }
      })
    }
  }
}
