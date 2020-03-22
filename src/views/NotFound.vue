<template>
  <div class="not-found center-aligned">
    <img
      :src="getImgUrl('', $t('common.page404Image'))"
      :alt="$t('common.page404Alt')"
    >
    <h2
      class="has-top-margin"
      v-html="$t('common.page404')"
    />
    <router-link
      class="bttn has-top-margin"
      :to="{name: 'home'}"
    >
      {{ $t('common.homeButton') }}
    </router-link>
  </div>
</template>

<script>
import getImg from '@/mixins/getImg';

export default {
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.notfound.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.notfound.description')}`,
        },
        {
          vmid: 'ogtitle',
          name: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.notfound.title')}`,
        },
        {
          vmid: 'ogdescription',
          name: 'og:description',
          content: `${this.$t('meta.notfound.description')}`,
        },
        {
          vmid: 'ogurl',
          name: 'og:url',
          content: `${this.$t('general.url')}/${this.$t('meta.notfound.url')}`,
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.notfound.title')}`,
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.notfound.description')}`,
        },
        {
          vmid: 'twitter:url',
          name: 'twitter:url',
          content: window.location.href,
        },
      ],
    };
  },
  mixins: [getImg],
};
</script>
