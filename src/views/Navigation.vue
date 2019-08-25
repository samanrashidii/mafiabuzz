<template>
  <div class="navigation">
    <nav>
      <template  v-for="(nav, index) in $t('navigation')">
        <router-link :to="{name: nav.url}" :key="index">
          <span>
            <img :src="getImgUrl('', nav.image)" :alt="nav.alt" />
            <strong>{{nav.name}}</strong>
          </span>
        </router-link>
      </template>
    </nav>
  </div>
</template>

<script>
import getImg from '@/mixins/getImg';
export default {
  mixins: [getImg],
};
</script>
