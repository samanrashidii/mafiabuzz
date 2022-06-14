<template>
  <div class="action-box">
    <div class="player-box-holder has-small-bottom-margin">
      <div class="player-box">
        <img
          :src="getImg('/roles', player.icon)"
          :alt="$t('god.playerIconAlt')"
        >
        <h4
          class="has-xsmall-top-margin"
          :class="{'mafia-role': player.mafia,'citizen-role': !player.mafia && !player.solo, 'solo-role': !player.mafia && player.solo}"
        >
          {{ $t(player.name) }}
          <span>( {{ player.player }} )</span>
        </h4>
      </div>
      <div class="arrow">
        <span
          v-if="player.status.actionLimit > 0"
          class="action-limit"
        >
          {{ player.status.actionLimit }}
        </span>
        <img
          class="action-image"
          :src="getImg('/actions', player.actionIcon)"
          :alt="$t('god.playerActionIconAlt')"
        >
      </div>
      <div class="player-box">
        <template v-if="Object.keys(dashboard.targetData).length">
          <img
            :src="getImg('/roles', dashboard.targetData.icon)"
            :alt="$t('god.playerIconAlt')"
          >
          <h4
            class="has-xsmall-top-margin"
            :class="{'mafia-role': dashboard.targetData.mafia, 'citizen-role': !dashboard.targetData.mafia && !dashboard.targetData.solo, 'solo-role': !dashboard.targetData.mafia && dashboard.targetData.solo}"
          >
            {{ $t(dashboard.targetData.name) }}
            <span>( {{ dashboard.targetData.player }} )</span>
          </h4>
        </template>
        <template v-else>
          <img
            src="@/assets/images/roles/loader.svg"
            :alt="$t('replacingRoles.loading.name')"
          >
        </template>
      </div>
    </div>

    <div
      class="question"
      v-if="player.ability.chooseBoolean"
    >
      <div class="checkbox-box yes">
        <input
          type="checkbox"
          name="question"
          id="use_ability"
          v-model="useAbility"
          :value="true"
        >
        <label for="use_ability"><span>{{ $t('god.useAbility') }}</span></label>
      </div>
    </div>

    <template
      v-if="!player.ability.chooseBoolean"
    >
      <label
        for="action_target"
      >
        {{ $t('god.actionHintText') }}
      </label>
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
    </template>

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
    <AppButton @click.native="executeAction(player, actionTarget1, actionTarget2, playerIndex)">
      {{ $t('god.confirmButton') }}
    </AppButton>

    <template v-if="!force">
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
          src="@/assets/images/icons/warning.svg"
          :alt="$t('general.warningIcon')"
        >
        <template>
          <p>{{ $t('god.skipText') }}</p>
          <AppButton
            @click.native="skipAction(playerIndex)"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Overlay from '@/components/Overlay.vue';
import actionLog from '@/mixins/dashboard/actionLog';
import actions from '@/mixins/dashboard/actions';
import actionFilters from '@/mixins/dashboard/actionFilters';
import changePhase from '@/mixins/dashboard/changePhase';
import deadWatcher from '@/mixins/dashboard/deadWatcher';
import dice from '@/mixins/dashboard/dice';
import executeAction from '@/mixins/dashboard/executeAction';
import nextAction from '@/mixins/dashboard/nextAction';
import passiveActive from '@/mixins/dashboard/passiveActive';
import possibilities from '@/mixins/dashboard/possibilities';
import saveHistory from '@/mixins/dashboard/saveHistory';
import skipAction from '@/mixins/dashboard/skipAction';
import trackingStatus from '@/mixins/dashboard/trackingStatus';
import voteKiller from '@/mixins/dashboard/voteKiller';

export default {
  data() {
    return {
      actionTarget1: null,
      actionTarget2: null,
      useAbility: false,
      alertBox: false,
    };
  },
  components: {
    Overlay,
  },
  props: {
    player: {
      type: Object,
      default: false,
    },
    playerIndex: {
      type: Number,
      default: 0,
    },
    force: {
      type: Boolean,
      default: false,
    },
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
  },
  methods: {
    ...mapActions({
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
      SetReplacingRoles: 'roles/SetReplacingRoles',
    }),
    skipAction(index) {
      this.alertBox = false;
      this.nextAction(index);
    },
  },
  mixins: [
    actionLog,
    actions,
    actionFilters,
    changePhase,
    deadWatcher,
    dice,
    executeAction,
    nextAction,
    passiveActive,
    possibilities,
    saveHistory,
    skipAction,
    trackingStatus,
  ],
};
</script>
