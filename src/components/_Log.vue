<template>
  <div>
    <!-- Log History -->

    <overlay :class="{'active': logHistory, 'log-history': true}">
      <template v-for="(totLog, index) in dashboard.totalHistory">
        <div
          class="log-table"
          :key="index"
          v-if="totLog.length > 0"
        >
          <span class="counter">{{ $t('common.Night') }} {{ index+1 }}</span>
          <table>
            <tr
              v-for="(log, index) in totLog"
              :key="index"
            >
              <td>{{ index+1 }}</td>
              <td>
                <img
                  :src="getImgUrl('/actions', $t(dashboard.log.actionIcon))"
                  :alt="$t('god.actionIconAlt')"
                  v-if="!dashboard.log.passiveLog"
                >
                <img
                  :src="getImgUrl('/roles', $t(dashboard.log.passiveIcon))"
                  :alt="$t('god.passiveIconAlt')"
                  v-else
                >
              </td>
              <td>
                <log-events
                  v-if="dashboard.readyToLog"
                  :log="dashboard.log"
                />
              </td>
            </tr>
          </table>
        </div>
      </template>
      <div
        class="log-table"
        v-if="dashboard.historyLog.length > 0"
      >
        <span class="counter">{{ $t('god.thisNight') }}</span>
        <table>
          <tr
            v-for="(log, index) in dashboard.historyLog"
            :key="index"
          >
            <td>{{ index+1 }}</td>
            <td>
              <img
                :src="getImgUrl('/actions', $t(dashboard.log.actionIcon))"
                :alt="$t('god.actionIconAlt')"
                v-if="!dashboard.log.passiveLog"
              >
              <img
                :src="getImgUrl('/roles', $t(dashboard.log.passiveIcon))"
                :alt="$t('god.passiveIconAlt')"
                v-else
              >
            </td>
            <td>
              <log-events
                v-if="dashboard.readyToLog"
                :log="dashboard.log"
              />
            </td>
          </tr>
        </table>
      </div>
      <div v-if="dashboard.totalHistory.length === 0 && dashboard.historyLog.length === 0">
        <h2>{{ $t('god.noLog') }}</h2>
      </div>
      <app-button
        @click.native="logHistory = false"
        class="active has-small-top-margin"
      >
        <span>{{ $t('god.logCloseButton') }}</span>
      </app-button>
    </overlay>

    <!-- Log Buttons -->

    <transition name="fade">
      <div
        class="log-bttn"
        v-if="dashboard.god"
      >
        <app-button
          @click.native="logHistory = true"
          class="awesome"
        >
          <span>{{ $t('god.historyLogButton') }} <i>{{ dashboard.totalHistory.length }}</i></span>
        </app-button>
      </div>
    </transition>

    <!-- Log Actions in Last Night -->

    <div
      class="log-table"
      v-if="dashboard.historyLog.length > 0 && dashboard.day"
      :class="{'result': dashboard.historyLog.length > 0 && dashboard.day}"
    >
      <span class="table-title">{{ $t('god.whatHappened') }}</span>
      <table>
        <tr
          v-for="(log, index) in historyLog"
          :key="index"
        >
          <td>
            <img
              :src="getImgUrl('/actions', $t(log.actionIcon))"
              :alt="$t('god.actionIconAlt')"
              v-if="!log.passiveLog"
            >
            <img
              :src="getImgUrl('/roles', $t(log.passiveIcon))"
              :alt="log.target"
              v-else
            >
          </td>
          <td>
            <log-events
              v-if="dashboard.readyToLog"
              :log="log"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    lastNightBoxController() {
      this.dashboard.lastNightBox = false;
      this.SetDashboard(this.dashboard);
    },
    lastPhaseController() {
      this.dashboard.lastPhaseAction = false;
      this.SetDashboard(this.dashboard);
    },
    mafiaPartyController() {
      this.dashboard.mafiaParty = false;
      this.SetDashboard(this.dashboard);
    },
    // Skip Action
    skipAction() {
      this.alertBox = false;
      this.nextAction(0, 0);
    },
    changePhase(phase) {
      if (!phase) {
        this.gameSettings.selectedRoles.forEach((element) => {
          // Reset One Night Actions
          element.status.roleChecked = false;
          element.status.identityChecked = false;
          element.status.hacked = false;
          element.status.silenced = false;
          element.status.healed = false;
          // One Time Actions of Yakuza - Cupid - Bomb - Bulletproof
          if (element.ability.playerSwaper || element.ability.binder || element.ability.detonator || element.ability.hasShield) {
            if (!element.action.oneTime) {
              element.actionStatus = true;
            }
          } else {
            element.actionStatus = false;
          }
        });
        this.dashboard.totalHistory.push(this.dashboard.historyLog);
        if (this.dashboard.historyLog.length > 0) {
          this.gameSettings.selectedRoles.forEach((element) => {
            this.dashboard.historyLog.forEach((item) => {
              if (element.player === item.target && element.status.recentlyDead && !element.status.recentlyRevived
                      || element.player === item.target2 && element.status.recentlyDead && !element.status.recentlyRevived
                      || element.player === item.attacker && element.status.recentlyDead && !element.status.recentlyRevived) {
                const logNote = `<span class='last-log red-bg dead-icon'><i>${element.player}</i> ${this.$t('god.logDeadText')}</span>`;
                element.status.recentlyDead = false;
                this.dashboard.lastNight.push(logNote);
              }
              if (element.player === item.target && element.status.recentlyRevived && !element.status.recentlyDead) {
                const logNote = `<span class='last-log green-bg revived-icon'><i>${element.player}</i> ${this.$t('god.logRevivedText')}</span>`;
                element.status.recentlyRevived = false;
                this.dashboard.lastNight.push(logNote);
              }
              if (element.player === item.target && element.status.recentlySilenced) {
                const logNote = `<span class='last-log blue-bg silenced-icon'><i>${element.player}</i> ${this.$t('god.logSilencedText')}</span>`;
                element.status.recentlySilenced = false;
                this.dashboard.lastNight.push(logNote);
              }
            });
          });
        }
        if (this.dashboard.lastNight.length > 0) {
          this.dashboard.lastNightBox = true;
        }
        this.dashboard.historyLog = [];
      } else {
        this.dashboard.lastPhaseAction = true;
        if (this.dashboard.round >= 1) {
          this.dashboard.lastNight = [];
        }
        this.chooseKiller();
        this.dashboard.actionProgress = 0;
        this.setActionsByPriority();
      }
      this.SetGameSettings(this.gameSettings);
    },
  },
};
</script>

<style>

</style>
