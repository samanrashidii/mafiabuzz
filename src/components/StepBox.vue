<template>
  <div class="step-box">
    <p v-html="$t(`pages.creator.step${index}`)" />
    <select
      @change="calcVal"
      name="quantity"
      id="quantity"
      v-model.number="selectedVal"
    >
      <option value="null" disabled>Please select from below </option>
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
  data() {
    return {
      selectedVal: 0,
    };
  },
  computed:{
    ...mapGetters({
      gameSettings: 'gameStatus/GameSettings',
    }),
    index(){
      return this.type == 'totalUnit' ? 1 : 2
    },
    value(){
      return this.type == 'totalUnit' ? this.gameSettings.unit : this.gameSettings.mafia
    },
    margin(){
      return this.type == 'totalUnit' ? 5 : 0
    }
  },
  props: {
    type: String,
  },
  methods: {
    ...mapActions({
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    calcMafia() {
     const mafiaNumbers = Math.floor(this.gameSettings.unit / 2) - 1;
     this.gameSettings.citizens = this.gameSettings.unit - this.gameSettings.mafia;
     return mafiaNumbers;
    },
    calcVal() {
      this.SetGameSettings(this.gameSettings);
    }
  },
}
</script>
