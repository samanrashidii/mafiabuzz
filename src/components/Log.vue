<template>
  <Overlay
    class="log-history"
  >
    <template
      v-for="(historyLog, index) in dashboard.totalHistory"
    >
      <div
        v-if="historyLog.length > 0"
        :key="index"
        class="log-table"
      >
        <span
          class="counter"
        >
          {{ $t('common.Night') }} {{ index + 1 }}
        </span>
        <table>
          <tr
            v-for="(log, index) in historyLog"
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
      </div>
    </template>
    <div
      v-if="dashboard.totalHistory.length === 0"
    >
      <h2>
        {{ $t('god.noLog') }}
      </h2>
    </div>
    <BaseButton
      class="active has-small-top-margin"
      @clicked="closeLog()"
    >
      <span>
        {{ $t('god.logCloseButton') }}
      </span>
    </BaseButton>
  </Overlay>
</template>

<script>

export default {
  methods: {
    closeLog () {
      this.$emit('closeLog', false)
    }
  }
}
</script>
