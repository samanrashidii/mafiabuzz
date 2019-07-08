<template>
  <div class="menu">
    <transition name="slide" mode="out-in" tag="div">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
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
