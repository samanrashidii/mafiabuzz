<template>
  <Overlay
    class="final-cards"
  >
    <div
      class="card-holder"
    >
      <GameCard
        v-for="(gameCard, index) in gameCards"
        :key="index"
        :icon="gameCard.icon"
        :name="gameCard.name"
        :description="gameCard.description"
      />
    </div>
    <BaseButton
      class="white has-small-top-margin"
      @clicked="closeLog()"
    >
      <span>
        {{ $t('common.Close') }}
      </span>
    </BaseButton>
  </Overlay>
</template>

<script>
import GameCard from '@/components/GameCard.vue';

export default {
  name: 'FinalCards',
  components: {
    GameCard
  },
  computed: {
    gameCards () {
      const output = [
        {
          name: this.$t('god.gameCards.lie.name'),
          description: this.$t('god.gameCards.lie.description'),
          icon: 'lie.svg'
        },
        {
          name: this.$t('god.gameCards.redCarpet.name'),
          description: this.$t('god.gameCards.redCarpet.description'),
          icon: 'redCarpet.svg'
        },
        {
          name: this.$t('god.gameCards.greenLine.name'),
          description: this.$t('god.gameCards.greenLine.description'),
          icon: 'greenLine.svg'
        },
        {
          name: this.$t('god.gameCards.shot.name'),
          description: this.$t('god.gameCards.shot.description'),
          icon: 'shot.svg'
        },
        {
          name: this.$t('god.gameCards.mindRead.name'),
          description: this.$t('god.gameCards.mindRead.description'),
          icon: 'mindRead.svg'
        },
        {
          name: this.$t('god.gameCards.sleepless.name'),
          description: this.$t('god.gameCards.sleepless.description'),
          icon: 'sleepless.svg'
        },
        {
          name: this.$t('god.gameCards.judgeDay.name'),
          description: this.$t('god.gameCards.judgeDay.description'),
          icon: 'judgeDay.svg'
        },
        {
          name: this.$t('god.gameCards.exhumation.name'),
          description: this.$t('god.gameCards.exhumation.description'),
          icon: 'exhumation.svg'
        },
        {
          name: this.$t('god.gameCards.showIdentity.name'),
          description: this.$t('god.gameCards.showIdentity.description'),
          icon: 'showIdentity.svg'
        },
        {
          name: this.$t('god.gameCards.luckyDay.name'),
          description: this.$t('god.gameCards.luckyDay.description'),
          icon: 'luckyDay.svg'
        },
        {
          name: this.$t('god.gameCards.will.name'),
          description: this.$t('god.gameCards.will.description'),
          icon: 'will.svg'
        },
        {
          name: this.$t('god.gameCards.headCount.name'),
          description: this.$t('god.gameCards.headCount.description'),
          icon: 'headCount.svg'
        },
        {
          name: this.$t('god.gameCards.gamble.name'),
          description: this.$t('god.gameCards.gamble.description'),
          icon: 'gamble.svg'
        },
        {
          name: this.$t('god.gameCards.faceOff.name'),
          description: this.$t('god.gameCards.faceOff.description'),
          icon: 'faceOff.svg'
        }
      ]
      output.sort(() => 0.5 - Math.random())
      return output
    }
  },
  methods: {
    closeLog () {
      this.$emit('close', 'cards')
    }
  }
}
</script>
