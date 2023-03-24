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
    <!-- History Log -->
    <HistoryLog
      :class="{
        'active': historyLog
      }"
      @close="closeSettings"
    />
    <!-- Game Inquiry -->
    <GameInquiry
      :show-numbers="inquiry"
      :class="{
        'active': inquiry
      }"
      @close="closeSettings"
    />
  </div>
</template>

<script>
import HistoryLog from '@/components/HistoryLog.vue';
import GameInquiry from '@/components/GameInquiry.vue';

export default {
  name: 'GameSettings',
  components: {
    HistoryLog,
    GameInquiry
  },
  data() {
    return {
      historyLog: false,
      safemode: false,
      inquiry: false
    }
  },
  computed: {
    settings () {
      const output = [
        {
          name: this.$t('god.gameSettings.showHistoryLog'),
          value: 'historyLog'
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
      return output
    }
  },
  methods: {
    openSettings (setting) {
      this[setting] = true
      if (setting === 'safemode') {
        this.gameSettings.safemode = !this.gameSettings.safemode
        this.SetGameSettings(this.gameSettings)
      }
    },
    closeSettings (setting) {
      this[setting] = false
    }
  }
}
</script>
