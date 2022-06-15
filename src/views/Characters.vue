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
          @showInfo="showInfo"
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
          @showInfo="showInfo"
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
          @showInfo="showInfo"
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
          @showInfo="showInfo"
        />
      </Carousel>
    </div>
    <InfoBox :info="info" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from 'vue-owl-carousel2';
import InfoBox from '@/components/InfoBox.vue';
import CharacterItem from '@/components/CharacterItem.vue';

export default {
  name: 'Characters',
  data() {
    return {
      info: {
        show: false,
        mafia: false,
        action: {},
        name: 'replacingRoles.loading.name',
        icon: 'default.svg',
        alt: 'replacingRoles.loading.alt',
        description: 'replacingRoles.loading.description',
        status: {}
      },
    };
  },
  components: {
    Carousel,
    InfoBox,
    CharacterItem
  },
  computed: {
    ...mapGetters({
      Roles: 'roles/Roles'
    }),
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
    showInfo(role) {
      this.info.name = role.name
      this.info.icon = role.icon
      this.info.alt = role.alt
      this.info.description = role.description
      this.info.mafia = role.mafia
      this.info.solo = role.solo
      this.info.rarity = role.rarity
      this.info.action = role.action
      this.info.actionIcon = role.actionIcon
      this.info.passiveIcon = role.passiveIcon
      this.info.status.hasAction = role.status.hasAction
      this.info.status.hasPassive = role.status.hasPassive
      this.info.power = role.power
      this.info.show === false ? this.info.show = true : this.info.show = false
    },
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
