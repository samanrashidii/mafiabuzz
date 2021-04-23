<template>
  <div
    class="info-box"
    :class="{'active': info.show}"
    @click="info.show = false"
  >
    <a
      href="javascript:void(0)"
    />
    <img
      :class="{'floating': floating}"
      :src="getImg('/roles', info.icon)"
      :alt="$t(info.alt)"
    >
    <h2>{{ $t(info.name) }}</h2>
    <div class="mafia-status">
      <strong
        class="mafia-role"
        v-if="info.mafia"
      >{{ $t('common.Mafia') }}</strong>
      <strong
        class="solo-role"
        v-else-if="info.solo"
      >{{ $t('common.Solo') }}</strong>
      <strong
        class="citizen-role"
        v-else
      >{{ $t('common.Citizen') }}</strong>
    </div>
    <div class="details-info">
      <div>
        <span>{{ $t('rolesInfo.power') }}</span>
        <CharacterPower
          :mafia="info.mafia"
          :solo="info.solo"
          :power="info.power"
        />
      </div>
      <div>
        <span>{{ $t('rolesInfo.rarity') }}</span>
        <div class="data-holder">
          <template v-if="info.rarity">
            <img
              :src="getImg('/icons', info.rarity + '.svg')"
              :alt="$t('rolesInfo.'+info.rarity)"
            >
            <strong
              :class="`color-${info.rarity}`"
            >
              {{ $t('rolesInfo.'+info.rarity) }}
            </strong>
          </template>
        </div>
      </div>
      <div>
        <span>{{ $t('rolesInfo.action') }}</span>
        <div class="data-holder">
          <template v-if="info.status.hasAction || info.status.hasLaterAction">
            <img
              :src="getImg('/actions', info.actionIcon)"
              :alt="info.alt"
            >
            <strong>{{ $t(info.action.action) }}</strong>
          </template>
          <template v-else>
            <img
              src="@/assets/images/icons/disabled.svg"
              alt="Disabled"
            >
            <strong>{{ $t(info.action.action) }}</strong>
          </template>
        </div>
      </div>
      <div>
        <span>{{ $t('rolesInfo.passive') }}</span>
        <div class="data-holder">
          <template v-if="info.status.hasPassive">
            <img
              :src="getImg('/actions', info.passiveIcon)"
              :alt="info.alt"
            >
            <strong>{{ $t(info.action.passive) }}</strong>
          </template>
          <template v-else>
            <img
              src="@/assets/images/icons/disabled.svg"
              alt="Disabled"
            >
            <strong>{{ $t(info.action.passive) }}</strong>
          </template>
        </div>
      </div>
    </div>
    <p v-html="$t(info.description)" />
  </div>
</template>

<script>
import CharacterPower from '@/components/CharacterPower.vue';

export default {
  props: {
    info: Object,
    floating: Boolean,
  },
  components: {
    CharacterPower,
  },
};
</script>
