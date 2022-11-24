export default {
  methods: {
    setActionsByPriority () {
      const actions = []
      this.gameSettings.selectedRoles.forEach((role) => {
        // Push all roles that have actions except for reviver and resurrecter
        if (role.status.hasAction && !role.hasDoneAction && !role.ability.reviver && !role.ability.resurrect) {
          actions.push(role)
        }
        // Push reviver if there is dead people
        if (role.status.hasAction && !role.hasDoneAction && role.ability.reviver && this.gameSettings.deadPeople !== 0) {
          actions.push(role)
        }
        // Push resurrecter if there is dead people
        if (role.status.hasAction && !role.hasDoneAction && role.ability.resurrect && this.gameSettings.deadPeople !== 0) {
          actions.push(role)
        }
      })
      const killersInGame = this.gameSettings.selectedRoles.filter(role => role.ability.killer && !role.status.dead && role.mafia).length
      const mafiaInGame = this.gameSettings.aliveMafia
      if (killersInGame === 0 && mafiaInGame !== 0) {
        const potentialKillers = this.gameSettings.selectedRoles.filter(role => role.potentialKiller && !role.status.dead)
        const sortedPotentialKillers = [...potentialKillers.slice().sort((a, b) => ((a.killPriority > b.killPriority) ? 1 : -1))]
        this.gameSettings.selectedRoles.forEach((role, index) => {
          if (sortedPotentialKillers.length > 0 && role.player === sortedPotentialKillers[0].player) {
            this.dashboard.killerChanged = true
            this.dashboard.nextKiller.icon = role.icon
            this.dashboard.nextKiller.name = role.info[this.currentLang].name
            this.dashboard.nextKiller.player = role.player
            const newCharacter = {
              ...role,
              ...this.replacingRoles.killerMafia
            }
            this.gameSettings.selectedRoles[index] = newCharacter
          }
        })
      }
      const sortedActions = [...actions.slice().sort((a, b) => ((a.priority > b.priority) ? 1 : -1))]
      this.dashboard.actionBox = sortedActions
    }
  }
}
