<template>
  <div
    class="home"
  >
    <transition
      name="slide"
      mode="out-in"
    >
      <CreateGamePanel
        v-if="!gameSettings.gameStarted"
      />
      <DashboardPanel
        v-else
      />
    </transition>
    <SavedGameAlert />
  </div>
</template>

<script>
import CreateGamePanel from '@/components/CreateGamePanel.vue';
import DashboardPanel from '@/components/DashboardPanel.vue';
import SavedGameAlert from '@/components/SavedGameAlert.vue';

export default {
  name: 'Home',
  components: {
    CreateGamePanel,
    DashboardPanel,
    SavedGameAlert
  },
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`,
      meta: [
      {
          hid: 'description',
          name: 'description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: 'https://mafiabuzz.app/'
        },
        {
          hid: 'twitter-url',
          property: 'twitter:url',
          content: 'https://mafiabuzz.app/'
        },
        {
          hid: 'twitter-title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`
        },
        {
          hid: 'twitter-description',
          name: 'twitter:description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        }
      ]
    }
  }
}
</script>
