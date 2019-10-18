<template>
  <div
    class="priority-box"
  >
    <!-- Before Action Box -->
    <transition name="fade">
      <div
        class="before-action-box"
        v-if="dashboard.lastPhaseAction && dashboard.round > 1 || dashboard.mafiaParty && dashboard.round === 1"
      >
        <div class="table-display">
          <div class="table-cell-display">

            <template v-if="dashboard.lastPhaseAction && dashboard.round > 1">
              <img
                :src="getImgUrl('/roles', $t('god.voteIcon'))"
                :alt="$t('god.deadIconAlt')"
              >
              <p>{{ $t('god.lastPhaseText') }}</p>
              <select
                name="last_day_target"
                v-model="lastDayTarget"
                @change="findTarget(lastDayTarget)"
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
              <app-button @click.native="killByVote(dashboard.targetData.player)">
                {{ $t('god.confirmButton') }}
              </app-button>
              <app-button
                class="danger"
                @click.native="lastPhaseController()"
              >
                {{ $t('god.skipButton') }}
              </app-button>
            </template>

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
                @click.native="mafiaPartyController()"
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
      <a
        class="prev-action"
        href="javascript:void(0)"
        @click="navigateActions(dashboard.actionProgress, 'prev')"
        v-if="dashboard.actionProgress !== 0"
      />
      <div class="bar-holder">
        <span :style="{width: progress+'%'}" />
        <i><strong>{{ dashboard.actionProgress }}</strong> / {{ dashboard.actionBox.length }}</i>
      </div>
      <a
        class="next-action"
        href="javascript:void(0)"
        @click="navigateActions(dashboard.actionProgress, 'next')"
        v-if="dashboard.actionProgress !== dashboard.actionBox.length"
      />
    </div>

    <!-- Handle Actions -->

    <div>
      <div
        class="action-box"
        v-for="(player, index) in dashboard.actionBox"
        :key="index"
      >
        <!-- Actions Overlay -->
        <template v-if="dashboard.actionProgress === index">
          <div
            class="action-overlay hacked-overlay"
            v-if="checkStatus(player).status.hacked"
            key="hackedTarget"
          >
            <div class="table-display">
              <div class="table-cell-display">
                <img
                  :src="getImgUrl('/roles', $t('god.hackedIcon'))"
                  :alt="$t('god.hackedIconAlt')"
                >
                <p><span>{{ $t(player.name) }} </span> <strong v-html="$t('god.hackedPerson')" /></p>
                <app-button
                  class="purple"
                  @click.native="skipAction(index)"
                >
                  {{ $t('god.skipButton3') }}
                </app-button>
              </div>
            </div>
          </div>
          <div
            class="action-overlay dead-overlay"
            v-if="checkStatus(player).status.dead"
            key="deadTarget"
          >
            <div class="table-display">
              <div class="table-cell-display">
                <div class="has-clear-fix">
                  <img
                    :src="getImgUrl('/roles', $t('god.deadIcon'))"
                    :alt="$t('god.deadIconAlt')"
                  >
                  <img
                    class="overlap"
                    :src="getImgUrl('/roles', player.icon)"
                    :alt="$t('god.playerIconAlt')"
                  >
                </div>
                <p><span>{{ $t(player.name) }} </span> <strong v-html="$t('god.deadPerson')" /></p>
                <app-button
                  class="black"
                  @click.native="skipAction(index)"
                >
                  {{ $t('god.skipButton3') }}
                </app-button>
              </div>
            </div>
          </div>

          <p>{{ $t('god.actionQuestion1') }}<span :class="{'mafia-role': player.mafia, 'citizen-role': !player.mafia}"> {{ $t(player.name) }} </span> {{ $t('god.actionQuestion2') }} <strong>{{ $t(player.action.action) }}</strong> ?</p>
          <div class="player-box-holder has-small-bottom-margin">
            <div class="player-box">
              <img
                :src="getImgUrl('/roles', player.icon)"
                :alt="$t('god.playerIconAlt')"
              >
              <h4
                class="has-xsmall-top-margin"
                :class="{'mafia-role': player.mafia,'citizen-role': !player.mafia}"
              >
                {{ player.player }}
              </h4>
            </div>
            <div class="arrow">
              <img
                class="action-image"
                :src="getImgUrl('/actions', player.actionIcon)"
                :alt="$t('god.playerActionIconAlt')"
              >
            </div>
            <div class="player-box">
              <template v-if="Object.keys(dashboard.targetData).length">
                <img
                  :src="getImgUrl('/roles', dashboard.targetData.icon)"
                  :alt="$t('god.playerIconAlt')"
                >
                <h4
                  class="has-xsmall-top-margin"
                  :class="{'mafia-role': dashboard.targetData.mafia, 'citizen-role': !dashboard.targetData.mafia}"
                >
                  {{ $t(dashboard.targetData.name) }}
                </h4>
              </template>
              <template v-else>
                <img
                  :src="getImgUrl('/roles', $t('replacingRoles.loading.icon'))"
                  :alt="$t('replacingRoles.loading.name')"
                >
              </template>
            </div>
          </div>
          <select
            @change="findTarget(actionTarget1)"
            name="action_target"
            v-model="actionTarget1"
          >
            <option
              :value="null"
              disabled
            >
              {{ $t('god.selectPlaceholder') }}
            </option>
            <option
              v-for="(person, index) in checkGroup(player)"
              :key="index"
            >
              {{ person.player }}
            </option>
          </select>
          <template v-if="player.ability.binder && actionTarget1 !== null">
            <label for="action_target_2">{{ $t('god.actionHintText2') }}</label>
            <select
              name="action_target_2"
              v-model="actionTarget2"
            >
              <option
                :value="null"
                disabled
              >
                {{ $t('god.selectPlaceholder') }}
              </option>
              <option
                v-for="(person, index) in checkSecondGroup(player)"
                :key="index"
              >
                {{ person.player }}
              </option>
            </select>
          </template>
          <!-- Action Buttons -->
          <AppButton @click.native="executeAction(player, actionTarget1, actionTarget2, index)">
            {{ $t('god.confirmButton') }}
          </AppButton>
          <AppButton
            class="danger"
            @click.native="alertBox = true"
          >
            {{ $t('god.skipButton') }}
          </AppButton>

          <!-- Alert Box -->
          <Overlay :class="{'active': alertBox,'dialog': true}">
            <img
              class="has-xsmall-bottom-margin"
              :src="getImgUrl('/icons', $t('general.warning'))"
              :alt="$t('general.warningIcon')"
            >
            <template>
              <p>{{ $t('god.skipText') }}</p>
              <AppButton
                @click.native="skipAction(index)"
                class="green"
              >
                <span>{{ $t('god.skipButton2') }}</span>
              </AppButton>
              <AppButton
                @click.native="alertBox = false"
                class="danger"
              >
                <span>{{ $t('god.cancelButton') }}</span>
              </AppButton>
            </template>
          </Overlay>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Overlay from '@/components/Overlay.vue';
