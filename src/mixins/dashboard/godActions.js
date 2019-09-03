export default {
  methods: {
    godActions(player) {
      this.dashboard.log.attacker = 'god.name';
      this.dashboard.log.target = player.player;
      this.dashboard.log.targetMafia = player.mafia;
      this.dashboard.log.godLog = true;
      // Check Alive People and People Don't Have Heal Buff = Kill them with filters
      if (!player.status.healed) {
        if (player.status.dead == false) {
          // Log god when kills
          this.dashboard.log.action = 'god.killAction';
          this.dashboard.log.actionIcon = 'god.killIcon';
          // Cupid Targets
          if (player.status.linked) {
            this.gameSettings.selectedRoles.forEach((element) => {
              if (element.status.linked) {
                element.status.dead = true;
                element.status.recentlyDead = true;
              }
            });
          }
          // Bomb Targets
          if (player.ability.detonator) {
            this.gameSettings.selectedRoles.forEach((element) => {
              if (element.player == player.player) {
                element.status.dead = true;
                element.status.recentlyDead = true;
                this.passiveCalc(element);
              }
            });
          }
          // Bulletproof Targets
          if (player.ability.hasShield) {
            this.gameSettings.selectedRoles.forEach((element) => {
              if (element.player == player.player) {
                if (element.status.shield) {
                  element.status.dead = true;
                  element.status.recentlyDead = true;
                  element.status.shield = false;
                }
              }
            });
          }
          // Night King Targets
          if (player.ability.reviver) {
            this.gameSettings.selectedRoles.forEach((element) => {
              if (element.player == player.player) {
                element.status.dead = true;
                element.status.recentlyDead = true;
              }
              if (element.status.revived) {
                element.status.dead = true;
                element.status.recentlyDead = true;
              }
            });
          }
          // Default Target
          else {
            this.gameSettings.selectedRoles.forEach((element) => {
              if (element.player == player.player) {
                element.status.dead = true;
                element.status.recentlyDead = true;
              }
            });
          }
          // Check Dead People = Revive them with filters
        } else {
          // Log god when revive
          this.dashboard.log.action = 'god.reviveAction';
          this.dashboard.log.actionIcon = 'god.reviveIcon';

          this.gameSettings.selectedRoles.forEach((element) => {
            if (element.player == player.player) {
              // Revive Cupid Targets
              if (element.status.linked && element.status.dead) {
                element.status.linked = false;
              }
              // Revive
              element.status.dead = false;
              element.status.recentlyRevived = true;
            }
          });
        }
        this.dashboard.historyLog.push({ ...this.log });
      }
      this.dashboard.log.attacker = null;
      this.dashboard.log.target = null;
      this.dashboard.log.targetMafia = null;
      this.dashboard.log.godLog = false;
      this.SetDashboard(this.dashboard);
      this.SetGameSettings(this.gameSettings);
    }
  },
};
