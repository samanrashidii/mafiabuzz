<template>
  <Overlay
    class="face-off-challenge"
  >
    <img
      :src="getImg('/icons', 'faceOff.svg')"
      :alt="$t('god.gameCards.faceOff.name')"
      class="img-size-lg"
    >
    <h1>
      {{ $t('god.gameCards.faceOff.name') }}
    </h1>
    <div
      class="choose-players has-top-margin"
    >
      <div>
        <label
          for="first_target"
        >
          <span>
            {{ $t('god.faceOffChallengeTarget1') }}
          </span>
        </label>
        <select
          v-model="firstTarget"
          name="first_target"
          class="has-xsmall-top-margin"
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
            :value="person.player"
          >
            {{ person.player + ` (${person.info[currentLang].name})` }}
          </option>
        </select>
      </div>
      <div
        class="has-small-top-margin"
      >
        <label
          for="first_target"
        >
          <span>
            {{ $t('god.faceOffChallengeTarget2') }}
          </span>
        </label>
        <select
          v-model="secondTarget"
          name="first_target"
          class="has-xsmall-top-margin"
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
            :value="person.player"
          >
            {{ person.player + ` (${person.info[currentLang].name})` }}
          </option>
        </select>
      </div>
    </div>
    <BaseButton
      class="white has-small-top-margin"
      @clicked="executeFaceOff()"
    >
      <span>
        {{ $t('god.faceOff') }}
      </span>
    </BaseButton>
  </Overlay>
</template>

<script>

export default {
  name: 'FaceOffChallenge',
  data () {
    return {
      firstTarget: '',
      secondTarget: ''
    }
  },
  methods: {
    executeFaceOff () {
      let target1Index = 0
      let target2Index = 0
      this.gameSettings.selectedRoles.forEach((role, index) => {
        if (role.player === this.firstTarget) {
          target1Index = index
        }
        if (role.player === this.secondTarget) {
          target2Index = index
        }
      })
      this.gameSettings.selectedRoles[target1Index].player = this.secondTarget
      this.gameSettings.selectedRoles[target2Index].player = this.firstTarget
      this.SetGameSettings(this.gameSettings)
      this.$emit('close')
      this.firstTarget = ''
      this.secondTarget = ''
    }
  }
}
</script>
