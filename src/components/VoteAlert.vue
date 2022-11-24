<template>
  <div
    class="revenge-alert-box"
  >
    <div
      v-if="dashboard.justiceUsed"
      class="justice-used"
    >
      <img
        src="@/assets/images/roles/judge.svg"
        class="default-image-size"
        :alt="$t('god.justiceAlt')"
      >
      <img
        src="@/assets/images/actions/justice.svg"
        class="default-image-size"
        :alt="$t('god.justiceAlt')"
      >
      <p>
        {{ $t('god.justiceText') }}
      </p>
    </div>
    <div
      v-else
      class="default-vote"
    >
      <img
        src="@/assets/images/roles/vote.svg"
        :alt="$t('god.voteIconAlt')"
      >
      <p>
        {{ $t('god.lastPhaseText') }}
      </p>
    </div>
    <select
      v-model="lastDayTarget"
      name="last_day_target"
      @change="findTarget(lastDayTarget)"
    >
      <option
        :value="null"
        disabled
      >
        {{ $t('god.selectPlaceholder') }}
      </option>
      <option
        v-for="(person, index) in checkGroupToSelectTarget()"
        :key="index"
      >
        {{ person.player }}
      </option>
    </select>
    <BaseButton
      @clicked="killByVote(dashboard.targetData.player)"
    >
      {{ $t('god.confirmButton') }}
    </BaseButton>
    <BaseButton
      class="danger"
      @clicked="lastPhaseController()"
    >
      {{ $t('god.skipButton') }}
    </BaseButton>
  </div>
</template>

<script>

export default {
  name: 'VoteAlert',
  data() {
    return {
      lastDayTarget: null
    }
  },
  methods: {
    lastPhaseController() {
      // Finish Day After Taking Vote
      this.dashboard.lastPhaseAction = false
      this.finishDay()
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
    }
  }
}
</script>
