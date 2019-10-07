export default {
  methods: {
    nextAction() {
      this.dashboard.actionProgress++;
      this.actionTarget1 = null;
      this.actionTarget2 = null;
      this.dashboard.targetData = {};
      this.SetDashboard(this.dashboard);
      this.SetGameSettings(this.gameSettings);
    },
  },
};
