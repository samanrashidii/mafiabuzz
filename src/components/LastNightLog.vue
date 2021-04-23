<template>
  <div class="last-night-log">
    <img
      src="@/assets/images/roles/people.svg"
      :alt="$t('god.peopleIconAlt')"
    >
    <h2>{{ $t('god.lastNightTitle') }}</h2>
    <ul>
      <li
        v-for="(nL, index) in dashboard.lastNight"
        :key="index"
        v-html="nL"
      />
    </ul>
    <app-button
      @click.native="lastNightBoxController()"
      class="active"
    >
      <span>{{ $t('god.logCloseButton') }}</span>
    </app-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      Dashboard: 'dashboard/Dashboard',
    }),
    dashboard() {
      return JSON.parse(JSON.stringify(this.Dashboard));
    },
  },
  methods: {
    ...mapActions({
      SetDashboard: 'dashboard/SetDashboard',
    }),
    lastNightBoxController() {
      this.dashboard.lastNightBox = false;
      this.SetDashboard(this.dashboard);
    },
  },
};
</script>
