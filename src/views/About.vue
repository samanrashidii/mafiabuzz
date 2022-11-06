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
          v-for="(creator, index) in creators"
          :key="index"
          :class="[creator.classes]"
        >
          <div>
            <img
              :src="getImg('/roles', creator.image)"
              :alt="creator.name"
            >
          </div>
          <a
            :href="creator.url"
            target="_blank"
          >
            <strong>{{ creator.name }}</strong>
          </a>
          <div>
            <span>{{ creator.title }}</span>
          </div>
        </li>
      </ul>
    </div>

    <PageBox class="social-box">
      <div class="social">
        <p v-html="$t('pages.about.contactText')" />
        <p v-html="$t('pages.about.socialText')" />
        <template
          v-for="(social, index) in $t('pages.about.socials')"
        >
          <a
            :href="social.url"
            :title="social.name"
            :key="index"
            target="_blank"
          >
            <img
              :src="getImg('/icons', social.icon)"
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

export default {
  name: 'About',
  components: {
    PageTitle
  },
  computed: {
    creators () {
      return JSON.parse(JSON.stringify(this.$t('pages.about.creators')))
    }
  },
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.about.description')}`
        },
        {
          vmid: 'title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`
        },
        {
          vmid: 'ogdescription',
          property: 'og:description',
          content: `${this.$t('meta.about.description')}`
        },
        {
          vmid: 'ogurl',
          property: 'og:url',
          content: window.location.href
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.about.description')}`
        },
        {
          vmid: 'twitter:url',
          name: 'twitter:url',
          content: window.location.href
        }
      ]
    }
  },
  mixins: [
    checkRoute
  ]
}
</script>
