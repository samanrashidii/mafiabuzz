<template>
  <div
    class="info-box"
    :class="{'active': show}"
    @click="hideInfo()"
  >
    <a
      href="javascript:void(0)"
    />
    <img
      v-if="role.icon"
      :class="{'floating': floating}"
      :src="getImg('/roles', role.icon)"
      :alt="$t(role.name)"
    >
    <h2>
      {{ $t(role.name) }}
    </h2>
    <div
      class="mafia-status"
    >
      <strong
      v-if="role.mafia"
        class="mafia-role"
      >
        {{ $t('common.Mafia') }}
      </strong>
      <strong
        v-else-if="role.solo"
        class="solo-role"
      >
        {{ $t('common.Solo') }}
      </strong>
      <strong
        v-else
        class="citizen-role"
      >
        {{ $t('common.Citizen') }}
      </strong>
    </div>
    <div
      class="details-info"
    >
      <div>
        <span>
          {{ $t('rolesInfo.power') }}
        </span>
        <CharacterPower
          :mafia="role.mafia"
          :solo="role.solo"
          :power="role.power"
        />
      </div>
      <div>
        <span>
          {{ $t('rolesInfo.rarity') }}
        </span>
        <div
          class="data-holder"
        >
          <template
            v-if="role.rarity"
          >
            <img
              :src="getImg('/icons', role.rarity + '.svg')"
              :alt="$t('rolesInfo.'+role.rarity)"
            >
            <strong
              :class="`color-${role.rarity}`"
            >
              {{ $t('rolesInfo.'+role.rarity) }}
            </strong>
          </template>
        </div>
      </div>
      <div>
        <span>
          {{ $t('rolesInfo.action') }}
        </span>
        <div
          class="data-holder"
        >
          <template>
            <img
              v-if="role.actionIcon"
              :src="getImg('/actions', role.actionIcon)"
              :alt="role.name"
            >
            <strong>
              {{ $t(role.action.action) }}
            </strong>
          </template>
        </div>
      </div>
      <div>
        <span>
          {{ $t('rolesInfo.passive') }}
        </span>
        <div
          class="data-holder"
        >
          <template>
            <img
              v-if="role.passiveIcon"
              :src="getImg('/actions', role.passiveIcon)"
              :alt="role.name"
            >
            <strong>
              {{ $t(role.action.passive) }}
            </strong>
          </template>
        </div>
      </div>
    </div>
    <p
      v-html="$t(role.info[currentLang].description)"
    />
  </div>
</template>

<script>
import CharacterPower from '@/components/CharacterPower.vue';

export default {
  props: {
    role: {
      type: Object,
      default: () => {}
    },
    floating: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CharacterPower
  },
  methods: {
    hideInfo () {
      this.$emit('hideInfo')
    }
  }
}
</script>
