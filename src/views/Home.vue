<template>
  <div class="home">
    <div class="home-wrapper">
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
  methods:{
    getImgUrl(pic) {
      return require(`@/assets/images/${pic}`);
    },
  }
};
</script>

<style lang="scss" scoped>

.home-wrapper{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  z-index: 99999;
  nav{
    display:flex;
    flex-wrap: wrap;
    width:100%;
    height: 100%;
    padding:5px;
    a{
      display:table;
      width:100%;
      height: 50%;
      text-align: center;
      font-family: $font_mafia;
      font-size: 30px;
      padding:10px;
      border:5px solid $background_color_main;
      box-shadow: inset 0 0 2px #1e1e1e;
      &:nth-child(1){
        color:$color_site_1;
        background-color: $color_site_2;
      }
      &:nth-child(2){
        color:$color_site_4;
        background-color: $color_site_1;
      }
      span{
        display:table-cell;
        vertical-align: middle;
        img{
          margin-bottom:15px;
        }
      }
    }
  }
}
div.menu .navigation a:hover{
  opacity: .6;
  transform:scale(.85,.85);
}

</style>