export default {
  methods: {
    calcDifference(main,side){
      return main - side;
    },
    checkGame(){
        this.overlay = true;
        this.fMafias = this.gameSettings.roles.filter(x => x.mafia == true);
        this.fCitizens = this.gameSettings.roles.filter(x => x.mafia == false);
    },
    startGame(){
        let numb = {
            unit : this.gameSettings.unit,
            mafia : this.gameSettings.mafia,
        }
        let $savedRoles = JSON.parse(JSON.stringify(this.gameSettings.roles));
        this.getRoles(this.gameSettings.roles);
        this.setSavedRoles($savedRoles);
        this.setNumbers(numb);
        this.setGame(true);
    }
  },
};