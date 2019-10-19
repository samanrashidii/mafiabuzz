import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    gameSettings: {
      totalPlayers: 25,
      playerMargin: 5,
      unit: 6,
      mafia: 1,
      citizen: 5,
      alivePeople: 0,
      deadPeople: 0,
      aliveMafia: 0,
      aliveCitizen: 0,
      selectedMafia: 0,
      selectedCitizen: 0,
      selectedRoles: [],
      multipleRoles: {
        normalMafia: 0,
        normalCitizen: 0,
      },
      fMafias: [],
      fCitizens: [],
      powerControl: {
        power: 0,
        mafiaPower: 0,
        citizenPower: 0,
      },
      gameStatus: false,
      gameReset: false,
      gameFinished: false,
      winner: null,
      stepCounter: 1,
      personNumb: 1,
    },
  },
  getters: {
    GameSettings: state => state.gameSettings,
  },
  mutations: {
    SET_GAME_SETTINGS: (state, settings) => {
      Vue.set(state, 'gameSettings', settings);
      state.gameSettings.fMafias = state.gameSettings.selectedRoles.filter(x => x.mafia);
      state.gameSettings.fCitizens = state.gameSettings.selectedRoles.filter(x => !x.mafia);
      state.gameSettings.alivePeople = state.gameSettings.selectedRoles.filter(x => !x.status.dead).length;
      state.gameSettings.deadPeople = state.gameSettings.selectedRoles.filter(x => x.status.dead).length;
      state.gameSettings.aliveMafia = state.gameSettings.selectedRoles.filter(x => !x.status.dead && x.mafia).length;
      state.gameSettings.aliveCitizen = state.gameSettings.selectedRoles.filter(x => !x.status.dead && !x.mafia).length;
    },
  },
  actions: {
    SetGameSettings: (context, settings) => {
      context.commit('SET_GAME_SETTINGS', settings);
    },
  },
};
