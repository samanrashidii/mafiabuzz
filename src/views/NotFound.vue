<template>
  <div class="not-found center-aligned">
    <img
      src="@/assets/images/error-404.png"
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
export default {
  name: 'NotFound',
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
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.notfound.title')}`,
        },
        {
          vmid: 'ogdescription',
          property: 'og:description',
          content: `${this.$t('meta.notfound.description')}`,
        },
        {
          vmid: 'ogurl',
          property: 'og:url',
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
};
</script>
