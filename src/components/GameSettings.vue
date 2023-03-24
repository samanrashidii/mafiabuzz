<template>
  <div
    class="game-settings"
  >
    <nav>
      <button
        v-for="(setting, index) in settings"
        :key="index"
        @click="openSettings(setting.value)"
      >
        <span>
          <img
            :src="getImg('/icons', setting.value + '.svg')"
            :alt="setting.name"
          >
          <strong>
            {{ setting.name }}
          </strong>
        </span>
      </button>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'GameSettings',
  data() {
    return {
      settings: [
        {
          name: this.$t('god.gameSettings.showHistoryLog'),
          value: 'history'
        },
        {
          name: this.$t('god.gameSettings.safeMode'),
          value: 'safemode'
        },
        {
          name: this.$t('god.gameSettings.inquiry'),
          value: 'inquiry'
        },
        {
          name: this.$t('god.gameSettings.finalMoveCards'),
          value: 'cards'
        }
      ]
    }
  },
  methods: {
    openSettings (setting) {
      this.$emit('openSettings', setting)
    }
  }
}
</script>
