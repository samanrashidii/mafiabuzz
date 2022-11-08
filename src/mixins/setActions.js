export default {
  methods: {
    setActionsByPriority () {
      const actions = []
      this.gameSettings.selectedRoles.forEach((x) => {
        if (x.status.hasAction && !x.actionStatus && !x.ability.reviver && !x.ability.resurrect) {
          actions.push(x)
        }
        if (x.status.hasAction && !x.actionStatus && x.ability.reviver && this.gameSettings.deadPeople !== 0) {
          actions.push(x)
        }
        if (x.status.hasAction && !x.actionStatus && x.ability.resurrect && this.gameSettings.deadPeople !== 0) {
          actions.push(x)
        }
      })
      const killersInGame = this.gameSettings.selectedRoles.filter(x => x.ability.killer && !x.status.dead && x.mafia).length
      const mafiaInGame = this.gameSettings.aliveMafia
      if (killersInGame === 0 && mafiaInGame !== 0) {
        const potentialKillers = this.gameSettings.selectedRoles.filter(x => x.potentialKiller && !x.status.dead)
        const sortedPotentialKillers = [...potentialKillers.slice().sort((a, b) => ((a.killPriority > b.killPriority) ? 1 : -1))]
        this.gameSettings.selectedRoles.forEach((element) => {
          if (sortedPotentialKillers.length > 0 && element.player === sortedPotentialKillers[0].player) {
            const characterStatus = element.status.hasAction
            this.dashboard.killerChanged = true
            this.dashboard.nextKiller.icon = element.icon
            this.dashboard.nextKiller.name = element.info[this.currentLang].name
            this.dashboard.nextKiller.player = element.player
            if (element.priority === null) {
              element.priority = this.replacingRoles.killerMafia.priority
            }
            element.actionIcon = this.replacingRoles.killerMafia.actionIcon
            element.passiveIcon = this.replacingRoles.killerMafia.passiveIcon
            element.action = this.replacingRoles.killerMafia.action
            element.actionStatus = this.replacingRoles.killerMafia.actionStatus
            element.ability = this.replacingRoles.killerMafia.ability
            element.status = this.replacingRoles.killerMafia.status
            // Check character had action or not
            if (!characterStatus) {
              actions.push(element)
            }
          }
          if (killersInGame === 0 && element.status.hacked) {
            element.status.hacked = false
          }
        })
      }
      const sorted = [...actions.slice().sort((a, b) => ((a.priority > b.priority) ? 1 : -1))]
      this.dashboard.actionBox = sorted
    }
  }
}
