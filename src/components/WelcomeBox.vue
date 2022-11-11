<template>
  <div
    class="welcome-box"
  >
    <div
      class="inner-welcome"
    >
      <img
        src="@/assets/images/logo.png"
        :alt="$t('general.alt')"
      >
      <h1
        v-html="$t('pages.home.welcome.text',
          {
            appVersion: appVersion
          }
        )"
      />
      <!-- Patch Notes -->
      <PatchNotes />
    </div>
  </div>
</template>

<script>
import PatchNotes from '@/components/PatchNotes.vue';

export default {
  name: 'WelcomeBox',
  components: {
    PatchNotes
  },
  computed: {
    appVersion () {
      return process.env.VUE_APP_VERSION
    }
  }
}
</script>
