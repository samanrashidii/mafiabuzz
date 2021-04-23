<template>
  <div class="welcome-box">
    <div class="inner-welcome">
      <img
        src="@/assets/images/logo.png"
        :alt="$t('general.alt')"
      >
      <h1 v-html="$t('pages.creator.welcome.text', { appVersion: appVersion })" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    appVersion () {
      return process.env.VUE_APP_VERSION
    }
  }
}
</script>
