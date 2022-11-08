<template>
  <div
    class="last-night-log"
  >
    <img
      src="@/assets/images/roles/people.svg"
      :alt="$t('god.peopleIconAlt')"
    >
    <h2>
      {{ $t('god.lastNightTitle') }}
    </h2>
    <ul>
      <li
        v-for="(nL, index) in dashboard.lastNight"
        :key="index"
        v-html="nL"
      />
    </ul>
    <BaseButton
      @clicked="lastNightBoxController()"
      class="active"
    >
      <span>
        {{ $t('god.logCloseButton') }}
      </span>
    </BaseButton>
  </div>
</template>

<script>
export default {
  methods: {
    lastNightBoxController () {
      this.dashboard.lastNightBox = false
      this.SetDashboard(this.dashboard)
    }
  }
}
</script>
