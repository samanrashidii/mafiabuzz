<template>
  <div
    class="game-card"
    :class="{
      'active': cardShow,
      'hide': cardOpen
    }"
  >
    <div
      class="card-content"
    >
      <img
        :src="getImg('/icons', icon)"
        :alt="name"
      >
      <h2>
        {{ name }}
      </h2>
      <p>
        {{ description }}
      </p>
    </div>
    <div
      class="card-front"
      @click.self="showCard()"
    >
      <BaseButton
        v-if="cardShow && !cardOpen"
        class="primary sm"
        @clicked="openCard()"
      >
        <span>
          {{ $t('common.Select') }}
        </span>
      </BaseButton>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameCard',
  props: {
    name: {
      type: String,
      defult: ''
    },
    description: {
      type: String,
      defult: ''
    },
    icon: {
      type: String,
      defult: ''
    }
  },
  data () {
    return {
      cardShow: false,
      cardOpen: false
    }
  },
  methods: {
    showCard () {
      this.cardShow = !this.cardShow
    },
    openCard () {
      this.cardOpen = true
    }
  }
}
</script>
