<template>
  <a
    class="language-bttn"
    href="javascript:void(0)"
    @click="changeLang()"
  >
    <img
      :src="getImgUrl('', MainApp.language.image)"
      :alt="$t(MainApp.language.alt)"
    >
    <strong>{{ $t(MainApp.language.text) }}</strong>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
import getImg from '@/mixins/getImg';

export default {
  computed: {
    ...mapGetters({
      MainApp: 'main/MainApp',
    }),
  },
  methods: {
    changeLang() {
      const i18n = this.$root._i18n.locale;
      if (i18n === 'en') {
        this.toggleBodyClass('addClass', 'rtl');
        this.$root._i18n.locale = 'fa';
      } else {
        this.toggleBodyClass('removeClass', 'rtl');
        this.$root._i18n.locale = 'en';
      }
    },
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;
      if (addRemoveClass === 'addClass') {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
  },
  mixins: [getImg],
};
</script>
