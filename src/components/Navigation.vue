<template>
  <div
    class="navigation sticky"
  >
    <nav>
      <template v-for="(nav, index) in MainApp.navigation">
        <router-link
          :to="{name: nav.url}"
          :key="index"
          :disabled="nav.disabled"
          class="mafia-bg"
        >
          <span>
            <img
              :src="getImg('', nav.image)"
              :alt="$t(nav.alt)"
            >
            <strong>{{ $t(nav.name) }}</strong>
          </span>
        </router-link>
      </template>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loggedIn: true,
    };
  },
  computed: {
    ...mapGetters({
      MainApp: 'main/MainApp'
    })
  }
}
</script>
