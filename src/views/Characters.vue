<template>
  <div class="characters">
    <img
      class="characters-image"
      src="@/assets/images/characters.svg"
      :alt="$t('pages.characters.alt')"
    >
    <div class="characters-inner">
      <h1 class="legendary">
        {{ $t('rolesInfo.legendary') }}
      </h1>
      <Carousel
        class="legendary"
        :items="1"
        :dots="false"
        :rewind="false"
      >
        <CharacterItem
          v-for="(character, index) in legendaries"
          :key="index"
          :role="character"
          rarity="legendary"
          @showInfo="openInfoBox"
        />
      </Carousel>
      <h1 class="epic has-top-margin">
        {{ $t('rolesInfo.epic') }}
      </h1>
      <Carousel
        class="epic"
        :items="1"
        :dots="false"
        :rewind="false"
      >
        <CharacterItem
          v-for="(character, index) in epics"
          :key="index"
          :role="character"
          rarity="epic"
          @showInfo="openInfoBox"
        />
      </Carousel>
      <h1 class="rare has-top-margin">
        {{ $t('rolesInfo.rare') }}
      </h1>
      <Carousel
        class="rare"
        :items="1"
        :dots="false"
        :rewind="false"
      >
        <CharacterItem
          v-for="(character, index) in rares"
          :key="index"
          :role="character"
          rarity="rare"
          @showInfo="openInfoBox"
        />
      </Carousel>
      <h1 class="uncommon has-top-margin">
        {{ $t('rolesInfo.uncommon') }}
      </h1>
      <Carousel
        class="uncommon"
        :items="1"
        :dots="false"
        :rewind="false"
      >
        <CharacterItem
          v-for="(character, index) in uncommons"
          :key="index"
          :role="character"
          rarity="uncommon"
          @showInfo="openInfoBox"
        />
      </Carousel>
    </div>
    <InfoBox
      :role="roleInfo"
      :show="showInfo"
      @hideInfo="hideInfoBox()"
    />
  </div>
</template>

<script>
import Carousel from 'vue-owl-carousel2';
import InfoBox from '@/components/InfoBox.vue';
import CharacterItem from '@/components/CharacterItem.vue';

export default {
  name: 'Characters',
  data() {
    return {
      showInfo: false,
      roleInfo: {}
    }
  },
  components: {
    Carousel,
    InfoBox,
    CharacterItem
  },
  computed: {
    legendaries() {
      const characters = this.Roles.filter(element => element.rarity === 'legendary')
      return characters
    },
    epics() {
      const characters = this.Roles.filter(element => element.rarity === 'epic')
      return characters
    },
    rares() {
      const characters = this.Roles.filter(element => element.rarity === 'rare')
      return characters
    },
    uncommons() {
      const characters = this.Roles.filter(element => element.rarity === 'uncommon')
      return characters
    }
  },
  methods: {
    openInfoBox (role) {
      this.roleInfo = role
      this.showInfo = !this.showInfo
    },
    hideInfoBox () {
      this.showInfo = false
    }
  },
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.characters.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.characters.description')}`
        },
        {
          vmid: 'title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.characters.title')}`
        },
        {
          vmid: 'ogdescription',
          property: 'og:description',
          content: `${this.$t('meta.characters.description')}`
        },
        {
          vmid: 'ogurl',
          property: 'og:url',
          content: window.location.href
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.characters.title')}`
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.characters.description')}`
        },
        {
          vmid: 'twitter:url',
          name: 'twitter:url',
          content: window.location.href
        }
      ]
    }
  }
}
</script>
