<template>
  <div
    class="character-power"
    :class="{
      'mafia-pw': mafia
    }"
    :title="$t('common.Power')"
  >
    <span
      :class="{
        'mafia': mafia,
        'solo': !mafia && solo,
        'citizen': !mafia && !solo,
        'zero-state': (solo || !mafia) && power <= 5
      }"
      :style="{
        width: `${Math.abs(power)*2}%`
      }"
    >
      <i>
        {{ Math.abs(power) }}
      </i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CharacterPower',
  props: {
    mafia: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    power: {
      type: Number,
      default: 0
    }
  }
}
</script>
