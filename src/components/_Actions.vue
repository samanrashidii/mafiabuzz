<template>
  <div>
        <!-- Log Actions During Night -->
        <overlay :class="{'active': logAction, 'log': true, 'done': logActionDone}">
          <div class="log-action">
            <img
              :src="getImgUrl('/actions', $t(dashboard.log.actionIcon))"
              :alt="$t('god.actionIconAlt')"
              v-if="!dashboard.log.passiveLog"
            >
            <img
              :src="getImgUrl('/roles', $t(dashboard.log.passiveIcon))"
              :alt="dashboard.log.target"
              v-else
            >
            <log-events
              v-if="dashboard.readyToLog"
              :log="dashboard.log"
            />
          </div>
        </overlay>

    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>