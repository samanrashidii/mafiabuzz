<template>
  <div
    class="action-box"
  >
    <div
      class="player-box-holder has-small-bottom-margin"
    >
      <div
        class="player-box"
      >
        <img
          :src="getImg('/roles', player.icon)"
          :alt="$t('god.playerIconAlt')"
        >
        <h4
          class="has-xsmall-top-margin"
          :class="{'mafia-role': player.mafia,'citizen-role': !player.mafia && !player.solo, 'solo-role': !player.mafia && player.solo}"
        >
          {{ player.info[currentLang].name }}
          <span>( {{ player.player }} )</span>
        </h4>
      </div>
      <div
        class="arrow"
      >
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
      <div
        class="player-box"
      >
        <template
          v-if="Object.keys(dashboard.targetData).length"
        >
          <img
            :src="getImg('/roles', dashboard.targetData.icon)"
            :alt="$t('god.playerIconAlt')"
          >
          <h4
            class="has-xsmall-top-margin"
            :class="{'mafia-role': dashboard.targetData.mafia, 'citizen-role': !dashboard.targetData.mafia && !dashboard.targetData.solo, 'solo-role': !dashboard.targetData.mafia && dashboard.targetData.solo}"
          >
            {{ dashboard.targetData.info[currentLang].name }}
            <span>( {{ dashboard.targetData.player }} )</span>
          </h4>
        </template>
        <template
          v-else
        >
          <img
            src="@/assets/images/roles/loader.svg"
            alt="Loader"
          >
        </template>
      </div>
    </div>

    <div
      v-if="player.ability.chooseBoolean"
      class="question"
    >
      <div
        class="checkbox-box yes"
      >
        <input
          type="checkbox"
          name="question"
          id="use_ability"
          v-model="useAbility"
          :value="true"
        >
        <label
          for="use_ability"
        >
          <span>
            {{ $t('god.useAbility') }}
          </span>
        </label>
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

    <template
      v-if="player.ability.binder && actionTarget1 !== null"
    >
      <label
        for="action_target_2"
      >
        {{ $t('god.actionHintText2') }}
      </label>
      <select
        v-model="actionTarget2"
        name="action_target_2"
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
    <BaseButton
      @clicked="executeAction(player, actionTarget1, actionTarget2, playerIndex)"
    >
      {{ $t('god.confirmButton') }}
    </BaseButton>

    <template
      v-if="!force"
    >
      <BaseButton
        class="danger"
        @clicked="alertBox = true"
      >
        {{ $t('god.skipButton') }}
      </BaseButton>
      <!-- Alert Box -->
      <Overlay
        :class="{
          'active': alertBox,
          'dialog': true
        }"
      >
        <img
          src="@/assets/images/icons/warning.svg"
          :alt="$t('general.warningIcon')"
          class="has-xsmall-bottom-margin"
        >
        <template>
          <p>
            {{ $t('god.skipText') }}
          </p>
          <BaseButton
            class="green"
            @clicked="skipAction(playerIndex)"
          >
            <span>
              {{ $t('god.skipButton2') }}
            </span>
          </BaseButton>
          <BaseButton
            class="danger"
            @clicked="alertBox = false"
          >
            <span>
              {{ $t('god.cancelButton') }}
            </span>
          </BaseButton>
        </template>
      </Overlay>
    </template>
  </div>
</template>

<script>
import actionLog from '@/mixins/actionLog';
import actions from '@/mixins/actions';
import actionFilters from '@/mixins/actionFilters';
import changePhase from '@/mixins/changePhase';
import deadWatcher from '@/mixins/deadWatcher';
import dice from '@/mixins/dice';
import executeAction from '@/mixins/executeAction';
import nextAction from '@/mixins/nextAction';
import passiveActive from '@/mixins/passiveActive';
import possibilities from '@/mixins/possibilities';
import saveHistory from '@/mixins/saveHistory';
import skipAction from '@/mixins/skipAction';
import trackingStatus from '@/mixins/trackingStatus';
import voteKiller from '@/mixins/voteKiller';

export default {
  data() {
    return {
      actionTarget1: null,
      actionTarget2: null,
      useAbility: false,
      alertBox: false
    }
  },
  props: {
    player: {
      type: Object,
      default: false
    },
    playerIndex: {
      type: Number,
      default: 0
    },
    force: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    skipAction(index) {
      this.alertBox = false
      this.nextAction(index)
    }
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
    voteKiller
  ]
}
</script>
