<template>
  <a
    class="language-bttn"
    href="javascript:void(0)"
    @click="changeLang()"
  >
    <img
      :src="getImgUrl('', $t('language.image'))"
      :alt="$t('language.alt')"
    >
    <strong>{{ $t('language.text') }}</strong>
  </a>
</template>

<script>
import getImg from '@/mixins/getImg';

export default {
  methods: {
    changeLang() {
      const i18n = this.$root._i18n.locale;
      if (i18n === 'en') {
        this.toggleBodyClass('addClass', 'rtl')
        this.$root._i18n.locale = 'fa'
      } else {
        this.toggleBodyClass('removeClass', 'rtl')
        this.$root._i18n.locale = 'en'
      }
    },
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;
      if (addRemoveClass === 'addClass') {
        el.classList.add(className)
      } else {
        el.classList.remove(className)
      }
    },
  },
  mixins: [getImg],
};
</script>
