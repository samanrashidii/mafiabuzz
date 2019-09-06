<template>
  <div class="god">
    <!-- Dashboard Buttons -->

    <div
      class="button-holder"
      v-if="dashboard.god"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <app-button
          :class="{'day':dashboard.day, 'night':!dashboard.day, 'swap-bttn':true}"
          @click.native="changePhase(dashboard.day)"
        >
          <span v-if="dashboard.day">{{ $t('god.nightText') }}</span>
          <span v-else>{{ $t('god.dayText') }}</span>
        </app-button>
      </transition>
    </div>

    <!-- Day & Night Dashboard -->

    <div
      class="step-box display godashboard"
      :class="{'day': dashboard.day && dashboard.god, 'night': !dashboard.day}"
    >
      <transition name="fade">
        <strong
          class="round-tracker"
          v-if="!dashboard.day"
        >{{ dashboard.round }}</strong>
      </transition>
      <div class="center-aligned">
        <transition-group
          name="fade"
          mode="out-in"
        >
          <div
            v-if="!dashboard.god"
            key="beforeShow"
          >
            <img
              class="game-icon"
              :src="require(`@/assets/images/icons/game.png`)"
              :alt="$t('god.gameDashboardIconAlt')"
            >
            <h3
              class="different-colors"
              v-html="$t('god.gameStartText')"
            />
            <app-button
              class="active"
              @click.native="showPlay()"
            >
              {{ $t('god.godButton') }}
            </app-button>
          </div>
          <div
            v-else
            key="afterShow"
          >
            <div class="players-role">

              <!-- Mafia Table in Dashboard -->
              <div class="table mafia-table table-roles">
                <table>
                  <tr>
                    <th>{{ $t('common.Role') }}</th>
                    <th>{{ $t('common.Player') }}</th>
                    <th v-if="dashboard.day === true">
                      {{ $t('common.Vote') }}
                    </th>
                    <th v-if="dashboard.day === false">
                      {{ $t('common.Status') }}
                    </th>
                    <th v-if="dashboard.day === false">
                      {{ $t('common.Action') }}
                    </th>
                  </tr>
                  <tr
                    v-for="(fM, index) in gameSettings.fMafias"
                    :key="index"
                    :class="characterClasses(fM)"
                  >
                    <td>
                        <img
                          :src="getImgUrl('/roles', $t(fM.icon))"
                          :alt="$t(fM.alt)"
                        > {{ $t(fM.name) }}
                    </td>
                    <td><span class="character-player">{{ fM.player }}</span></td>
                    <td
                      class="vote-counter"
                      v-if="dashboard.day == true"
                    >
                      <input
                        type="tel"
                        :name="`vote_count_${index}`"
                        placeholder="0"
                        :maxlength="'2'"
                        :tabindex="index+10"
                      >
                    </td>
                    <td v-if="dashboard.day === false">
                      <a
                        href="javascript:void(0)"
                        @click="godActions(fM)"
                        :class="{'killer': fM.status.dead == false, 'angel': fM.status.dead == true}"
                      />
                    </td>
                    <td v-if="dashboard.day === false">
                      <span
                        class="disabled"
                        v-if="!fM.status.hasPassive && !fM.status.hasAction"
                      />
                      <span
                        class="done-action"
                        v-else-if="!fM.status.hasAction && fM.status.hasPassive && fM.actionStatus"
                      />
                      <span
                        @click="godActions(fM)"
                        class="passive"
                        v-if="fM.status.hasPassive && !fM.status.hasAction"
                      />
                      <span
                        :class="{'pending-action': !fM.actionStatus && fM.status.hasAction, 'done-action': fM.actionStatus}"
                        v-else
                      />
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Citizen Table in Dashboard -->
              <div class="table citizen-table table-roles">
                <table>
                  <tr>
                    <th>{{ $t('common.Role') }}</th>
                    <th>{{ $t('common.Player') }}</th>
                    <th v-if="dashboard.day === true">
                      {{ $t('common.Vote') }}
                    </th>
                    <th v-if="dashboard.day === false">
                      {{ $t('common.Status') }}
                    </th>
                    <th v-if="dashboard.day === false">
                      {{ $t('common.Action') }}
                    </th>
                  </tr>
                  <tr
                    v-for="(fC, index) in gameSettings.fCitizens"
                    :key="index"
                    :class="characterClasses(fC)"
                  >
                    <td>
                        <img
                          :src="getImgUrl('/roles', $t(fC.icon))"
                          :alt="$t(fC.alt)"
                        > {{ $t(fC.name) }}
                    </td>
                    <td><span class="character-player">{{ fC.player }}</span></td>
                    <td
                      class="vote-counter"
                      v-if="dashboard.day === true"
                    >
                      <input
                        type="tel"
                        :name="`vote_count_${index}`"
                        placeholder="0"
                        :maxlength="'2'"
                        :tabindex="index+20"
                      >
                    </td>
                    <td v-if="dashboard.day == false">
                      <a
                        href="javascript:void(0)"
                        @click="godActions(fC)"
                        :class="{'killer': fC.status.dead === false, 'angel':fC.status.dead === true}"
                      />
                    </td>
                    <td v-if="dashboard.day == false">
                      <span
                        class="disabled"
                        v-if="!fC.status.hasPassive && !fC.status.hasAction"
                      />
                      <span
                        class="done-action"
                        v-else-if="!fC.status.hasAction && fC.status.hasPassive && fC.actionStatus"
                      />
                      <span
                        class="passive"
                        v-if="fC.status.hasPassive && !fC.status.hasAction"
                      />
                      <span
                        :class="{'pending-action': !fC.actionStatus && fC.status.hasAction, 'done-action': fC.actionStatus}"
                        v-else
                      />
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Log Actions in Last Night -->

              <!-- <div
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
              </div> -->
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Log Buttons -->

    <!-- <transition name="fade">
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
    </transition> -->

    <!-- Dashboard Game Hint -->

    <div
      class="step-box only-box"
      v-if="dashboard.god"
    >
      <ul class="dashboard-hint">
        <li
          v-for="(hint, index) in $t('god.dashboardHint')"
          :key="index"
        >
          <span :class="hint.name">{{ hint.hint }}</span>
        </li>
      </ul>
    </div>

    <!-- Restart or Reset Game -->

    <app-button
      class="active has-xsmall-bottom-margin"
      @click.native="overlay = true, totRestart = false"
      v-if="dashboard.god"
    >
      {{ $t('god.rgwRoles') }}
    </app-button>
    <app-button
      class="purple has-bottom-margin"
      v-if="dashboard.god"
      @click.native="overlay = true, totRestart = true"
    >
      {{ $t('god.resetGame') }}
    </app-button>

    <overlay :class="{'active': overlay,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        :src="require(`@/assets/images/icons/warning.png`)"
        :alt="$t('general.warningIcon')"
      >
      <template v-if="!totRestart">
        <p>{{ $t('god.resetText') }}</p>
        <app-button
          @click.native="rgwRoles()"
          class="green "
        >
          <span>{{ $t('god.restartButton') }}</span>
        </app-button>
        <app-button
          @click.native="overlay = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </app-button>
      </template>
      <template v-else>
        <p>{{ $t('god.resetTotalText') }}</p>
        <app-button
          @click.native="resetGame()"
          class="green "
        >
          <span>{{ $t('god.restartButton') }}</span>
        </app-button>
        <app-button
          @click.native="overlay = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </app-button>
      </template>
    </overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Overlay from '@/components/Overlay.vue';
