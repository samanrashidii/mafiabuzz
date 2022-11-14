<template>
  <Overlay
    class="main-alert saved-game-alert"
    :class="{'active': overlay}"
  >
    <template>
      <img
        src="@/assets/images/savedgame.svg"
        :alt="$t('general.loadFromLastgameMessage')"
      >
      <h3
        v-html="$t('general.loadFromLastgameMessage')"
      />
      <BaseButton
        class="green disc-bttn"
        @clicked="loadFromSave()"
      >
        <span>
          {{ $t('common.loadLastGameButton') }}
        </span>
      </BaseButton>
      <BaseButton
        class="blue start-bttn"
        @clicked="resetFactory()"
      >
        <span>
          {{ $t('common.startNewGameButton') }}
        </span>
      </BaseButton>
      <BaseButton
        class="danger exit-bttn"
        @clicked="clearStorage()"
      >
        <span>
          {{ $t('common.clearStorage') }}
        </span>
      </BaseButton>
    </template>
  </Overlay>
</template>

<script>

export default {
  data () {
    return {
      overlay: false
    }
  },
  mounted () {
    const capturedState = JSON.parse(localStorage.getItem('capturedState'))
    if (capturedState) {
      this.overlay = true
    }
  },
  methods: {
    loadFromSave () {
      this.startGameEngine('captured')
      this.overlay = false
    },
    resetFactory () {
      this.startGameEngine('default')
      this.overlay = false
    },
    clearStorage () {
      localStorage.clear()
      this.overlay = false
    }
  }
}
</script>
