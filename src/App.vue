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
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(['DefaultState']),
  },
  created(){
    axios.get('https://api.myjson.com/bins/1g4n7r')
    .then((response) => {
      this.$store.dispatch('roles/SetRoles', response.data);
    });
    
  },
  mounted(){
    localStorage.setItem('defaultState', JSON.stringify(this.DefaultState));
  }
}
</script>