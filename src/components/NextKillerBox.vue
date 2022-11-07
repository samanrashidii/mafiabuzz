<template>
  <div class="nextkiller-box">
    <div class="table-display">
      <div class="table-cell-display">
        <div class="has-clear-fix">
          <img
            :src="getImg('/roles', dashboard.nextKiller.icon)"
            :alt="dashboard.nextKiller.name"
          >
        </div>
        <h2>
          <strong>{{ dashboard.nextKiller.name }}</strong>
          <span>( {{ dashboard.nextKiller.player }} )</span>
        </h2>
        <p v-html="$t('god.nextKiler')" />
        <BaseButton
          class="active"
          @clicked="closeNextKiller()"
        >
          {{ $t('god.logCloseButton') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dashboard() {
      return JSON.parse(JSON.stringify(this.Dashboard))
    }
  },
  methods: {
    closeNextKiller() {
      this.dashboard.killerChanged = false
      this.SetDashboard(this.dashboard)
    }
  }
}
</script>
