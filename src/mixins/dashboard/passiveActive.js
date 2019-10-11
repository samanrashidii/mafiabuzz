export default {
  methods: {
    passiveActive(element) {
      this.dashboard.log.passiveText = `<span>${this.$t('god.logPassive')}</span> <strong>${this.$t(element.action.passive)}</strong>`;
      this.dashboard.log.passiveIcon = element.passiveIcon;
      setTimeout(() => {
        this.$notify({
          group: 'log',
          title: `${this.dashboard.log.passiveIcon}`,
          text: `${this.dashboard.log.passiveText}`,
          duration: 4000
        })
        this.dashboard.historyLog.push({
          image: `${element.passiveIcon}`,
          text: `${this.dashboard.log.passiveText}`
        })
      }, 500);
    }
  }
}
