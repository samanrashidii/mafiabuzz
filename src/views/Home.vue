<template>
  <div class="home">
    <transition
      name="slide"
      mode="out-in"
    >
      <Create v-if="!gameSettings.gameSettings" />
      <Dashboard v-else />
    </transition>
    <Overlay
      class="main-alert"
      :class="{'active': overlay}"
    >
      <template>
        <img
          src="@/assets/images/savedgame.svg"
          :alt="$t('general.loadFromLastgameMessage')"
        >
        <h3 v-html="$t('general.loadFromLastgameMessage')" />
        <AppButton
          @click.native="loadFromSave()"
          class="green disc-bttn"
        >
          <span>{{ $t('common.loadLastGameButton') }}</span>
        </AppButton>
        <AppButton
          @click.native="resetFactory()"
          class="danger start-bttn"
        >
          <span>{{ $t('common.startNewGameButton') }}</span>
        </AppButton>
      </template>
    </Overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Create from '@/components/steps/Create.vue';
import Dashboard from '@/components/steps/Dashboard.vue';
import Overlay from '@/components/Overlay.vue';
import startGame from '@/mixins/startGame';

export default {
  name: 'Home',
  data() {
    return {
      overlay: false
    }
  },
  computed: {
    ...mapGetters({
      Dashboard: 'dashboard/Dashboard',
      GameSettings: 'gameSettings/GameSettings',
      ReplacingRoles: 'roles/ReplacingRoles',
      Roles: 'roles/Roles'
    }),
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings));
    }
  },
  components: {
    Create,
    Dashboard,
    Overlay
  },
  mounted() {
    const capturedState = JSON.parse(localStorage.getItem('capturedState'))
    if (capturedState) {
      this.overlay = true
    }
  },
  methods: {
    ...mapActions({
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameSettings/SetGameSettings',
      SetDiscordChannel: 'gameSettings/SetDiscordChannel'
    }),
    loadFromSave() {
      this.startGameEngine('captured')
      this.overlay = false
    },
    resetFactory() {
      this.startGameEngine('hard')
      this.overlay = false
    }
  },
  mixins: [
    startGame
  ],
  metaInfo() {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        },
        {
          vmid: 'title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`
        },
        {
          vmid: 'ogdescription',
          property: 'og:description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
        },
        {
          vmid: 'ogurl',
          property: 'og:url',
          content: window.location.href
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.home.title')}`
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.home.description') + this.$t('meta.home.description')}`
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
