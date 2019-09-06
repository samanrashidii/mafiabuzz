export default {
    methods: {
      readyActions(attacker, index) {
        if (index == this.dashboard.actionProgress) {
          if (this.checkGroup(attacker).length <= 0) {
            this.dashboard.actionProgress++;
          }
          if (attacker.status.hacked) {
            this.dashboard.targetHacked = true;
          } else {
            this.dashboard.targetHacked = false;
          }
          if (attacker.status.dead) {
            this.dashboard.targetDead = true;
          } else {
            this.dashboard.targetDead = false;
          }
          if (attacker.status.revived) {
            this.dashboard.targetRevived = true;
          } else {
            this.dashboard.targetRevived = false;
          }
          return true;
        }
        return false;
      }
    }
}