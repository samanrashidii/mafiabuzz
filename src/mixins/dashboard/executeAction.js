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
        // Hacker
        if(player.ability.hacker){
          this.hack(target1)
        }

        // IF Returner
        if(this.checkReturner(target1)){
            this.damageReturn(player.player, target1)
        }
        // ELSE
        else if(!player.status.hacked){
            // Killer
            if(player.ability.killer){
              this.kill(target1)
              if(this.checkDetonator(target1)){
                this.detonate(target1)
              }
            }
            // Identity Checker
            if(player.ability.identityChecker){
              this.checkIdentity(target1)
            }
            // Role Checker
            if(player.ability.roleChecker){
              this.checkRole(target1)
            }
            // Replacer
            if(player.ability.replacer){
              this.replacePlayer(target1, player.player)
            }
            // Reviver
            if(player.ability.reviver){
              this.resurrect(target1)
            }
            // Silencer
            if(player.ability.silencer){
              this.silence(target1)
            }
            // Healer
            if(player.ability.healer){
              this.heal(target1)
            }
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
