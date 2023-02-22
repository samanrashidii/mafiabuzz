<template>
  <BaseButton
    class="submit-btn danger has-top-margin has-bottom-margin"
    @clicked="removeCharacter()"
  >
    <span>
      {{ $t('deleteCharacter.deleteCharacter') }}
    </span>
  </BaseButton>
</template>

<script>

export default {
  props: {
    character: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    removeCharacter () {
      const newCharactersAfterRemove = this.Roles.filter((role) => role.id !== this.character.id)
      const savedCharacters = JSON.parse(localStorage.getItem('saved-characters'))
      const newSavedCharacters = savedCharacters.filter((role) => role.id !== this.character.id)
      const newSelectedRoles = this.gameSettings.selectedRoles.filter((role) => role.id !== this.character.id)
      this.gameSettings.selectedRoles = newSelectedRoles
      this.SetGameSettingsItem({
        selectedRoles: newSelectedRoles
      })
      this.SetGameSettings(this.gameSettings)
      this.SetRoles(newCharactersAfterRemove)
      localStorage.setItem('saved-characters', JSON.stringify(newSavedCharacters))
    }
  }
}
</script>
