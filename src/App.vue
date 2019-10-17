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
import { mapGetters, mapActions } from 'vuex';
import getImg from '@/mixins/getImg';
import startGame from '@/mixins/startGame';

export default {
  computed: {
    ...mapGetters(['DefaultState']),
  },
  created() {
    this.startGameEngine();
  },
  mounted() {
    localStorage.setItem('defaultState', JSON.stringify(this.DefaultState));
  },
  methods: {
    ...mapActions({
      SetMainApp: 'main/SetMainApp',
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
  },
  mixins: [
    getImg,
    startGame,
  ],
};
</script>

<style lang="scss">
@import "./assets/sass/main";
</style>
