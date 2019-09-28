export default {
    methods: {
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
        hack(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.hacked = true
                }
            })
        },
        heal(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.healed = true
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
                    element.name = this.replacingRoles.miniYakuza.name
                    element.icon = this.replacingRoles.miniYakuza.icon
                    element.alt = this.replacingRoles.miniYakuza.alt
                    element.description = this.replacingRoles.miniYakuza.description
                    element.action = this.replacingRoles.miniYakuza.action
                    element.actionStatus = this.replacingRoles.miniYakuza.actionStatus
                    element.ability = this.replacingRoles.miniYakuza.ability
                    element.status = this.replacingRoles.miniYakuza.status
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