import InfoBox from '@/components/InfoBox.vue';
import Log from '@/components/Log.vue';
import getImg from '@/mixins/getImg';
import changePhase from '@/mixins/dashboard/changePhase';
import characterClasses from '@/mixins/dashboard/characterClasses';

export default {
  data() {
    return {
      overlay: false,
      alertBox: false,
      logAction: false,
      logHistory: false,
      logActionDone: false,
      totRestart: false,
    };
  },
  components: {
    overlay: Overlay,
    infoBox: InfoBox,
    logEvents: Log,
  },
  computed: {
    ...mapGetters({
      Dashboard: 'dashboard/Dashboard',
      GameSettings: 'gameStatus/GameSettings',
    }),
    dashboard(){
      return JSON.parse(JSON.stringify(this.Dashboard))
    },
    gameSettings(){
      return JSON.parse(JSON.stringify(this.GameSettings))
    },
    // progress() {
    //   return (this.dashboard.actionProgress / this.dashboard.actionBox.length) * 100;
    // },
  },
  methods: {
    ...mapActions({
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    // lastNightBoxController(){
    //   this.dashboard.lastNightBox = false
    //   this.SetDashboard(this.dashboard)
    // },
    // lastPhaseController(){
    //   this.dashboard.lastPhaseAction = false
    //   this.SetDashboard(this.dashboard)
    // },
    // mafiaPartyController(){
    //   this.dashboard.mafiaParty = false
    //   this.SetDashboard(this.dashboard)
    // },
    // Reset Game From Start
    resetGame() {
      console.log('hard reset')
    },
    // Reset Game with Same Roles and Names
    rgwRoles() {
      console.log('soft reset')
    },
    // Set Actions by Priority
    // setActionsByPriority() {
    //   const filteredActions = this.gameSettings.selectedRoles.filter(x => x.status.hasAction && !x.actionStatus)
    //   const sorted = filteredActions.sort((a, b) => ((a.priority > b.priority) ? 1 : -1))
    //   this.dashboard.actionBox = sorted
    // },
    // Show God Dashboard
    showPlay() {
      this.dashboard.god = true
      this.SetDashboard(this.dashboard);
    },
    // Skip Action
    // skipAction() {
    //   this.alertBox = false;
    //   this.nextAction(0, 0);
    // },
  },
  mixins: [
    changePhase,
    characterClasses,
    getImg,
  ],
};

</script>
