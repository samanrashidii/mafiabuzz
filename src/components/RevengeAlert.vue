<template>
  <div
    class="revenge-alert-box"
  >
    <p>
      <strong
        class="has-left-right-margin"
      >
        {{ dashboard.avenger }}
      </strong>
      {{ $t('god.avengerText') }}
    </p>
    <img
      src="@/assets/images/actions/kill.svg"
      class="default-image-size"
      :alt="$t('god.revengeIconAlt')"
    >
    <img
      src="@/assets/images/roles/revenge.svg"
      class="default-image-size"
      :alt="$t('god.revengeIconAlt')"
    >
    <p>
      {{ $t('god.revengeText') }}
    </p>
    <select
      v-model="revengeTarget"
      class="has-top-margin"
      name="last_day_target"
      @change="findTarget(revengeTarget)"
    >
      <option
        :value="null"
        disabled
      >
        {{ $t('god.selectPlaceholder') }}
      </option>
      <option
        v-for="(person, index) in checkGroupToSelectTarget()"
        :key="index"
      >
        {{ person.player }}
      </option>
    </select>
    <BaseButton
      @clicked="killByVote(dashboard.targetData.player, true)"
    >
      {{ $t('god.confirmButton') }}
    </BaseButton>
    <BaseButton
      class="danger"
      @clicked="deadWatcher(false)"
    >
      {{ $t('god.skipButton') }}
    </BaseButton>
  </div>
</template>

<script>

export default {
  name: 'RevengeAlert',
  data() {
    return {
      revengeTarget: null
    }
  },
  methods: {
    resetFactory() {
      // Reset Game With Selected Roles
      this.startGameEngine('roles-selected-create')
    },
    resetSameGame() {
      // Reset Game With Last Game Played Settings
      this.startGameEngine('roles-selected-dashboard')
    },
    toggleOverlay (value) {
      this.overlay = value
    },
    toggleResetGame (value) {
      this.resetGame = value
    }
  }
}
</script>
