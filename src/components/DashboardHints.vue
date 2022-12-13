<template>
  <PageBox
    class="dashboard-hints only-box"
  >
    <h2
      class="center-aligned"
    >
      {{ $t('god.dashboardHintTitle') }}
    </h2>
    <ul
      class="dashboard-hint has-top-margin"
    >
      <li
        v-for="(hint, index) in $t('god.dashboardHint')"
        :key="index"
      >
        <span
          :class="hint.name"
        >
          {{ hint.hint }}
        </span>
      </li>
    </ul>
  </PageBox>
</template>

<script>

export default {
  name: 'DashboardHints'
}
</script>
