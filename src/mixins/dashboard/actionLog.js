export default {
  methods: {
    actionLog (element, type) {
      if (type === 'checkIdentity') {
        let currentIdentity = this.$t('common.Citizen')
        if (element.mafia && !element.status.invisible || !element.mafia && element.status.invisible) {
          currentIdentity = this.$t('common.Mafia')
        }
        this.dashboard.log.resultText = `<span>${this.$t('god.logResult')}</span> <strong>${currentIdentity}</strong>`
        this.dashboard.log.resultImage = 'investigate.svg'
      }
      if (type === 'checkRole') {
        this.dashboard.log.resultText = `<span>${this.$t('god.logResult')}</span> <strong>${this.$t(element.name)}</strong>`
        this.dashboard.log.resultImage = 'search.svg'
      }
      this.saveHistory(this.dashboard.log.resultImage, this.dashboard.log.resultText)
      setTimeout(() => {
        this.$notify({
          group: 'log',
          type: 'warn',
          title: `${this.dashboard.log.resultImage}`,
          text: `${this.dashboard.log.resultText}`,
          duration: 4000
        })
      }, 500)
    }
  }
}
