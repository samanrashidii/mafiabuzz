<template>
  <div
    class="power-meter"
    :title="$t('powerMeter.title')"
  >
    <div
      class="has-clear-fix"
    >
      <div
        class="mafia-power"
      >
        <strong
          v-if="mafia > 0"
        >
          <i class="primary-color">{{ mafia }} </i> <span class="mafia-role">{{ $t('common.Mafia') }}</span> {{ $t('powerMeter.minus') }}
        </strong>
        <strong
          v-else-if="mafia < 0"
        >
          <i class="primary-color">{{ Math.abs(mafia) }} </i> <span class="mafia-role">{{ $t('common.Mafia') }}</span> {{ $t('powerMeter.plus') }}
        </strong>
        <strong
          v-else
        >
          <img
            src="@/assets/images/assets/correct.svg"
            alt="Correct icon"
          />
        </strong>
        <span>
          {{ $t('powerMeter.mafia') }}: <b>{{ gameSettings.powerControl.mafiaPower }}</b>
        </span>
      </div>
      <div
        class="citizen-power"
      >
        <strong
          v-if="citizen > 0"
        >
          <i class="primary-color">{{ citizen }} </i> <span class="citizen-role">{{ $t('common.Citizen') }}</span> {{ $t('powerMeter.minus') }}
        </strong>
        <strong
          v-else-if="citizen < 0"
        >
          <i class="primary-color">{{ Math.abs(citizen) }} </i> <span class="citizen-role">{{ $t('common.Citizen') }}</span> {{ $t('powerMeter.plus') }}
        </strong>
        <strong
          v-else
        >
          <img
            src="@/assets/images/assets/correct.svg"
            alt="Correct icon"
          />
        </strong>
        <span>
          {{ $t('powerMeter.citizen') }} : <b>{{ gameSettings.powerControl.citizenPower }}</b>
        </span>
      </div>
      <div
        class="meter"
        :style="{
          transform: `translateX(${gameSettings.powerControl.power}%)`
        }"
      >
        <span />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PowerMeter',
  computed: {
    mafia() {
      return this.gameSettings.mafia - this.gameSettings.selectedMafia
    },
    citizen() {
      return this.gameSettings.citizen - this.gameSettings.selectedCitizen
    }
  }
}
</script>
