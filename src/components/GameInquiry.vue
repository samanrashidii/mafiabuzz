<template>
  <Overlay
    class="game-inquiry"
  >
    <template
      v-if="showNumbers"
    >
      <div
        class="inquiries"
      >
        <div
          v-for="(inquiry, index) in inquiries"
          :key="index"
          class="inquiry-box"
        >
          <ICountUp
            :delay="100"
            :endVal="inquiry.value"
            :options="{
              useEasing: true
            }"
          />
          <p>
            {{ inquiry.name }}
          </p>
        </div>
      </div>
      <BaseButton
        class="primary has-small-top-margin"
        @clicked="closeLog()"
      >
        <span>
          {{ $t('god.logCloseButton') }}
        </span>
      </BaseButton>
    </template>
  </Overlay>
</template>

<script>
import ICountUp from 'vue-countup-v2';

export default {
  name: 'GameInquiry',
  components: {
    ICountUp
  },
  props: {
    showNumbers: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inquiries () {
      const output = [
        {
          name: this.$t('god.alivePeople'),
          value: this.gameSettings.alivePeople
        },
        {
          name: this.$t('god.deadPeople'),
          value: this.gameSettings.deadPeople
        },
        {
          name: this.$t('god.aliveMafia'),
          value: this.gameSettings.aliveMafia
        },
        {
          name: this.$t('god.deadMafia'),
          value: this.gameSettings.deadMafia
        },
        {
          name: this.$t('god.aliveCitizens'),
          value: this.gameSettings.aliveCitizens
        },
        {
          name: this.$t('god.deadCitizens'),
          value: this.gameSettings.deadCitizens
        }
      ]
      return output
    }
  },
  methods: {
    closeLog () {
      this.$emit('close', 'inquiry')
    }
  }
}
</script>
