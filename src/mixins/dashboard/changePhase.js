export default {
    methods: {
        changePhase(phase) {
            if (!phase) {
                this.dashboard.actionBox = []
                this.dashboard.day = true
                this.dashboard.actionProgress = 0
                this.dashboard.startAction = false
            } else {
                this.dashboard.round++
                this.setActionsByPriority()
                this.dashboard.day = false
            }
            this.SetGameSettings(this.gameSettings)
            this.SetDashboard(this.dashboard)
        },
        setActionsByPriority() {
            const filteredActions = this.gameSettings.selectedRoles.filter(x => x.status.hasAction && !x.actionStatus && !x.status.dead
                                                                             || x.status.hasAction && x.status.revived 
                                                                             || x.status.hasAction && minion)
            const sorted = [...filteredActions.slice().sort((a, b) => ((a.priority > b.priority) ? 1 : -1))]
            this.dashboard.actionBox = sorted
        },
    }
}