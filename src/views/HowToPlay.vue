<template>
    <div class="how-to-play">
        <div class="dashboard-header">
            <change-game-mode />
            <page-title :checkMode="checkGameMode()" />
        </div>
        <page-box v-for="(step, index) in $t('pages.howtoplay.steps')" :key="index">
            <img :src="getHTPImgUrl(step.icon)" alt="How to Play Step Icon" />
            <h3 v-html="step.titl1"></h3>
            <p v-html="step.desc1"></p>
            <div v-if="step.roles">
                <info-box class="static" v-for="(info, index) in Roles" :key="index" :info="info"></info-box>
            </div>
        </page-box>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChangeGameMode from '@/components/ChangeGameMode.vue';
import InfoBox from '@/components/InfoBox.vue';
import PageTitle from '@/components/PageTitle.vue';
import checkGameMode from '@/mixins/checkGameMode';

export default {
  data() {
    return {
      pageId: this.$route.params.id,
    };
  },
  components: {
    changeGameMode: ChangeGameMode,
    infoBox: InfoBox,
    pageTitle: PageTitle,
  },
  computed: {
    ...mapGetters([
      'Roles',
    ]),
  },
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.howtoplay.description')}`,
        },
        {
          vmid: 'title',
          name: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`,
        },
        {
          vmid: 'ogdescription',
          name: 'og:description',
          content: `${this.$t('meta.howtoplay.description')}`,
        },
        {
          vmid: 'ogurl',
          name: 'og:url',
          content: `${this.$t('general.url')}/${this.pageId}/${this.$t('meta.howtoplay.url')}`,
        },
      ],
    };
  },
  methods: {
    // Get Role Image
    getImgUrl(pic) {
      return require(`@/assets/images/roles/${pic}`);
    },
    // Get How To Play Image
    getHTPImgUrl(pic) {
      return require(`@/assets/images/howtoplay/${pic}`);
    },
  },
  mixins: [checkGameMode],
  watch: {
    $route(to, from) {
      this.pageId = to.params.id;
    },
  },
};
</script>
