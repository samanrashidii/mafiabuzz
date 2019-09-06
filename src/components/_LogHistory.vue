<template>
  <div>
      <!-- Log History -->

    <overlay :class="{'active': logHistory, 'log-history': true}">
      <template v-for="(totLog, index) in dashboard.totalHistory">
        <div
          class="log-table"
          :key="index"
          v-if="totLog.length > 0"
        >
          <span class="counter">{{ $t('common.Night') }} {{ index+1 }}</span>
          <table>
            <tr
              v-for="(log, index) in totLog"
              :key="index"
            >
              <td>{{ index+1 }}</td>
              <td>
                <img
                  :src="getImgUrl('/actions', $t(dashboard.log.actionIcon))"
                  :alt="$t('god.actionIconAlt')"
                  v-if="!dashboard.log.passiveLog"
                >
                <img
                  :src="getImgUrl('/roles', $t(dashboard.log.passiveIcon))"
                  :alt="$t('god.passiveIconAlt')"
                  v-else
                >
              </td>
              <td>
                <log-events
                  v-if="dashboard.readyToLog"
                  :log="dashboard.log"
                />
              </td>
            </tr>
          </table>
        </div>
      </template>
      <div
        class="log-table"
        v-if="dashboard.historyLog.length > 0"
      >
        <span class="counter">{{ $t('god.thisNight') }}</span>
        <table>
          <tr
            v-for="(log, index) in dashboard.historyLog"
            :key="index"
          >
            <td>{{ index+1 }}</td>
            <td>
              <img
                :src="getImgUrl('/actions', $t(dashboard.log.actionIcon))"
                :alt="$t('god.actionIconAlt')"
                v-if="!dashboard.log.passiveLog"
              >
              <img
                :src="getImgUrl('/roles', $t(dashboard.log.passiveIcon))"
                :alt="$t('god.passiveIconAlt')"
                v-else
              >
            </td>
            <td>
              <log-events
                v-if="dashboard.readyToLog"
                :log="dashboard.log"
              />
            </td>
          </tr>
        </table>
      </div>
      <div v-if="dashboard.totalHistory.length === 0 && dashboard.historyLog.length === 0">
        <h2>{{ $t('god.noLog') }}</h2>
      </div>
      <app-button
        @click.native="logHistory = false"
        class="active has-small-top-margin"
      >
        <span>{{ $t('god.logCloseButton') }}</span>
      </app-button>
    </overlay>

    <!-- Last Night Log -->

    <overlay :class="{'active': dashboard.lastNightBox, 'dialog': true, 'last-night': true}">
      <img
        :src="getImgUrl('/roles', $t('god.peopleIcon'))"
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
    </overlay>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>