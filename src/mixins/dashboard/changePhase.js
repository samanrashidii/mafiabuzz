export default {
    methods: {
        changePhase(phase) {
            if (!phase) {
                this.dashboard.day = true
            } else {
                this.dashboard.round++
                this.dashboard.day = false
            }
            this.SetDashboard(this.dashboard)
        }
    }
}