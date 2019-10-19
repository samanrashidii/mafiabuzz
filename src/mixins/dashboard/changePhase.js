export default {
  methods: {
    changePhase(phase) {
      if (!phase) {
        this.dashboard.day = true;
        this.dashboard.startAction = false;
        // Reset Night Stuff
        this.dashboard.actionBox.forEach((element, index) => {
          localStorage.removeItem(`action_${index}`);
        });
        this.dashboard.actionBox = [];
        this.dashboard.actionProgress = 0;
        this.gameSettings.selectedRoles.forEach((el) => {
          // Shared
          if (el.action.oneTime) {
            el.actionStatus = true;
          } else {
            el.actionStatus = false;
          }
          if (el.status.healed) {
            el.status.healed = false;
          }
          if (el.status.identityChecked) {
            el.status.identityChecked = false;
          }
          if (el.status.roleChecked) {
            el.status.roleChecked = false;
          }
          if (el.status.hacked) {
            el.status.hacked = false;
          }
        });
        this.gameSettings.selectedRoles.forEach((element) => {
          if (element.status.recentlyDead) {
            const logNote = `<span class='last-log red-bg dead-icon'><i>${element.player}</i> ${this.$t('god.logDeadText')}</span>`;
            element.status.recentlyDead = false;
            this.dashboard.lastNight.push(logNote);
          }
          if (element.status.recentlyRevived) {
            const logNote = `<span class='last-log green-bg revived-icon'><i>${element.player}</i> ${this.$t('god.logRevivedText')}</span>`;
            element.status.recentlyRevived = false;
            this.dashboard.lastNight.push(logNote);
          }
          if (element.status.recentlySilenced) {
            const logNote = `<span class='last-log blue-bg silenced-icon'><i>${element.player}</i> ${this.$t('god.logSilencedText')}</span>`;
            element.status.recentlySilenced = false;
            this.dashboard.lastNight.push(logNote);
          }
        });
        if(!this.gameSettings.gameFinished){
          if (this.dashboard.lastNight.length > 0) {
            this.dashboard.lastNightBox = true;
          }
        }
        
      } else {
        this.gameSettings.selectedRoles.forEach((el) => {
          if (el.status.silenced) {
            el.status.silenced = false;
          }
          if (el.status.damageReturned) {
            el.status.damageReturned = false;
          }
        });
        this.dashboard.day = false;
        if (this.dashboard.round >= 1) {
          this.dashboard.lastNight = [];
          this.dashboard.lastPhaseAction = true;
        }
        this.dashboard.round++;
        this.setActionsByPriority();
      }
      this.SetDashboard(this.dashboard);
      this.SetGameSettings(this.gameSettings);
    },
  },
};
