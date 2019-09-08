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

    <!-- Alert Box -->

    <overlay :class="{'active': alertBox,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        :src="require(`@/assets/images/icons/warning.png`)"
        :alt="$t('general.warningIcon')"
      >
      <template>
        <p>{{ $t('god.skipText') }}</p>
        <app-button
          @click.native="skipAction()"
          class="green"
        >
          <span>{{ $t('god.skipButton2') }}</span>
        </app-button>
        <app-button
          @click.native="alertBox = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </app-button>
      </template>
    </overlay>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>