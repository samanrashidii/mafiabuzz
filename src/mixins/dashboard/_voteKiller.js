export default {
    methods: {
      killByVote(target) {
        this.gameSettings.selectedRoles.forEach((element) => {
          if (target === element.player) {
            element.status.dead = true
            this.dashboard.lastPhaseAction = false
            // Cupid Targets on Vote Kill
            if (element.status.linked) {
              this.SelectedRoles.forEach((element) => {
                if (element.status.linked) {
                  element.status.dead = true
                }
              })
            }
            // Necromancer Targets on Vote Kill
            if (element.ability.reviver) {
              this.SelectedRoles.forEach((element) => {
                if (element.status.revived) {
                  element.status.dead = true
                }
              })
            }
          }
        });
      }
    }
}