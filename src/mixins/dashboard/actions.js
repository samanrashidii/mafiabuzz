export default {
    methods: {
        kill(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target.player){
                    element.status.dead = true
                    
                }
                if(element.status.linked){
                    element.status.dead = true
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
        link(target1, target2){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target1){
                    element.status.linked = true
                }
                if(element.player === target2){
                    element.status.linked = true
                }
            })
        }
    }
}