<template>
  <div class="navigation" :class="{'single-device': checkGameMode()}">
    <nav>
      <template  v-for="(nav, index) in $t('navigation')">
        <router-link :to="{name: nav.url}" :key="index" v-if="!checkNav(nav)">
          <span>
            <img :src="getImgUrl(nav.image)" :alt="nav.alt" />
            <strong>{{nav.name}}</strong>
          </span>
        </router-link>
      </template>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    checkGameMode() {
      if (this.$route.params.id == 'single-device') {
        return true;
      }
      return false;
    },
    checkNav(nav) {
      if (nav.url == 'player' && this.$route.params.id == 'single-device') {
        return true;
      }
    },
    getImgUrl(pic) {
      return require(`@/assets/images/${pic}`);
    },
  },
};
</script>
