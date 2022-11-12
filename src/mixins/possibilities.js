export default {
  computed: {
    // Calc Total Players Divided by 4 to Up
    peopleInSquareNumber () {
      const numb = this.gameSettings.unit / 4
      return Math.ceil(numb)
    },
    // Calc Total Mafia Players by 4 to Up
    mafiaHalfNumber () {
      const numb = this.gameSettings.mafia / 2
      return Math.ceil(numb)
    },
    // Calc Fair Chance In Players Number
    chanceByPeopleNumber () {
      let numb = 0
      if (this.gameSettings.totalPlayers <= 15) {
        numb = 2
      } else if (this.gameSettings.totalPlayers <= 25) {
        numb = 3
      } else if (this.gameSettings.totalPlayers <= 35) {
        numb = 4
      } else if (this.gameSettings.totalPlayers <= 50) {
        numb = 5
      }
      return numb
    }
  }
}
