<template>
  <div
    class="characters"
  >
    <!-- Shop Frame Image -->
    <img
      class="characters-image shop-frame"
      src="@/assets/images/characters.svg"
      :alt="$t('pages.characters.alt')"
    >
    <div
      class="characters-inner"
    >
      <!-- Uncommon Characters -->
      <h1 class="uncommon">
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
      <!-- Rare Characters -->
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
      <!-- Epic Characters -->
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
      <!-- Legendary Characters -->
      <h1 class="legendary has-top-margin">
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
      <!-- Mythical Characters -->
      <template
        v-if="mythicals.length > 0"
      >
        <h1 class="mythical has-top-margin">
          {{ $t('rolesInfo.mythical') }}
        </h1>
        <Carousel
          class="mythical"
          :items="1"
          :dots="false"
          :rewind="false"
        >
          <CharacterItem
            v-for="(character, index) in mythicals"
            :key="index"
            :role="character"
            rarity="mythical"
            @showInfo="openInfoBox"
          />
        </Carousel>
      </template>
    </div>
    <!-- Info about each Character -->
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
    mythicals () {
      const characters = this.Roles.filter(role => role.rarity === 'mythical')
      return characters
    },
    legendaries () {
      const characters = this.Roles.filter(role => role.rarity === 'legendary')
      return characters
    },
    epics () {
      const characters = this.Roles.filter(role => role.rarity === 'epic')
      return characters
    },
    rares () {
      const characters = this.Roles.filter(role => role.rarity === 'rare')
      return characters
    },
    uncommons () {
      const characters = this.Roles.filter(role => role.rarity === 'uncommon')
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
  metaInfo () {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.characters.title')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.$t('meta.characters.description') + this.$t('meta.characters.description')}`
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.characters.title')}`
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `${this.$t('meta.characters.description') + this.$t('meta.characters.description')}`
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: 'https://mafiabuzz.app/characters'
        },
        {
          hid: 'twitter-url',
          property: 'twitter:url',
          content: 'https://mafiabuzz.app/characters'
        },
        {
          hid: 'twitter-title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.characters.title')}`
        },
        {
          hid: 'twitter-description',
          name: 'twitter:description',
          content: `${this.$t('meta.characters.description') + this.$t('meta.characters.description')}`
        }
      ]
    }
  }
}
</script>
