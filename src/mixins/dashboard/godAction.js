export default {
  methods: {
    godAction(target) {
      target.status.dead === true ? this.revive(target.player) : this.kill(target.player);
      this.SetGameSettings(this.gameSettings);
      this.SetDashboard(this.dashboard);
    },
  },
};
