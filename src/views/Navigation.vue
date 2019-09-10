<template>
  <div class="navigation">
    <nav>
      <template v-for="(nav, index) in MainApp.navigation">
        <router-link
          :to="{name: nav.url}"
          :key="index"
          :disabled="nav.disabled"
        >
          <span>
            <img
              :src="getImgUrl('', nav.image)"
              :alt="$t(nav.alt)"
            >
            <strong>{{ $t(nav.name) }}</strong>
          </span>
        </router-link>
      </template>
      <LanguageButton />
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getImg from '@/mixins/getImg';
import LanguageButton from '@/components/LanguageButton';

export default {
  components: {
    LanguageButton,
  },
  computed: {
    ...mapGetters({
      MainApp: 'main/MainApp',
    }),
  },
  mixins: [getImg],
};
</script>
