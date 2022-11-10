<template>
  <div
    id="app"
  >
    <!-- Main Navigation -->
    <Navigation />
    <!-- Sub Navigation -->
    <div
      class="sub-header"
    >
      <LanguageButton />
      <router-link
        class="bttn subnav-bttn characters-bttn awesome"
        :to="{
          name: 'characters'
        }"
      >
        <strong>
          {{ $t('general.characters') }}
        </strong>
        <img
          src="@/assets/images/characters.svg"
          :alt="$t('pages.characters.alt')"
        >
      </router-link>
    </div>
    <!-- Header Banner -->
    <a
      href="javascript:void(0)"
      class="d-block has-xsmall-top-margin rounded shadow"
      @click="changeImage"
    >
      <img
        class="top-banner rounded"
        :src="getImg('', currentBannerImage)"
        alt="Woman Life Freedom"
      >
    </a>
    <transition
      name="slide"
      mode="out-in"
    >
      <router-view />
    </transition>
    <!-- App Notifications -->
    <notifications
      group="log"
      position="bottom center"
    >
      <template
        slot="body"
        slot-scope="props"
      >
        <div
          :class="'vue-notification ' + props.item.type"
        >
          <div
            class="image-wrapper"
          >
            <img
              :src="getImg('/actions', props.item.title)"
              :alt="props.item.title"
            >
          </div>
          <a
            class="close"
            @click="props.close"
          >
            <i
              class="fa fa-fw fa-close"
            />
          </a>
          <div
            v-html="props.item.text"
          />
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import LanguageButton from '@/components/LanguageButton.vue';
import SERVER from '@/service/server';

export default {
  components: {
    Navigation,
    LanguageButton
  },
  data () {
    return {
      imageCounter: false,
      loaderData: {
        loader: 'dots',
        color: '#c33e3e',
        width: 75,
        height: 75,
        backgroundColor: '#000000',
        canCancel: false,
        onCancel: this.onCancel
      }
    }
  },
  computed: {
    currentBannerImage () {
      let output = 'woman-life-freedom.png'
      if (this.imageCounter) {
        output = 'woman-life-freedom-2.png'
      }
      return output
    }
  },
  created() {
    // Get Default Language from localStorage
    const savedLocale = JSON.parse(window.localStorage.getItem('locale'))
    // Get Discord Token from localStorage
    const discordToken = window.localStorage.getItem('discordToken')
    // Setup Discord Channel if Discord Token available
    if (discordToken) {
      this.SetDiscordChannel(discordToken)
    }
    // App Loader for Async data to load
    const loader = this.$loading.show(this.loaderData)
    // Get all Characters from Database
    SERVER.getRoles()
      .then((res) => {
        this.SetRoles(JSON.parse(JSON.stringify(res.data)))
        // Get all Replacing Characters from Database
        SERVER.getReplacingRoles()
          .then((response) => {
            this.SetReplacingRoles(JSON.parse(JSON.stringify(response.data)))
              .then(() => {
                // After everything loaded, Set Default State of App in localstorage to prevent data loss from erros during the game
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
    // Setup App Language based on Default Language
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
    trackEvent () {
      // Track Banner click event for Analytics
      const platform = navigator.platform || 'none'
      gtag('event', 'click', {
        'event_category': 'Woman, Life and Freedom',
        'event_label': platform,
        'value': 1
      })
    },
    changeImage () {
      // Change Banner image on click
      this.imageCounter = !this.imageCounter
      this.trackEvent()
    }
  }
}
</script>

<style lang="scss">
  @import "./sass/main";
</style>
