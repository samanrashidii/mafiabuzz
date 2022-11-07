<template>
  <div
    class="character-item"
  >
    <img
      :src="getImg('/roles', role.icon)"
      :alt="role.info[currentLang].name"
    >
    <h2>
      {{ role.info[currentLang].name }}
    </h2>
    <div
      class="mafia-status"
    >
      <span
        class="mafia-role has-rope"
        v-if="role.mafia"
      >{{ $t('common.Mafia') }}</span>
      <span
        class="solo-role has-rope"
        v-else-if="role.solo"
      >{{ $t('common.Solo') }}</span>
      <span
        class="citizen-role has-rope"
        v-else
      >{{ $t('common.Citizen') }}</span>
    </div>
    <BaseButton
      class="info-bttn"
      :class="rarity+'-bg'"
      @clicked="showInfo()"
    >
      <span>
        {{ $t('general.seeDetails') }}
      </span>
    </BaseButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterPower from '@/components/CharacterPower.vue';
import InfoBox from '@/components/InfoBox.vue';

export default {
  props: {
    role: {
      type: Object,
      default: () => {}
    },
    rarity: {
      type: String,
      default: ''
    }
  },
  components: {
    CharacterPower,
    InfoBox
  },
  computed: {
    ...mapGetters({
      Roles: 'roles/Roles'
    })
  },
  methods: {
    showInfo() {
      this.$emit('showInfo', this.role)
    }
  }
}
</script>
