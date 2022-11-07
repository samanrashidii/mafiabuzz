<template>
  <div>
    <img
      class="has-bottom-margin"
      src="@/assets/images/icons/error.svg"
      :alt="$t('general.notValidIcon')"
    >
    <ul class="error-bullet">
      <li
        v-if="errorStatus.mafia"
        v-html="$t('pages.home.errorText1', {
          number: mafiaNumbers,
          role: $t('common.Mafia'),
          chosen: GameSettings.aliveMafia
        })"
      />
      <li
        class="blue"
        v-if="errorStatus.citizens"
        v-html="$t('pages.home.errorText2', {
          number: citizenNumbers,
          role: $t('common.Citizen'),
          secondRole: $t('common.Solo'),
          chosen: GameSettings.aliveCitizen + GameSettings.aliveSolo
        })"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    errorStatus: Object,
    mafiaNumbers: Number,
    citizenNumbers: Number,
  },
  computed: {
    ...mapGetters({
      GameSettings: 'gameSettings/GameSettings'
    })
  }
}
</script>
