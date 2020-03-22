<template>
  <div class="about">
    <div class="dashboard-header has-xsmall-top-margin">
      <PageBox>
        <PageTitle :check-route="checkRoute()" />
      </PageBox>
    </div>
    <div class="creators">
      <ul>
        <li
          v-for="(creator, index) in $t('pages.about.creators')"
          :key="index"
          :class="[creator.classes]"
        >
          <img
            :src="getImgUrl('/roles', creator.image)"
            :alt="creator.name"
          >
          <a
            :href="creator.url"
            target="_blank"
          >
            <strong>{{ creator.name }}</strong>
          </a>
          <span>{{ creator.title }}</span>
          <a
            href="https://ko-fi.com/J3J11323A"
            target="_blank"
          >
            <img
              height="26"
              class="coffee-bttn"
              src="https://az743702.vo.msecnd.net/cdn/kofi4.png?v=2"
              border="0"
              alt="Buy Us a Coffee at ko-fi.com"
            >
          </a>
        </li>
      </ul>
    </div>

    <PageBox class="social-box">
      <div class="social">
        <p v-html="$t('pages.about.socialText')" />
        <template v-for="(social, index) in $t('pages.about.socials')">
          <a
            :href="social.url"
            :key="index"
            target="_blank"
          >
            <img
              :src="getImgUrl('/icons', social.icon)"
              :alt="social.alt"
            >
          </a>
        </template>
      </div>
    </PageBox>
  </div>
</template>

<script>
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
    PageTitle,
  },
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.about.description')}`,
        },
        {
          vmid: 'title',
          name: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`,
        },
        {
          vmid: 'ogdescription',
          name: 'og:description',
          content: `${this.$t('meta.about.description')}`,
        },
        {
          vmid: 'ogurl',
          name: 'og:url',
          content: window.location.href,
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`,
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.about.description')}`,
        },
        {
          vmid: 'twitter:url',
          name: 'twitter:url',
          content: window.location.href,
        },
      ],
    };
  },
  mixins: [
    checkRoute,
    getImg,
  ],
  watch: {
    $route(to, from) {
      this.pageId = to.params.id;
    },
  },
};
</script>
