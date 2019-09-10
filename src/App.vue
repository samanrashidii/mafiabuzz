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
    <notifications group="log" position="bottom center" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['DefaultState']),
  },
  created() {
    axios.get('http://localhost:8080/api/main.json')
      .then((response) => {
        this.$store.dispatch('main/SetMainApp', response.data)
      });
    axios.get('http://localhost:8080/api/roles.json')
      .then((response) => {
        this.$store.dispatch('roles/SetRoles', response.data)
      });
  },
  mounted() {
    localStorage.setItem('defaultState', JSON.stringify(this.DefaultState))
  },
};
</script>

<style lang="scss">
@import "./assets/sass/main";
</style>
