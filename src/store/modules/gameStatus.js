import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    gameSettings: {
      unit: 6,
      mafia: 1,
      citizen: 5,
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
    },
  },
  actions: {
    SetGameSettings: (context, settings) => {
      context.commit('SET_GAME_SETTINGS', settings);
    },
  },
};
