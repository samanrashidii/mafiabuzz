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
                })
                this.dashboard.round++
                this.setActionsByPriority()
                this.dashboard.day = false
            }
            this.SetGameSettings(this.gameSettings)
            this.SetDashboard(this.dashboard)
        },
        setActionsByPriority() {
            const filteredActions = this.gameSettings.selectedRoles.filter(x => x.status.hasAction && !x.actionStatus && !x.status.dead
                                                                             || x.status.hasAction && x.status.resurrected 
                                                                             || x.status.hasAction && x.status.minion)
            const sorted = [...filteredActions.slice().sort((a, b) => ((a.priority > b.priority) ? 1 : -1))]
            this.dashboard.actionBox = sorted
        },
    }
}