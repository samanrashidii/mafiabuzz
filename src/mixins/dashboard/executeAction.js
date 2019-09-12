export default {
  methods: {
    executeAction(player, target1, target2) {
      if (!player.ability.binder && this.actionTarget1 !== null
        || player.ability.binder && this.actionTarget1 !== null && this.actionTarget2 !== null) {
        // For All Each
        this.gameSettings.selectedRoles.forEach((el) => {
          // Shared
          if(el.player === player.player){
            el.actionStatus = true
          }
          // Check One Time Action
          if(el.player === player.player && el.status.hasOneAction){
            el.action.oneTime = true
          }
        })
        // Binder
        if(player.ability.binder){
          this.link(target1, target2)
        }
        // Healer
        if(player.ability.healer){
          this.heal(target1)
        }

        // Action Log
        this.log.mainText = `<span>${this.$t(player.action.action)}</span> ${this.$t('god.logMainText')}<strong>${target1}</strong>`
        this.log.image = player.actionIcon
        this.$notify({ 
          group: 'log', 
          type: 'success', 
          title: `${this.log.image}`,
          text: `${this.log.mainText}`,   
          duration: 4000    
        })
        this.nextAction()
      } else{
        // Error Log
        this.$notify({ 
          group: 'log', 
          type: 'error', 
          title: `error.svg`,
          image: `${this.log.image}`,
          text: `${this.$t('god.errorChoosePlayer')}`
        })
      }
    }
  }
}
