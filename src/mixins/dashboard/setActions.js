export default {
  methods: {
    setActionsByPriority() {
      const actions = [];
      this.gameSettings.selectedRoles.forEach((x) => {
        if (x.status.hasAction && !x.actionStatus && !x.status.dead && !x.ability.reviver) {
          actions.push(x);
        }
        if (x.status.hasAction && !x.actionStatus && !x.status.dead && x.ability.reviver && this.gameSettings.deadPeople !== 0) {
          actions.push(x);
        }
      });
      const killersInGame = this.gameSettings.selectedRoles.filter((x)=>{return x.ability.killer && !x.status.dead}).length
      if(killersInGame === 0){
        const potentialKillers = this.gameSettings.selectedRoles.filter((x) => {return x.potentialKiller && !x.status.dead});
        const sortedPotentialKillers = [...potentialKillers.slice().sort((a, b) => ((a.killPriority > b.killPriority) ? 1 : -1))];
        this.gameSettings.selectedRoles.forEach((element) => {
          if(element.player === sortedPotentialKillers[0].player){
            const characterStatus = element.status.hasAction
            element.actionIcon = this.replacingRoles.killerMafia.actionIcon
            element.passiveIcon = this.replacingRoles.killerMafia.passiveIcon
            element.action = this.replacingRoles.killerMafia.action
            element.actionStatus = this.replacingRoles.killerMafia.actionStatus
            element.ability = this.replacingRoles.killerMafia.ability
            element.status = this.replacingRoles.killerMafia.status
            // Check character had action or not
            if(!characterStatus){
              actions.push(element)
            }
          }
        })
      }
      const sorted = [...actions.slice().sort((a, b) => ((a.priority > b.priority) ? 1 : -1))];
      this.dashboard.actionBox = sorted;
    },
  },
};
