<template>
  <div
    id="app"
  >
    <Navigation />
    <div class="sub-header">
      <LanguageButton />
      <router-link
        class="bttn subnav-bttn characters-bttn awesome"
        :to="{name: 'characters'}"
      >
        <strong>{{ $t('general.characters') }}</strong>
        <img
          src="@/assets/images/characters.svg"
          :alt="$t('pages.characters.alt')"
        >
      </router-link>
    </div>
    <a
      href="https://youtube.com/c/youdonome"
      target="_blank"
      class="d-block has-xsmall-top-margin rounded shadow"
    >
      <img
        class="youdonome-banner rounded"
        src="@/assets/images/youdonome-banner.png"
        alt="Youdonome Banner"
      >
    </a>
    <transition
      name="slide"
      mode="out-in"
    >
      <router-view />
    </transition>
    <notifications
      group="log"
      position="bottom center"
    >
      <template
        slot="body"
        slot-scope="props"
      >
        <div
          class="vue-notification"
          :class="props.item.type"
        >
          <div class="image-wrapper">
            <img
              :src="getImg('/actions', props.item.title)"
              :alt="props.item.title"
            >
          </div>
          <a
            class="close"
            @click="props.close"
          >
            <i class="fa fa-fw fa-close" />
          </a>
          <div v-html="props.item.text" />
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Navigation from '@/components/Navigation.vue';
import LanguageButton from '@/components/LanguageButton.vue';
import SERVER from '@/service/server';

export default {
  components: {
    Navigation,
    LanguageButton
  },
  computed: {
    ...mapGetters({
      DefaultState: 'DefaultState',
      Dashboard: 'dashboard/Dashboard',
      GameSettings: 'gameStatus/GameSettings',
      Roles: 'roles/Roles',
      ReplacingRoles: 'roles/ReplacingRoles'
    }),
    roles() {
      return JSON.parse(JSON.stringify(this.Roles))
    }
  },
  created() {
    const savedLocale = JSON.parse(window.localStorage.getItem('locale'))
    const discordToken = window.localStorage.getItem('discordToken')
    if (discordToken) {
      this.SetDiscordChannel(discordToken)
    }
    const loader = this.$loading.show({
      loader: 'dots',
      color: '#c33e3e',
      width: 75,
      height: 75,
      backgroundColor: '#000000',
      canCancel: false,
      onCancel: this.onCancel
    })
    SERVER.getRoles()
      .then((res) => {
        this.SetRoles(JSON.parse(JSON.stringify(res.data)))
        SERVER.getReplacingRoles()
          .then((response) => {
            this.SetReplacingRoles(JSON.parse(JSON.stringify(response.data)))
              .then(() => {
                window.localStorage.setItem('defaultState', JSON.stringify(this.DefaultState))
                loader.hide()
              })
          })
          .catch(() => {
            loader.hide()
          })
      })
      .catch(() => {
        loader.hide()
      })
    const el = document.body
    const html = document.documentElement
    if (savedLocale) {
      if (savedLocale === 'fa') {
        el.classList.add('rtl')
        html.setAttribute('dir', 'rtl')
        html.setAttribute('lang', 'fa')
      } else {
        el.classList.remove('rtl')
        html.setAttribute('dir', 'ltr')
        html.setAttribute('lang', 'en')
      }
      this.$root._i18n.locale = savedLocale
    } else if (this.$root._i18n.locale === 'fa') {
      el.classList.add('rtl')
      html.setAttribute('dir', 'rtl')
      html.setAttribute('lang', 'fa')
    }
  },
  methods: {
    ...mapActions({
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
      SetDiscordChannel: 'gameStatus/SetDiscordChannel'
    })
  }
}
</script>

<style lang="scss">
@import "./sass/main";
</style>
