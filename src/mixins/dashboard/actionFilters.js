import Vue from 'vue'

export default {
  methods: {
    checkGroup (player) {
      // Last Day Vote
      if (player === 'lastDay') {
        return this.gameSettings.selectedRoles.filter(x => !x.status.dead)
      }
      if (player.ability.reviver) {
        return this.gameSettings.selectedRoles.filter(x => x.player !==
                                                       player.player &&
                                                        x.status.dead)
      }
      if (player.ability.replacer) {
        return this.gameSettings.selectedRoles.filter(x => x.mafia !==
                                                       player.mafia &&
                                                       !x.status.dead)
      }
      if (player.ability.healer || player.ability.silencer || player.ability.binder || player.ability.antiSilencer) {
        return this.gameSettings.selectedRoles.filter(x => !x.status.dead)
      }
      // Default Target
      return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && !x.status.dead)
    },
    checkSecondGroup (player) {
      // Cupid Target
      if (player.ability.binder) {
        return this.gameSettings.selectedRoles.filter(x => x.player !== this.actionTarget1 && !x.status.dead)
      }
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
