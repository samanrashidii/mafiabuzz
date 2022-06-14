<template>
  <div class="step-box">
    <p v-html="$t(`pages.home.step${index}`)" />
    <select
      @change="calcVal"
      name="quantity"
      id="quantity"
      v-model.number="selectedVal"
    >
      <option
        value="null"
        disabled
      >
        {{ $t('general.selectPlaceholder') }}
      </option>
      <option
        v-for="(n, index) in value"
        :key="index"
      >
        {{ n + margin }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    type: String
  },
  data() {
    return {
      selectedVal: 0
    }
  },
  computed: {
    ...mapGetters({
      GameSettings: 'gameStatus/GameSettings'
    }),
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings))
    },
    index() {
      return this.type === 'totalUnit' ? 1 : 2
    },
    value() {
      return this.type === 'totalUnit' ? this.gameSettings.totalPlayers : this.calcMafia
    },
    margin() {
      return this.type === 'totalUnit' ? this.gameSettings.playerMargin : 0
    },
    calcMafia() {
      return Math.floor(this.gameSettings.unit / 2) - 1
    },
    calcCitizen() {
      return this.gameSettings.unit - this.gameSettings.mafia
    },
    bestCombo() {
      return Math.floor(this.gameSettings.unit / 3)
    }
  },
  created() {
    this.type === 'totalUnit' ? this.selectedVal = this.gameSettings.unit : this.selectedVal = this.gameSettings.mafia
  },
  updated() {
    if (this.type === 'totalMafia' && this.selectedVal > this.calcMafia) {
      this.selectedVal = this.bestCombo
      this.gameSettings.mafia = this.bestCombo
      this.gameSettings.citizen = this.calcCitizen
      this.SetGameSettings(this.gameSettings)
    }
  },
  methods: {
    ...mapActions({
      SetGameSettings: 'gameStatus/SetGameSettings'
    }),
    calcVal() {
      this.type === 'totalUnit' ? this.gameSettings.unit = this.selectedVal : this.gameSettings.mafia = this.selectedVal
      this.gameSettings.citizen = this.calcCitizen
      this.SetGameSettings(this.gameSettings)
    }
  }
}
</script>
