export default {
  methods: {
    finishRules(){
      const mafiaOdds1 = this.gameSettings.selectedRoles.filter(x => !x.status.dead && x.mafia && !x.status.drunk && !x.status.traitor).length;
      const mafiaOdds2 = this.gameSettings.selectedRoles.filter(x => !x.status.dead && x.mafia && !x.status.traitor).length
      if(this.gameSettings.alivePeople / 2 <= mafiaOdds1){
        this.finishGame('mafia')
      }
      if(mafiaOdds2 === 0){
        this.finishGame('citizen')
      }
    },
    finishGame(winner){
      this.gameSettings.gameFinished = true
      this.gameSettings.winner = winner
    }
  },
};
