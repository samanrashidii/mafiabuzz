export default {
  methods: {
    trackingStatus (status) {
      this.dashboard.freezeStatus.linked = status.linked
      this.dashboard.freezeStatus.hacked = status.hacked
      this.dashboard.freezeStatus.silenced = status.silenced
      this.dashboard.freezeStatus.healed = status.healed
      this.dashboard.freezeStatus.antiSilenced = status.antiSilenced
      this.dashboard.freezeStatus.recentlySilenced = status.recentlySilenced
      this.dashboard.freezeStatus.recentlyDead = status.recentlyDead
      this.dashboard.freezeStatus.recentlyRevived = status.recentlyRevived
    }
  }
}
