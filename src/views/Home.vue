<template>
  <div
    class="home"
  >
    <transition
      name="slide"
      mode="out-in"
    >
      <Create
        v-if="!gameSettings.gameStarted"
      />
      <Dashboard
        v-else
      />
    </transition>
    <SavedGameAlert />
  </div>
</template>

<script>
import Create from '@/components/steps/Create.vue';
import Dashboard from '@/components/steps/Dashboard.vue';
import SavedGameAlert from '@/components/SavedGameAlert.vue';

export default {
  name: 'Home',
  components: {
    Create,
    Dashboard,
    SavedGameAlert
  },
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        },
        {
          vmid: 'title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`
        },
        {
          vmid: 'ogdescription',
          property: 'og:description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        },
        {
          vmid: 'ogurl',
          property: 'og:url',
          content: window.location.href
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        },
        {
          vmid: 'twitter:url',
          name: 'twitter:url',
          content: window.location.href
        }
      ]
    }
  }
}
</script>
