<template>
  <div class="home">
    <div class="navigation">
      <nav>
        <transition name="clicked">
          <router-link v-touch:tap="touchHandler" :to="{name: 'menu', params: {id : 'single-device'}}">
            <span>
              <img :src="getImgUrl('single-device.png')" alt="Single Device Icon" />
              <strong>One Device</strong>
            </span>
          </router-link>
        </transition>
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
  methods:{
    getImgUrl(pic) {
      return require(`@/assets/images/${pic}`);
    },
    touchHandler(){
      console.log('tap')
    }
  }
};
</script>

<style lang="scss" scoped>

.clicked-enter-active{
  opacity: .6;
  transform:scale(.9,.9);
}

.clicked-leave-active{
  opacity: 1;
  transform:scale(1,1);
}

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