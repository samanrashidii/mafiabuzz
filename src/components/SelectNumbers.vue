<template>
  <div
    class="select-numbers step-box"
  >
    <p
      v-html="$t(`pages.home.step${selectIndex}`)"
    />
    <select
      v-model.number="selectValue"
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
    totalPlayers: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectValue: 0
    }
  },
  computed: {
    selectIndex () {
      return this.totalPlayers ? 1 : 2
    },
    value () {
      return this.totalPlayers ? 45 : this.calcMafiaCapacity
    },
    margin () {
      return this.totalPlayers ? 5 : 0
    },
    calcMafiaCapacity () {
      return Math.floor(this.gameSettings.totalPlayers / 2) - 1
    },
    calcCitizen () {
      return this.gameSettings.totalPlayers - this.gameSettings.mafia
    },
    bestCombo () {
      return Math.floor(this.gameSettings.totalPlayers / 3)
    }
  },
  created () {
    this.totalPlayers ? this.selectValue = this.gameSettings.totalPlayers : this.selectValue = this.gameSettings.mafia
  },
  updated () {
    if (!this.totalPlayers && this.selectValue > this.calcMafiaCapacity) {
      this.selectValue = this.bestCombo
      this.gameSettings.mafia = this.bestCombo
      this.gameSettings.citizen = this.calcCitizen
      this.SetGameSettings(this.gameSettings)
    }
  },
  methods: {
    calcVal () {
      this.totalPlayers ? this.gameSettings.totalPlayers = this.selectValue : this.gameSettings.mafia = this.selectValue
      this.gameSettings.citizen = this.calcCitizen
      this.SetGameSettings(this.gameSettings)
    }
  }
}
</script>
