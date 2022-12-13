<template>
  <div
    class="resetGameAlert"
  >
    <BaseButton
      class="active has-xsmall-bottom-margin"
      @clicked="toggleOverlay(true), toggleResetGame(false)"
    >
      {{ $t('god.rgwRoles') }}
    </BaseButton>
    <BaseButton
      class="danger has-bottom-margin"
      @clicked="toggleOverlay(true), toggleResetGame(true)"
    >
      {{ $t('god.resetGame') }}
    </BaseButton>
    <Overlay
      :class="{
        'active': overlay,
        'dialog': true
      }"
    >
      <img
        class="has-xsmall-bottom-margin"
        src="@/assets/images/icons/warning.svg"
        :alt="$t('general.warningIcon')"
      >
      <template
        v-if="!resetGame"
      >
        <p>
          {{ $t('god.resetText') }}
        </p>
        <BaseButton
          class="green "
          @clicked="resetSameGame()"
        >
          <span>
            {{ $t('god.restartButton') }}
          </span>
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="toggleOverlay(false)"
        >
          <span>
            {{ $t('god.cancelButton') }}
          </span>
        </BaseButton>
      </template>
      <template
        v-else
      >
        <p>
          {{ $t('god.resetTotalText') }}
        </p>
        <BaseButton
          class="green "
          @clicked="resetFactory()"
        >
          <span>
            {{ $t('god.startButton') }}
          </span>
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="toggleOverlay(false)"
        >
          <span>
            {{ $t('god.cancelButton') }}
          </span>
        </BaseButton>
      </template>
    </Overlay>
  </div>
</template>

<script>

export default {
  name: 'RestartGameAlert',
  data() {
    return {
      overlay: false,
      resetGame: false
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
