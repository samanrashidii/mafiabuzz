<template>
  <a
    href="javascript:void(0)"
    rel="langbttn"
    class="bttn awesome2 subnav-bttn language-btn"
    @click="changeLang()"
  >
    <strong>
      {{ $t('language.text') }}
    </strong>
    <img
      src="@/assets/images/language.svg"
      :alt="$t('language.alt')"
    >
  </a>
</template>

<script>
export default {
  methods: {
    changeLang() {
      const currentLang = this.$root._i18n.locale
      if (currentLang === 'en') {
        this.toggleBodyClass('addClass', 'rtl')
        this.$root._i18n.locale = 'fa'
        localStorage.setItem('locale', JSON.stringify('fa'))
      } else {
        this.toggleBodyClass('removeClass', 'rtl')
        this.$root._i18n.locale = 'en'
        localStorage.setItem('locale', JSON.stringify('en'))
      }
    },
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body
      const html = document.documentElement
      if (addRemoveClass === 'addClass') {
        el.classList.add(className)
        html.setAttribute('dir', 'rtl')
        html.setAttribute('lang', 'fa')
      } else {
        el.classList.remove(className)
        html.setAttribute('dir', 'ltr')
        html.setAttribute('lang', 'en')
      }
    }
  }
}
</script>
