<template>
  <div
    class="home"
  >
    <!-- Extra Meta Description for SEO -->
    <p
      class="seo-clipboard"
    >
      {{ $t('meta.home.description') }}
    </p>
    <transition
      name="slide"
      mode="out-in"
    >
      <!-- Show Create Game Panel when the game is not started -->
      <CreateGamePanel
        v-if="!gameSettings.gameStarted"
      />
      <!-- Show Dashboard Panel when the game is started -->
      <DashboardPanel
        v-else
      />
    </transition>
    <!-- If last game saved data is available in localstorage, show Alert to load data from localstorage or start a new game -->
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
