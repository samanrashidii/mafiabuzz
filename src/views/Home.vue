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
      title: `${this.$t('meta.home.title')}`,
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
          content: `${this.$t('general.url')}`,
        },
      ],
    };
  },
};
</script>
