<template>
  <div class="home">
    <div class="navigation">
      <nav>
        <router-link :to="{name: 'menu', params: {id : 'single-device'}}">
          <span>
            <img :src="getImgUrl($t('pages.home.singleDeviceImage'))" :alt="$t('pages.home.singleDeviceAlt')" />
            <strong>{{$t('pages.home.button1')}}</strong>
          </span>
        </router-link>
        <router-link :to="{name: 'menu', params: {id : 'multi-device'}}">
          <span>
            <img :src="getImgUrl($t('pages.home.multiDeviceImage'))" :alt="$t('pages.home.singleDeviceAlt')" />
            <strong>{{$t('pages.home.button2')}}</strong>
          </span>
        </router-link>
      </nav>
    </div>
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
          content: `${this.$t('general.url') + this.$t('meta.home.url')}`,
        },
      ],
    };
  },
  methods: {
    getImgUrl(pic) {
      return require(`@/assets/images/${pic}`);
    },
  },
};
</script>

<style lang="scss" scoped>

#app .navigation nav a{
  width:100%;
  &:nth-child(1){
    color:$color_site_1;
    background-color: $color_site_2;
  }
  &:nth-child(2){
    color:$color_site_4;
    background-color: $color_site_1;
  }
  img{
    width:auto;
  }
}

</style>