import getImg from '@/mixins/getImg';
import actionLog from '@/mixins/dashboard/actionLog';
import actions from '@/mixins/dashboard/actions';
import actionFilters from '@/mixins/dashboard/actionFilters';
import executeAction from '@/mixins/dashboard/executeAction';
import navigateActions from '@/mixins/dashboard/navigateActions';
import nextAction from '@/mixins/dashboard/nextAction';
import passiveActive from '@/mixins/dashboard/passiveActive';
import voteKiller from '@/mixins/dashboard/voteKiller';

export default {
  data() {
    return {
      actionTarget1: null,
      actionTarget2: null,
      alertBox: false,
      lastDayTarget: null,
    };
  },
  components: {
    Overlay,
  },
  computed: {
    ...mapGetters({
      Dashboard: 'dashboard/Dashboard',
      GameSettings: 'gameStatus/GameSettings',
      ReplacingRoles: 'roles/ReplacingRoles',
      DefaultState: 'DefaultState',
    }),
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings));
    },
    dashboard() {
      return JSON.parse(JSON.stringify(this.Dashboard));
    },
    replacingRoles() {
      return JSON.parse(JSON.stringify(this.ReplacingRoles));
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
    skipAction(index) {
      this.alertBox = false;
      this.nextAction(index);
    },
    trackingStatus(status) {
      this.dashboard.freezeStatus.linked = status.linked,
      this.dashboard.freezeStatus.hacked = status.hacked,
      this.dashboard.freezeStatus.silenced = status.silenced,
      this.dashboard.freezeStatus.healed = status.healed;
    },
    checkStatus(player) {
      let target = '';
      if (player) {
        this.gameSettings.selectedRoles.forEach((element) => {
          if (element.player === player.player) {
            target = element;
          }
        });
      }
      return target;
    },
    lastPhaseController() {
      this.dashboard.lastPhaseAction = false;
      this.SetDashboard(this.dashboard);
    },
    mafiaPartyController() {
      this.dashboard.mafiaParty = false;
      this.SetDashboard(this.dashboard);
    },
  },
  mixins: [
    actionLog,
    actions,
    actionFilters,
    executeAction,
    getImg,
    navigateActions,
    nextAction,
    passiveActive,
    voteKiller
  ],
};
</script>
