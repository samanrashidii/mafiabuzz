<template>
  <div class="welcome-box">
    <img
      :src="require(`@/assets/images/${$t('pages.creator.welcome.image')}`)"
      :alt="$t('general.alt')"
    >
    <h3 v-html="$t('pages.creator.welcome.text')" />
  </div>
</template>

<script>
export default {

};
</script>
