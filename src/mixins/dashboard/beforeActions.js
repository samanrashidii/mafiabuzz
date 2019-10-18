export default {
  methods: {
    lastPhaseController() {
      this.dashboard.lastPhaseAction = false;
      this.SetDashboard(this.dashboard);
    },
    mafiaPartyController() {
      this.dashboard.mafiaParty = false;
      this.SetDashboard(this.dashboard);
    },
  },
};
