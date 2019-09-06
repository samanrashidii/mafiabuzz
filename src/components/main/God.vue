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

    <!-- Night Priority Action Box -->

    <transition name="fade">
      <div
        class="priority-box"
        v-if="!dashboard.day && dashboard.actionBox.length !== dashboard.actionProgress"
      >
        <!-- Before Action Box -->
        <transition name="fade">
          <div
            class="before-action-box"
            v-if="dashboard.lastPhaseAction && dashboard.round > 1 || dashboard.mafiaParty && dashboard.round === 1"
          >
            <div class="table-display">
              <div class="table-cell-display">
                <!-- Last Phase Action -->
                <template v-if="dashboard.lastPhaseAction && dashboard.round > 1">
                  <img
                    :src="getImgUrl('/roles', $t('god.voteIcon'))"
                    :alt="$t('god.deadIconAlt')"
                  >
                  <p>{{ $t('god.lastPhaseText') }}</p>
                  <select
                    name="action_target"
                    v-model="dashboard.log.target"
                  >
                    <option
                      :value="null"
                      disabled
                    >
                      {{ $t('god.selectPlaceholder') }}
                    </option>
                    <option
                      v-for="(person, index) in checkGroup('lastDay')"
                      :key="index"
                    >
                      {{ person.player }}
                    </option>
                  </select>
                  <app-button @click.native="killByVote(dashboard.log.target)">
                    {{ $t('god.confirmButton') }}
                  </app-button>
                  <app-button
                    class="danger"
                    @click.native="dashboard.lastPhaseAction = false"
                  >
                    {{ $t('god.skipButton') }}
                  </app-button>
                </template>
                <!-- Last Phase Action -->
                <template v-else-if="dashboard.mafiaParty && dashboard.round === 1">
                  <img
                    :src="getImgUrl('/roles', $t('god.mafiaPartyIcon'))"
                    :alt="$t('god.mafiaPartyIconAlt')"
                  >
                  <p class="site-color">
                    {{ $t('god.mafiaPartyText') }}
                  </p>
                  <ul class="error-bullet type-2">
                    <li
                      v-for="(mp, index) in $t('god.mafiaPartyException')"
                      :key="index"
                      v-html="mp"
                    />
                  </ul>
                  <app-button
                    class="has-small-top-margin"
                    @click.native="dashboard.mafiaParty = false"
                  >
                    {{ $t('god.mafiaPartyButton') }}
                  </app-button>
                </template>
              </div>
            </div>
          </div>
        </transition>

        <!-- Actions Progress Bar -->
        <div class="progress-bar">
          <span :style="{width: dashboard.actionProgress+'%'}" />
          <i><strong>{{ dashboard.actionProgress }}</strong> / {{ dashboard.actionBox.length }}</i>
        </div>

        <!-- Handle Actions -->

        <div v-if="dashboard.actionBox.length > 0">
          <template v-for="(action, index) in dashboard.actionBox">
            <div
              class="action-box"
              v-if="readyActions(action, index)"
              :key="index"
            >
              {{ fireAction(action) }}

              <transition
                name="fade"
                mode="out-in"
              >
                <!-- Hacked Target Action -->
                <div
                  class="action-overlay hacked-overlay"
                  v-if="dashboard.targetHacked"
                  key="hackedTarget"
                >
                  <div class="table-display">
                    <div class="table-cell-display">
                      <img
                        :src="getImgUrl('/roles', $t('god.hackedIcon'))"
                        :alt="$t('god.hackedIconAlt')"
                      >
                      <p><span :class="{'mafia-role': dashboard.info.mafia, 'citizen-role': !dashboard.info.mafia}">{{ $t(dashboard.info.name2) }} </span> <strong v-html="$t('god.hackedPerson')" /></p>
                      <app-button
                        class="purple"
                        @click.native="skipAction()"
                      >
                        {{ $t('god.skipButton3') }}
                      </app-button>
                    </div>
                  </div>
                </div>
                <!-- Dead Target Action -->
                <div
                  class="action-overlay dead-overlay"
                  v-else-if="dashboard.targetDead"
                  key="deadTarget"
                >
                  <div class="table-display">
                    <div class="table-cell-display">
                      <img
                        :src="getImgUrl('/roles', $t('god.deadIcon'))"
                        :alt="$t('god.deadIconAlt')"
                      >
                      <img
                        class="overlap"
                        :src="getImgUrl('/roles', $t(dashboard.info.icon2))"
                        :alt="$t('god.playerIconAlt')"
                      >
                      <p><span :class="{'mafia-role': dashboard.info.mafia, 'citizen-role': !dashboard.info.mafia}">{{ $t(dashboard.info.name2) }} </span> <strong v-html="$t('god.deadPerson')" /></p>
                      <app-button
                        class="black"
                        @click.native="skipAction()"
                      >
                        {{ $t('god.skipButton3') }}
                      </app-button>
                    </div>
                  </div>
                </div>
                <!-- Revived Target Action -->
                <div
                  class="action-overlay dead-overlay"
                  v-else-if="dashboard.targetRevived"
                  key="revivedTarget"
                >
                  <div class="table-display">
                    <div class="table-cell-display">
                      <img
                        :src="getImgUrl('/roles', $t(dashboard.info.icon2))"
                        :alt="$t('god.revivedIconAlt')"
                      >
                      <p><span :class="{'mafia-role': dashboard.info.mafia, 'citizen-role': !dashboard.info.mafia}">{{ dashboard.info.player }} </span> <strong v-html="$t('god.revivedPerson')" /></p>
                      <app-button
                        class="black"
                        @click.native="skipAction()"
                      >
                        {{ $t('god.skipButton3') }}
                      </app-button>
                    </div>
                  </div>
                </div>
              </transition>

              <p>{{ $t('god.actionQuestion1') }}<span :class="{'mafia-role': dashboard.info.mafia, 'citizen-role': !dashboard.info.mafia}"> {{ $t(dashboard.info.name2) }} </span> {{ $t('god.actionQuestion2') }} <strong>{{ $t(dashboard.info.action) }}</strong> ?</p>
              <div class="player-box-holder has-small-bottom-margin">
                <div class="player-box">
                  <img
                    :src="getImgUrl('/roles', $t(dashboard.info.icon2))"
                    :alt="$t('god.playerIconAlt')"
                  >
                  <h4
                    class="has-xsmall-top-margin"
                    :class="{'mafia-role': dashboard.info.mafia,'citizen-role': !dashboard.info.mafia}"
                  >
                    {{ dashboard.info.player }}
                  </h4>
                </div>
                <div class="arrow">
                  <img
                    class="action-image"
                    :src="getImgUrl('/actions', $t(dashboard.info.actionIcon))"
                    :alt="$t('god.playerActionIconAlt')"
                  >
                </div>
                <div class="player-box">
                  <img
                    :src="getImgUrl('/roles', $t(dashboard.info.targetIcon))"
                    :alt="$t('god.playerIconAlt')"
                  >
                  <h4
                    class="has-xsmall-top-margin"
                    :class="{'mafia-role': dashboard.info.targetMafia != null && dashboard.info.targetMafia, 'citizen-role': dashboard.info.targetMafia !== null && !dashboard.info.targetMafia}"
                  >
                    {{ dashboard.info.target }}
                  </h4>
                </div>
              </div>
              <select
                @change="findTarget(dashboard.log.target, dashboard.log.targetID)"
                name="action_target"
                v-model="dashboard.log.target"
              >
                <option
                  :value="null"
                  disabled
                >
                  {{ $t('god.selectPlaceholder') }}
                </option>
                <option
                  v-for="(person, index) in checkGroup(dashboard.info)"
                  :key="index"
                >
                  {{ person.player }}
                </option>
              </select>
              <template v-if="dashboard.info.ability.binder && dashboard.log.target !== null">
                <label for="action_target_2">{{ $t('god.actionHintText2') }}</label>
                <select
                  name="action_target_2"
                  v-model="dashboard.log.target2"
                >
                  <option
                    :value="null"
                    disabled
                  >
                    {{ $t('god.selectPlaceholder') }}
                  </option>
                  <option
                    v-for="(person, index) in checkSecondGroup(dashboard.info)"
                    :key="index"
                  >
                    {{ person.player }}
                  </option>
                </select>
              </template>
            </div>
          </template>
        </div>

        <!-- Action Buttons -->
        <app-button @click.native="executeAction(dashboard.info)">
          {{ $t('god.confirmButton') }}
        </app-button>
        <app-button
          class="danger"
          @click.native="alertBox = true"
        >
          {{ $t('god.skipButton') }}
        </app-button>

        <!-- Log Actions During Night -->
        <overlay :class="{'active': logAction, 'log': true, 'done': logActionDone}">
          <div class="log-action">
            <img
              :src="getImgUrl('/actions', $t(dashboard.log.actionIcon))"
              :alt="$t('god.actionIconAlt')"
              v-if="!dashboard.log.passiveLog"
            >
            <img
              :src="getImgUrl('/roles', $t(dashboard.log.passiveIcon))"
              :alt="dashboard.log.target"
              v-else
            >
            <log-events
              v-if="dashboard.readyToLog"
              :log="dashboard.log"
            />
          </div>
        </overlay>
      </div>
    </transition>

    <!-- Alert Box -->

    <overlay :class="{'active': alertBox,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        :src="require(`@/assets/images/icons/warning.png`)"
        :alt="$t('general.warningIcon')"
      >
      <template>
        <p>{{ $t('god.skipText') }}</p>
        <app-button
          @click.native="skipAction()"
          class="green"
        >
          <span>{{ $t('god.skipButton2') }}</span>
        </app-button>
        <app-button
          @click.native="alertBox = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </app-button>
      </template>
    </overlay>

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

    <!-- Last Night Log -->

    <overlay :class="{'active': dashboard.lastNightBox, 'dialog': true, 'last-night': true}">
      <img
        :src="getImgUrl('/roles', $t('god.peopleIcon'))"
        :alt="$t('god.peopleIconAlt')"
      >
      <h2>{{ $t('god.lastNightTitle') }}</h2>
      <ul>
        <li
          v-for="(nL, index) in dashboard.lastNight"
          :key="index"
          v-html="nL"
        />
      </ul>
      <app-button
        @click.native="dashboard.lastNightBox = false"
        class="active"
      >
        <span>{{ $t('god.logCloseButton') }}</span>
      </app-button>
    </overlay>

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
              <info-box :info="dashboard.info" />

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
          </div>
        </transition-group>
      </div>
    </div>

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
import { mapGetters, mapActions } from 'vuex';
import Overlay from '@/components/Overlay.vue';
import InfoBox from '@/components/InfoBox.vue';
import Log from '@/components/Log.vue';
import getImg from '@/mixins/getImg';
import actions from '@/mixins/dashboard/actions';
import changePhase from '@/mixins/dashboard/changePhase';
import characterClasses from '@/mixins/dashboard/characterClasses';
import checkGroup from '@/mixins/dashboard/checkGroup';
import chooseKiller from '@/mixins/dashboard/chooseKiller';
import findTarget from '@/mixins/dashboard/findTarget';
import fireAction from '@/mixins/dashboard/fireAction';
import godActions from '@/mixins/dashboard/godActions';
import nextAction from '@/mixins/dashboard/nextAction';
import passiveControl from '@/mixins/dashboard/passiveControl';
import readyActions from '@/mixins/dashboard/readyActions';
import voteKiller from '@/mixins/dashboard/voteKiller';

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
    progress() {
      return (this.dashboard.actionProgress / this.dashboard.actionBox.length) * 100;
    },
  },
  methods: {
    ...mapActions({
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    // Reset Game From Start
    resetGame() {
      console.log('hard reset')
    },
    // Reset Game with Same Roles and Names
    rgwRoles() {
      console.log('soft reset')
    },
    // Set Actions by Priority
    setActionsByPriority() {
      const filteredActions = this.gameSettings.selectedRoles.filter(x => x.status.hasAction && !x.actionStatus)
      const sorted = filteredActions.sort((a, b) => ((a.priority > b.priority) ? 1 : -1))
      this.dashboard.actionBox = sorted
      this.SetDashboard(this.dashboard)
    },
    // Show God Dashboard
    showPlay() {
      this.dashboard.god = true
      this.SetDashboard(this.dashboard);
    },
    // Skip Action
    skipAction() {
      this.alertBox = false;
      this.nextAction(0, 0);
    },
  },
  mixins: [
    actions,
    changePhase,
    characterClasses,
    checkGroup,
    chooseKiller,
    findTarget,
    fireAction,
    getImg,
    godActions,
    nextAction,
    passiveControl,
    readyActions,
    voteKiller
  ],
};

</script>
