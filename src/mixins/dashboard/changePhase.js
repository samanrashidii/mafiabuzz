export default {
    methods: {
        changePhase(phase) {
            if (!phase) {
                this.dashboard.actionBox = []
                this.dashboard.day = true
            } else {
                this.dashboard.round++
                this.setActionsByPriority()
                this.dashboard.day = false
            }
            this.SetDashboard(this.dashboard)
        },
        setActionsByPriority() {
            const filteredActions = this.gameSettings.selectedRoles.filter(x => x.status.hasAction && !x.actionStatus)
            const sorted = filteredActions.slice().sort((a, b) => ((a.priority > b.priority) ? 1 : -1))
            this.dashboard.actionBox = sorted
        },
    }
}