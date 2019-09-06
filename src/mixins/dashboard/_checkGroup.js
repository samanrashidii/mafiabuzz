export default {
    methods: {
        checkGroup(player) {
            // Last Day Vote
            if (player === 'lastDay') {
              return this.gameSettings.selectedRoles.filter(x => x.status.dead === false)
            }
            // Night King Target
            if (player.ability.reviver) {
              return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.status.dead === true)
            }
            // Yakuza Target
            if (player.ability.playerSwapper) {
              return this.gameSettings.selectedRoles.filter(x => x.mafia !== player.mafia && x.status.dead === false)
            }
            // Doctor & Ruspy & Cupid Target
            if (player.ability.healer || player.ability.silencer || player.ability.binder) {
              return this.gameSettings.selectedRoles.filter(x => x.status.dead === false)
            }
            // Default Target
            return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.status.dead === false)
        },
        checkSecondGroup(player) {
            // Cupid Target
            if (player.ability.binder) {
              return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.player !== player.target && x.status.dead === false);
            }
        }
    }
}