<template>
    <div class="creator">
        <transition name="slide" mode="out-in">
            <create-game v-if="!gameStatus" />
            <game-dashboard v-else />
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Create from '@/components/Create.vue';
import Dashboard from '@/components/Dashboard.vue';

export default {
  data() {
    return {
      pageId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters([
      'gameStatus',
    ]),
  },
  components: {
    createGame: Create,
    gameDashboard: Dashboard,
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
  watch: {
    $route(to, from) {
      this.pageId = to.params.id;
    },
  },
};
</script>
