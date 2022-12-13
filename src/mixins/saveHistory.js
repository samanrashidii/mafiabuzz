export default {
  methods: {
    saveHistory (img, txt) {
      this.dashboard.historyLog.push({
        image: img,
        text: txt
      })
    },
    saveTotalHistory (history) {
      this.dashboard.totalHistory.push(history)
      this.dashboard.historyLog = []
    }
  }
}
