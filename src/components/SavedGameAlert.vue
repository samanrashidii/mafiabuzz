<template>
  <PageBox
    class="dark-inside saved-game-alert center-aligned has-small-top-margin"
  >
    <img
      src="@/assets/images/savedgame.svg"
      :alt="$t('general.loadFromLastgameMessage')"
      class="max-width-image"
    >
    <h4
      v-html="$t('general.loadFromLastgameMessage')"
      class="has-top-margin has-bottom-margin"
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
      class="secondary start-bttn"
      @clicked="resetFactory()"
    >
      <span>
        {{ $t('common.startNewGameButton') }}
      </span>
    </BaseButton>
    <BaseButton
      class="primary exit-bttn"
      @clicked="clearStorage()"
    >
      <span>
        {{ $t('common.clearStorage') }}
      </span>
    </BaseButton>
  </PageBox>
</template>

<script>

export default {
  methods: {
    loadFromSave () {
      this.startGameEngine('autosave')
      this.SetGameSettingsItem({
        hasSavedGame: false
      })
    },
    resetFactory () {
      this.startGameEngine('roles-selected-create')
      this.SetGameSettingsItem({
        hasSavedGame: false
      })
    },
    clearStorage () {
      localStorage.clear()
      this.SetGameSettingsItem({
        hasSavedGame: false
      })
    }
  }
}
</script>
