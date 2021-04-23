<template>
  <div
    class="character-power"
    :class="{'mafia-pw': mafia}"
  >
    <span
      :class="{
        'mafia': mafia,
        'solo': !mafia && solo,
        'citizen': !mafia && !solo,
        'zero-state': (solo || !mafia) && power <= 5
      }"
      :style="{width: `${Math.abs(power)*2}%`}"
    ><i>{{ Math.abs(power) }}</i></span>
  </div>
</template>

<script>
export default {
  props: {
    mafia: Boolean,
    solo: Boolean,
    power: Number,
  },
};
</script>

<style>

</style>
