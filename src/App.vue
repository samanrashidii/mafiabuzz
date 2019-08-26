<template>
  <div id="app">
    <transition-group
      name="slide"
      mode="out-in"
      tag="div"
    >
      <router-view
        name="external-nav"
        class="external"
        key="main-nav"
      />
      <router-view key="main-display" />
      <router-view
        name="internal-nav"
        class="internal"
        key="top-nav"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(['DefaultState']),
  },
  created(){
    localStorage.setItem('defaultState', JSON.stringify(this.DefaultState));
  }
}
</script>