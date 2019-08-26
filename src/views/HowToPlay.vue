<template>
    <div class="how-to-play">
        <div class="dashboard-header">
            <PageTitle :checkRoute="checkRoute()" />
        </div>
        <PageBox v-for="(step, index) in $t('pages.howtoplay.steps')" :key="index">
            <img :src="getImgUrl('/howtoplay', step.icon)" alt="How to Play Step Icon" />
            <h3 v-html="step.titl1"></h3>
            <p v-html="step.desc1"></p>
            <div v-if="step.roles">
                <InfoBox class="static" v-for="(info, index) in Roles" :key="index" :info="info" />
            </div>
        </PageBox>
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
    InfoBox,
    PageTitle,
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
