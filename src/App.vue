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
    <notifications
      group="log"
      position="bottom center"
    >
      <template
        slot="body"
        slot-scope="props"
      >
        <div
          class="vue-notification"
          :class="props.item.type"
        >
          <div class="image-wrapper">
            <img
              :src="getImgUrl('/actions', props.item.title)"
              :alt="props.item.title"
            >
          </div>
          <a
            class="close"
            @click="props.close"
          >
            <i class="fa fa-fw fa-close" />
          </a>
          <div v-html="props.item.text" />
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import getImg from '@/mixins/getImg';

export default {
  computed: {
    ...mapGetters(['DefaultState']),
  },
  created() {
    const BASE_URL = 'https://mafiabuzz.netlify.com'
                      // 'http://localhost:8080'
    axios.get(`${BASE_URL}/api/main.json`)
      .then((response) => {
        this.$store.dispatch('main/SetMainApp', response.data);
      });
    axios.get(`${BASE_URL}/api/roles.json`)
      .then((response) => {
        this.$store.dispatch('roles/SetRoles', response.data);
        axios.get(`${BASE_URL}/api/replacingRoles.json`)
          .then((response) => {
            this.$store.dispatch('roles/SetReplacingRoles', response.data);
          });
    });
  },
  mounted() {
    localStorage.setItem('defaultState', JSON.stringify(this.DefaultState));
  },
  mixins: [
    getImg,
  ],
};
</script>

<style lang="scss">
@import "./assets/sass/main";
</style>
