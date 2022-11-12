import Vue from 'vue'

export default {
  methods: {
    checkGroupToSelectTarget (player = {}) {
      let output = []
      if (player.ability) {
        if (player.ability.reviver || player.ability.resurrect) {
          // List should contain all dead people
          output = this.gameSettings.selectedRoles.filter(x => x.status.dead)
        } else if (player.ability.replacer) {
          // List should contain all Mafia people who are alive and not the player himself
          output = this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.mafia === player.mafia && !x.status.dead)
        } else {
          // List should contain all alive people
          output = this.gameSettings.selectedRoles.filter(x => !x.status.dead)
        }
      }
      return output
    },
    checkGroupToSelectSecondTarget () {
      // List should contain all people except the player in first group
      return this.gameSettings.selectedRoles.filter(x => x.player !== this.actionTarget1)
    },
    findTarget (target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (element.player === target) {
          Vue.set(this.dashboard, 'targetData', element)
        }
      })
    }
  }
}
