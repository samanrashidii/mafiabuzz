export default {
  methods: {
    passiveActive (role) {
      const passiveText = `<span>${this.$t('god.logPassive')}</span> <strong>${role.info[this.currentLang].passive}</strong>`
      const passiveIcon = role.passiveIcon
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
