<template>
  <div class="home">
    <div class="navigation">
      <nav>
        <router-link :to="{name: 'menu', params: {id : 'single-device'}}">
          <span>
            <img :src="getImgUrl('single-device.png')" alt="Single Device Icon" />
            <strong>One Device</strong>
          </span>
        </router-link>
        <router-link :to="{name: 'menu', params: {id : 'multi-device'}}">
          <span>
            <img :src="getImgUrl('multi-device.png')" alt="Multi Device Icon" />
            <strong>Multiple Devices</strong>
          </span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title : `Mafioso * Home`,
    meta: [
      {
        name : 'description',
        content : `Mafioso is a web application to setup and manage "Mafia Party Game" easily.`
      },
      {
        name : 'og:title',
        content : `Mafioso * Home`
      },
      {
        name : 'og:description',
        content : `Mafioso is a web application to setup and manage "Mafia Party Game" easily`
      },
      {
        name : 'og:url',
        content : `http://www.mafiosoapp.com`
      }
    ]
  },
  methods:{
    getImgUrl(pic) {
      return require(`@/assets/images/${pic}`);
    }
  }
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