export default {
    methods: {
      chooseKiller() {
        const mafiaNumbers = this.gameSettings.selectedRoles.filter(item => item.id === 1);
        this.gameSettings.selectedRoles.forEach((element) => {
          if (element.ability.killer && !element.status.mafia) {
            this.dashboard.killer = true
          }
          if (element.status.mafia && this.killer) {
            element.status.hasAction = false
          }
          if (element.status.mafia && mafiaNumbers.length > 1) {
            element.status.hasAction = false
            this.dashboard.multipleMafia = true
          }
        });
        for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
          if (this.gameSettings.selectedRoles[i].id == 1 && this.multipleMafia) {
            this.gameSettings.selectedRoles[i].ability.killer = true
            this.gameSettings.selectedRoles[i].status.hasAction = true
            this.gameSettings.selectedRoles[i].action.action = 'common.Kill'
            break;
          }
        }
      }
    }
}