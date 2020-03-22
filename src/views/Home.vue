<template>
  <div class="home">
    <transition
      name="slide"
      mode="out-in"
      tag="div"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.home.description')}`,
        },
        {
          vmid: 'title',
          name: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`,
        },
        {
          vmid: 'ogdescription',
          name: 'og:description',
          content: `${this.$t('meta.home.description')}`,
        },
        {
          vmid: 'ogurl',
          name: 'og:url',
          content: window.location.href,
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`,
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.home.description')}`,
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
