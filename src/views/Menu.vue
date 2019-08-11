<template>
  <div class="menu">
    <transition name="slide" mode="out-in" tag="div">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  metaInfo(){
    return{
      title: `${this.$t('meta.home.title')}`,
      meta: [
        {
          name : 'description',
          content : `${this.$t('meta.home.description')}`
        },
        {
          name : 'og:title',
          content : `${this.$t('general.name')} * ${this.$t('meta.home.title')}`
        },
        {
          name : 'og:description',
          content : `${this.$t('meta.home.description')}`
        },
        {
          name : 'og:url',
          content : `${this.$t('general.url')}`
        }
      ]
    }
  },
  created(){
    if(this.$route.params.id == 'single-device'){
      return true;
    } else if(this.$route.params.id == 'multi-device'){
      return true;
    } else if(this.$route.params.id == 'error-404'){
      this.$router.push({name:'home'});
    } else{
      this.$router.push({name:'not-found'});
    }
  }
};
</script>
