<template>
  <div class="navigation">
    <nav>
      <template v-for="(nav, index) in $t('navigation')">
        <router-link
          :to="{name: nav.url}"
          :key="index"
          :disabled="nav.disabled"
        >
          <span>
            <img
              :src="getImgUrl('', nav.image)"
              :alt="nav.alt"
            >
            <strong>{{ nav.name }}</strong>
          </span>
        </router-link>
      </template>
      <LanguageButton />
    </nav>
  </div>
</template>

<script>
import getImg from '@/mixins/getImg';
import LanguageButton from '@/components/LanguageButton';

export default {
  components: {
    LanguageButton,
  },
  mixins: [getImg],
};
</script>
