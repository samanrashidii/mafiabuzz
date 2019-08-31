<template>
  <div class="creator">
    <transition
      name="slide"
      mode="out-in"
    >
      <Create v-if="!gameSettings.gameStatus" />
      <Dashboard v-else />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Create from '@/components/main/Create.vue';
import Dashboard from '@/components/main/Dashboard.vue';

export default {
  computed: {
    ...mapGetters({
      GameSettings: 'gameStatus/GameSettings',
    }),
    gameSettings(){
      return JSON.parse(JSON.stringify(this.GameSettings));
    }
  },
  components: {
    Create,
    Dashboard,
  },
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.creator.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.creator.description')}`,
        },
        {
          vmid: 'title',
          name: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.creator.title')}`,
        },
        {
          vmid: 'ogdescription',
          name: 'og:description',
          content: `${this.$t('meta.creator.description')}`,
        },
        {
          vmid: 'ogurl',
          name: 'og:url',
          content: `${this.$t('general.url')}/${this.pageId}/${this.$t('meta.creator.url')}`,
        },
      ],
    };
  },
};
</script>
