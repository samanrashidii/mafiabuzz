export default {
  methods: {
    passiveActive (element) {
      const passiveText = `<span>${this.$t('god.logPassive')}</span> <strong>${element.info[this.currentLang].passive}</strong>`
      const passiveIcon = element.passiveIcon
      this.saveHistory(passiveIcon, passiveText)
      setTimeout(() => {
        this.$notify({
          group: 'log',
          title: passiveIcon,
          text: passiveText,
          duration: 4000
        })
      }, 500)
    }
  }
}
