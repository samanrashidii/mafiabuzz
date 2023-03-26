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
        :id="gameCard.id"
        :icon="gameCard.icon"
        :name="gameCard.name"
        :description="gameCard.description"
        @faceOff="openFaceOffChallenge"
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
          id: 'lie',
          name: this.$t('god.gameCards.lie.name'),
          description: this.$t('god.gameCards.lie.description'),
          icon: 'lie.svg'
        },
        {
          id: 'redCarpet',
          name: this.$t('god.gameCards.redCarpet.name'),
          description: this.$t('god.gameCards.redCarpet.description'),
          icon: 'redCarpet.svg'
        },
        {
          id: 'greenLine',
          name: this.$t('god.gameCards.greenLine.name'),
          description: this.$t('god.gameCards.greenLine.description'),
          icon: 'greenLine.svg'
        },
        {
          id: 'shot',
          name: this.$t('god.gameCards.shot.name'),
          description: this.$t('god.gameCards.shot.description'),
          icon: 'shot.svg'
        },
        {
          id: 'mindRead',
          name: this.$t('god.gameCards.mindRead.name'),
          description: this.$t('god.gameCards.mindRead.description'),
          icon: 'mindRead.svg'
        },
        {
          id: 'sleepless',
          name: this.$t('god.gameCards.sleepless.name'),
          description: this.$t('god.gameCards.sleepless.description'),
          icon: 'sleepless.svg'
        },
        {
          id: 'judgeDay',
          name: this.$t('god.gameCards.judgeDay.name'),
          description: this.$t('god.gameCards.judgeDay.description'),
          icon: 'judgeDay.svg'
        },
        {
          id: 'exhumation',
          name: this.$t('god.gameCards.exhumation.name'),
          description: this.$t('god.gameCards.exhumation.description'),
          icon: 'exhumation.svg'
        },
        {
          id: 'showIdentity',
          name: this.$t('god.gameCards.showIdentity.name'),
          description: this.$t('god.gameCards.showIdentity.description'),
          icon: 'showIdentity.svg'
        },
        {
          id: 'luckyDay',
          name: this.$t('god.gameCards.luckyDay.name'),
          description: this.$t('god.gameCards.luckyDay.description'),
          icon: 'luckyDay.svg'
        },
        {
          id: 'will',
          name: this.$t('god.gameCards.will.name'),
          description: this.$t('god.gameCards.will.description'),
          icon: 'will.svg'
        },
        {
          id: 'headCount',
          name: this.$t('god.gameCards.headCount.name'),
          description: this.$t('god.gameCards.headCount.description'),
          icon: 'headCount.svg'
        },
        {
          id: 'gamble',
          name: this.$t('god.gameCards.gamble.name'),
          description: this.$t('god.gameCards.gamble.description'),
          icon: 'gamble.svg'
        },
        {
          id: 'faceOff',
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
    },
    openFaceOffChallenge () {
      alert('Face Off')
    }
  }
}
</script>
