<template>
  <div
    class="not-found center-aligned"
  >
    <img
      src="@/assets/images/error-404.png"
      :alt="$t('common.page404Alt')"
    >
    <h2
      v-html="$t('common.page404')"
      class="has-top-margin"
    />
    <router-link
      class="bttn has-top-margin"
      :to="{
        name: 'home'
      }"
    >
      {{ $t('common.homeButton') }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo () {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.notfound.title')}`
    }
  }
}
</script>
