export default {
    methods: {
        heal(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.healed = true
                }
            })
        },
        checkIdentity(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.identityChecked = true
                }
            })
        },
        checkRole(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.roleChecked = true
                }
            })
        },
        link(target1, target2){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target1){
                    element.status.linked = true
                }
                if(element.player === target2){
                    element.status.linked = true
                }
            })
        },
        kill(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target && !element.status.healed){
                    element.status.dead = true
                    if(element.status.linked){
                        this.gameSettings.selectedRoles.forEach(el => {
                            if(el.status.linked && !el.status.healed){
                                el.status.dead = true
                                el.status.linked = false
                            }
                        })
                    }
                }
            })
        },
        replacePlayer(target, replacer){
            this.kill(replacer)
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.ability = this.defaultItems.dA
                    element.status = this.defaultItems.dS
                    element.status.playerReplaced = true
                    element.name = this.$t('replacingRoles.miniYakuza.name')
                    element.icon = this.$t('replacingRoles.miniYakuza.icon')
                    element.alt = this.$t('replacingRoles.miniYakuza.alt')
                    element.description = this.$t('replacingRoles.miniYakuza.description')
                }
            })
        },
        revive(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.dead = false
                }
            })
        },
    }
}