<template>
  <div
    v-if="dashboard.lastNightBox"
    class="last-night-log"
  >
    <img
      src="@/assets/images/roles/people.svg"
      :alt="$t('god.peopleIconAlt')"
    >
    <h2>
      {{ $t('god.lastNightSummary') }}
    </h2>
    <table
      v-if="dashboard.historyLog.length > 0"
    >
      <tr
        v-for="(log, index) in dashboard.historyLog"
        :key="index"
      >
        <td>
          {{ index+1 }}
        </td>
        <td>
          <img
            :src="getImg('/actions', log.image)"
            :alt="$t('god.actionIconAlt')"
          >
        </td>
        <td>
          <p
            v-html="log.text"
          />
        </td>
      </tr>
    </table>
    <h2
      v-else
      class="has-top-margin red-color"
    >
      {{ $t('god.noLog') }}
    </h2>
    <template
      v-if="dashboard.lastNight.length > 0"
    >
      <h2
        class="has-top-margin"
      >
        {{ $t('god.lastNightTitle') }}
      </h2>
      <ul>
        <li
          v-for="(lastNightEvent, index) in dashboard.lastNight"
          :key="index"
          v-html="lastNightEvent"
        />
      </ul>
    </template>
    <BaseButton
      @clicked="lastNightBoxController()"
      class="primary"
    >
      <span>
        {{ $t('god.logCloseButton') }}
      </span>
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'LastNightLog',
  methods: {
    lastNightBoxController () {
      this.dashboard.lastNightBox = false
      this.dashboard.historyLog = []
      this.SetDashboard(this.dashboard)
    }
  }
}
</script>
