<template>
  <div class="menu">
    <transition name="slide" mode="out-in" tag="div">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  methods:{
    checkURL(){
      if(this.$route.params.id !== 'single-device'){
        this.$router.push({name:'not-found'});
      } else if(this.$route.params.id !== 'multi-device'){
        this.$router.push({name:'not-found'});
      }
    }
  },
  created(){
    // this.checkURL();
  }
};
</script>
