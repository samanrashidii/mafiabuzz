export default {
  methods: {
    actionLog (element, type) {
      if (type === 'checkIdentity') {
        this.dashboard.log.resultText = `<span>${this.$t('god.logResult')}</span> <strong>${element.status.invisible ? `${this.$t(element.action.passive)} ${this.$t(element.hiddenRoleType)}` : this.$t(element.roleType)}</strong>`
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
