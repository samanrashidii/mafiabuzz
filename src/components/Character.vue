<template>
  <div
    class="character"
    :class="{'mafia': role.mafia, 'solo': role.solo && role.mafia === null}"
  >
    <div class="inner-character">
      <div>
        <img
          :src="getImg('/roles', role.icon)"
          :alt="$t(role.alt)"
        >
        <strong>{{ $t(role.name) }}</strong>
        <CharacterPower
          :mafia="role.mafia"
          :solo="role.solo"
          :power="role.power"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CharacterPower from '@/components/CharacterPower.vue';

export default {
  props: {
    role: Object
  },
  components: {
    CharacterPower
  }
}
</script>
