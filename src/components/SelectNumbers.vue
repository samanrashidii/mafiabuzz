<template>
  <div
    class="select-numbers step-box"
  >
    <p
      v-html="$t(`pages.home.step${index}`)"
    />
    <select
      v-model.number="selectedVal"
      name="quantity"
      id="quantity"
      @change="calcVal"
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
export default {
  name: 'SelectNumbers',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedVal: 0
    }
  },
  computed: {
    index() {
      return this.type === 'total-unit' ? 1 : 2
    },
    value() {
      return this.type === 'total-unit' ? this.gameSettings.totalPlayers : this.calcMafia
    },
    margin() {
      return this.type === 'total-unit' ? this.gameSettings.playerMargin : 0
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
    this.type === 'total-unit' ? this.selectedVal = this.gameSettings.unit : this.selectedVal = this.gameSettings.mafia
  },
  updated() {
    if (this.type === 'total-mafia' && this.selectedVal > this.calcMafia) {
      this.selectedVal = this.bestCombo
      this.gameSettings.mafia = this.bestCombo
      this.gameSettings.citizen = this.calcCitizen
      this.SetGameSettings(this.gameSettings)
    }
  },
  methods: {
    calcVal() {
      this.type === 'total-unit' ? this.gameSettings.unit = this.selectedVal : this.gameSettings.mafia = this.selectedVal
      this.gameSettings.citizen = this.calcCitizen
      this.SetGameSettings(this.gameSettings)
    }
  }
}
</script>
