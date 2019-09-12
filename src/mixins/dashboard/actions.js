export default {
    methods: {
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
                if(element.player === target.player && !element.status.healed){
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
        revive(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target.player){
                    element.status.dead = false
                }
            })
        },
    }
}