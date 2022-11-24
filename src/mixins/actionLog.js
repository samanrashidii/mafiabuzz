export default {
  methods: {
    actionLog (role, type) {
      let resultText = ''
      let resultImage = ''
      if (type === 'checkIdentity') {
        let currentIdentity = this.$t('common.Citizen')
        if (role.mafia && !role.status.fakeIdentity || !role.mafia && role.status.fakeIdentity) {
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
