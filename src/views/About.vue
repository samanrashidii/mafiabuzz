<template>
  <div
    class="about"
  >
    <!-- About Header -->
    <div
      class="dashboard-header has-xsmall-top-margin"
    >
      <PageBox>
        <PageTitle />
      </PageBox>
    </div>
    <!-- MafiaBuzz Team -->
    <div
      class="creators"
    >
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
            <strong>
              {{ creator.name }}
            </strong>
          </a>
          <div>
            <span>
              {{ creator.title }}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!-- MafiaBuzz Social Media -->
    <PageBox
      class="social-box"
    >
      <div
        class="social"
      >
        <p
          v-html="$t('pages.about.contactText')"
        />
        <p
          v-html="$t('pages.about.socialText')"
        />
        <a
          v-for="(social, index) in $t('pages.about.socials')"
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
      </div>
    </PageBox>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';

export default {
  name: 'About',
  components: {
    PageTitle
  },
  computed: {
    creators () {
      return this.$t('pages.about.creators')
    }
  },
  metaInfo () {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.$t('meta.about.description') + this.$t('meta.about.description')}`
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `${this.$t('meta.about.description') + this.$t('meta.about.description')}`
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: 'https://mafiabuzz.app/about'
        },
        {
          hid: 'twitter-url',
          property: 'twitter:url',
          content: 'https://mafiabuzz.app/about'
        },
        {
          hid: 'twitter-title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.about.title')}`
        },
        {
          hid: 'twitter-description',
          name: 'twitter:description',
          content: `${this.$t('meta.about.description') + this.$t('meta.about.description')}`
        }
      ]
    }
  }
}
</script>
