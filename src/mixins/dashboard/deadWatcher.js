export default {
  methods: {
    deadWatcher (value, player) {
      this.dashboard.revengeKillBox = value
      this.dashboard.avenger = player
      this.SetDashboard(this.dashboard)
    }
  }
}
