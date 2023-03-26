<template>
  <div
    class="game-settings"
  >
    <nav>
      <button
        v-for="(setting, index) in settings"
        :key="index"
        :class="{
          'active': setting.active
        }"
        @click="openSettings(setting.value, index)"
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
    <!-- Final Cards -->
    <FinalCards
      :class="{
        'active': cards
      }"
      @close="closeSettings"
    />
  </div>
</template>

<script>
import HistoryLog from '@/components/HistoryLog.vue';
import GameInquiry from '@/components/GameInquiry.vue';
import FinalCards from '@/components/FinalCards.vue';

export default {
  name: 'GameSettings',
  components: {
    HistoryLog,
    GameInquiry,
    FinalCards
  },
  data() {
    return {
      historyLog: false,
      safemode: false,
      inquiry: false,
      cards: false,
      settings: [
        {
          name: this.$t('god.gameSettings.showHistoryLog'),
          value: 'historyLog',
          active: false
        },
        {
          name: this.$t('god.gameSettings.safeMode'),
          value: 'safemode',
          active: false
        },
        {
          name: this.$t('god.gameSettings.inquiry'),
          value: 'inquiry',
          active: false
        },
        {
          name: this.$t('god.gameSettings.finalMoveCards'),
          value: 'cards',
          active: false
        }
      ]
    }
  },
  methods: {
    openSettings (setting, index) {
      this[setting] = true
      this.settings[index].active = !this.settings[index].active 
      if (setting === 'safemode') {
        this.gameSettings.safemode = !this.gameSettings.safemode
        this.SetGameSettings(this.gameSettings)
      }
    },
    closeSettings (setting) {
      this[setting] = false
      let settingIndex = 0
      this.settings.filter((item, index) => {
        if (item.value === setting) {
          settingIndex = index
        }
      })
      this.settings[settingIndex].active = false
    }
  }
}
</script>
