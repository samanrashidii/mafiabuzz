<template>
  <div class="nextkiller-box">
    <div class="table-display">
      <div class="table-cell-display">
        <div class="has-clear-fix">
          <img
            :src="getImg('/roles', dashboard.nextKiller.icon)"
            :alt="dashboard.nextKiller.alt"
          >
        </div>
        <h2>
          <strong>{{ $t(dashboard.nextKiller.name) }}</strong>
          <span>( {{ dashboard.nextKiller.player }} )</span>
        </h2>
        <p v-html="$t('god.nextKiler')" />
        <AppButton
          class="active"
          @click.native="closeNextKiller()"
        >
          {{ $t('god.logCloseButton') }}
        </AppButton>
      </div>
    </div>
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
    closeNextKiller() {
      this.dashboard.killerChanged = false;
      this.SetDashboard(this.dashboard);
    },
  },
};
</script>
