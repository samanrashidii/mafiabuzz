<template>
  <div
    class="navigation"
  >
    <nav>
      <router-link
        v-for="(nav, index) in navigation"
        :to="{name: nav.url}"
        :key="index"
        :disabled="nav.disabled"
      >
        <span>
          <img
            :src="getImg('', nav.image)"
            :alt="$t(nav.alt)"
          >
          <strong>
            {{ $t(nav.name) }}
          </strong>
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loggedIn: true,
      navigation: [
        {
          name: 'navigation[0].name',
          url: 'home',
          image: 'creator.svg',
          alt: 'navigation[0].alt'
        },
        {
          name: 'navigation[1].name',
          url: 'howtoplay',
          image: 'howtoplay.svg',
          alt: 'navigation[1].alt'
        },
        {
          name: 'navigation[2].name',
          url: 'about',
          image: 'logo.png',
          alt: 'navigation[2].alt'
        },
        {
          name: 'navigation[3].name',
          url: 'characters',
          image: 'characters.svg',
          alt: 'navigation[3].alt'
        }
      ]
    }
  }
}
</script>
