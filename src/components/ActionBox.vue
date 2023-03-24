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
          :title="$t('god.remainingActions')"
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
          <div
            class="other-targets"
          >
            <img
              v-for="(targetIcon, index) in targetIcons"
              :src="getImg('/roles', targetIcon)"
              :alt="$t('god.playerIconAlt')"
            >
          </div>
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
          v-model="useAbility"
          id="use_ability"
          type="checkbox"
          name="question"
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
      v-else
    >
      <div
        v-for="number in (player.status.targetNumbers)"
        :key="number"
        class="select-targets"
      >
        <label
        :for="`action_target_${number}`"
        >
          <span
            v-if="number === 1"
          >
            {{ $t('god.actionHintText') }}
          </span>
          <span
            v-else
          >
            {{ $t('god.actionHintText2') }}
          </span>
        </label>
        <select
          v-model="targets[number - 1]"
          name="action_target"
          @change="findTarget(targets[0])"
        >
          <option
            :value="null"
            disabled
          >
            {{ $t('god.selectPlaceholder') }}
          </option>
          <option
            v-for="(person, index) in checkGroupToSelectTarget(player)"
            :key="index"
          >
            {{ person.player }}
          </option>
        </select>
      </div>
    </template>

    <!-- Action Buttons -->
    <BaseButton
      @clicked.once="executeAction(player, targets, playerIndex)"
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

export default {
  name: 'ActionBox',
  data() {
    return {
      targets: [],
      useAbility: false,
      alertBox: false
    }
  },
  computed: {
    targetIcons () {
      const icons = []
      this.gameSettings.selectedRoles.forEach((role) => {
        this.targets.forEach((target) => {
          if (target === role.player && target !== this.dashboard.targetData.player) {
            icons.push(role.icon)
          }
        })
      })
      return icons
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
  }
}
</script>
