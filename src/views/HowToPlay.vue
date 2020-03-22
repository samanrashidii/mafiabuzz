<template>
  <div class="how-to-play">
    <div class="dashboard-header has-xsmall-top-margin">
      <PageBox>
        <PageTitle :check-route="checkRoute()" />
      </PageBox>
    </div>
    <PageBox
      v-for="(step, index) in $t('pages.howtoplay.steps')"
      :key="index"
    >
      <img
        class="normal-size"
        :src="getImgUrl('/howtoplay', step.icon)"
        alt="How to Play Step Icon"
      >
      <h3 v-html="step.titl1" />
      <p v-html="step.desc1" />
      <div v-if="step.roles">
        <InfoBox
          class="static"
          v-for="(info, index) in Roles"
          :key="index"
          :info="info"
          :floating="true"
        />
      </div>
    </PageBox>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InfoBox from '@/components/InfoBox.vue';
import PageTitle from '@/components/PageTitle.vue';
import checkRoute from '@/mixins/checkRoute';
import getImg from '@/mixins/getImg';

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
    ...mapGetters({
      Roles: 'roles/Roles',
    }),
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
          content: window.location.href,
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`,
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.howtoplay.description')}`,
        },
        {
          vmid: 'twitter:url',
          name: 'twitter:url',
          content: window.location.href,
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
