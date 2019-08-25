<template>
    <div class="how-to-play">
        <div class="dashboard-header">
            <page-title :checkRoute="checkRoute()" />
        </div>
        <page-box v-for="(step, index) in $t('pages.howtoplay.steps')" :key="index">
            <img :src="getImgUrl('/howtoplay', step.icon)" alt="How to Play Step Icon" />
            <h3 v-html="step.titl1"></h3>
            <p v-html="step.desc1"></p>
            <div v-if="step.roles">
                <info-box class="static" v-for="(info, index) in Roles" :key="index" :info="info"></info-box>
            </div>
        </page-box>
    </div>
</template>

<script>
import InfoBox from '@/components/InfoBox.vue';
import PageTitle from '@/components/PageTitle.vue';
import checkRoute from '@/mixins/checkRoute';
import getImg from '@/mixins/getImg';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      pageId: this.$route.params.id,
    };
  },
  components: {
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
  mixins: [checkRoute, getImg],
  watch: {
    $route(to, from) {
      this.pageId = to.params.id;
    },
  },
};
</script>
