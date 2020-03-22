export default {
  methods: {
    killByVote(target) {
      this.gameSettings.selectedRoles.forEach((element) => {
        if (target === element.player) {
          this.kill(element.player);
          this.dashboard.lastPhaseAction = false;
          this.SetDashboard(this.dashboard);
          this.SetGameSettings(this.gameSettings);
        }
      });
    },
  },
};
