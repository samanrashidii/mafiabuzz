export default {
    methods: {
        changePhase(phase) {
            if (!phase) {
                this.dashboard.day = true
                this.dashboard.startAction = false
                // Reset Night Stuff
                this.dashboard.actionBox = []
                this.dashboard.actionProgress = 0
                this.gameSettings.selectedRoles.forEach((el) => {
                    // Shared
                    if(el.action.oneTime){
                        el.actionStatus = true
                    } else{
                        el.actionStatus = false
                    }
                    if(el.status.healed){
                        el.status.healed = false
                    }
                    if(el.status.identityChecked){
                        el.status.identityChecked = false
                    }
                    if(el.status.roleChecked){
                        el.status.roleChecked = false
                    }
                    if(el.status.hacked){
                        el.status.hacked = false
                    }
                })
            } else {
                this.gameSettings.selectedRoles.forEach((el) => {
                    if(el.status.silenced){
                        el.status.silenced = false
                    }
                    if(el.status.damageReturned){
                        el.status.damageReturned = false
                    }
                    this.SetGameSettings(this.gameSettings)
                })
                this.dashboard.round++
                this.setActionsByPriority()
                this.dashboard.day = false
            }
            this.SetGameSettings(this.gameSettings)
            this.SetDashboard(this.dashboard)
        }
    }
}