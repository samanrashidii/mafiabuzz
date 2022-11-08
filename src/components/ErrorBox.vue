<template>
  <div
    class="error-box"
  >
    <img
      class="has-bottom-margin"
      src="@/assets/images/icons/error.svg"
      :alt="$t('general.notValidIcon')"
    >
    <ul
      class="error-bullet"
    >
      <li
        v-if="errorStatus.mafia"
        v-html="$t('pages.home.errorText1', {
          number: mafiaNumbers,
          role: $t('common.Mafia'),
          chosen: gameSettings.aliveMafia
        })"
      />
      <li
        v-if="errorStatus.citizens"
        v-html="$t('pages.home.errorText2', {
          number: citizenNumbers,
          role: $t('common.Citizen'),
          secondRole: $t('common.Solo'),
          chosen: gameSettings.aliveCitizen + gameSettings.aliveSolo
        })"
        class="blue"
      />
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    errorStatus: {
      type: Object,
      default: () => {}
    },
    mafiaNumbers: {
      type: Number,
      default: 0
    },
    citizenNumbers: {
      type: Number,
      default: 0
    }
  }
}
</script>
