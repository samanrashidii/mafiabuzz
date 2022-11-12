export default {
  methods: {
    actionLog (element, type) {
      let resultText = ''
      let resultImage = ''
      if (type === 'checkIdentity') {
        let currentIdentity = this.$t('common.Citizen')
        if (element.mafia && !element.status.invisible || !element.mafia && element.status.invisible) {
          currentIdentity = this.$t('common.Mafia')
        }
        resultText = `<span>${this.$t('god.logResult')}</span> <strong>${currentIdentity}</strong>`
        resultImage = 'investigate.svg'
      }
      this.saveHistory(resultImage, resultText)
      setTimeout(() => {
        this.$notify({
          group: 'log',
          type: 'warn',
          title: resultImage,
          text: resultText,
          duration: 4000
        })
      }, 500)
    }
  }
}
