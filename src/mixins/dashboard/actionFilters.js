import Vue from 'vue';
export default {
    methods: {
        checkGroup(player) {
            // Last Day Vote
            // if (player === 'lastDay') {
            //   return this.gameSettings.selectedRoles.filter(x => x.status.dead === false)
            // }
            // Night King Target
            // if (player.ability.reviver) {
            //   return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.status.dead === true)
            // }
            // Yakuza Target
            // if (player.ability.playerSwapper) {
            //   return this.gameSettings.selectedRoles.filter(x => x.mafia !== player.mafia && x.status.dead === false)
            // }
            // Doctor & Ruspy & Cupid Target
            // if (player.ability.healer || player.ability.silencer || player.ability.binder) {
            //   return this.gameSettings.selectedRoles.filter(x => x.status.dead === false)
            // }
            // Default Target
            return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && !x.status.dead)
        },
        checkSecondGroup(player) {
            // Cupid Target
            if (player.ability.binder) {
              return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.player !== this.actionTarget1 && !x.status.dead);
            }
        },
        findTarget(target) {
            this.gameSettings.selectedRoles.forEach((element) => {
              if (element.player === target) {
                Vue.set(this.targetData, 'i', element)
              }
            })
        }
    }
}