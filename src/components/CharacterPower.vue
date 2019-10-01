<template>
  <div
    class="character-power"
    :class="{'mafia-pw': mafia}"
  >
    <span
      :class="{'mafia': mafia, 'citizen': !mafia}"
      :style="{width: `${Math.abs(power)*2}%`}"
    ><i>{{ Math.abs(power) }}</i></span>
  </div>
</template>

<script>
export default {
  props: {
    mafia: Boolean,
    power: Number,
  },
};
</script>

<style>

</style>
