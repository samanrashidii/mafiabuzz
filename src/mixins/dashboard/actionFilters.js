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
            return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.status.dead === false)
        },
        checkSecondGroup(player) {
            // Cupid Target
            if (player.ability.binder) {
              return this.gameSettings.selectedRoles.filter(x => x.player !== player.player && x.player !== player.target && x.status.dead === false);
            }
        },
        findTarget(target) {
            this.gameSettings.selectedRoles.forEach((element) => {
              if (element.player === target) {
                this.fireAction(element)
                this.dashboard.info.target = element.player
                this.dashboard.info.targetInfo = element
                this.dashboard.info.targetRole = element.name
                this.dashboard.info.targetPassive = element.action.passive
                this.dashboard.info.targetMafia = element.mafia
                this.dashboard.info.targetIcon = element.icon
                this.dashboard.info.targetID = element.id
                this.dashboard.info.status = element.status
                this.dashboard.info.damageReturned = element.status.damageReturned
              }
            })

        }
    }
}