import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    gameSettings: {
      unit: 6,
      mafia: 2,
      citizens: 4,
      roles: [],
      multipleRoles:{
        normalMafia: 0,
        normalCitizen: 0,
      },
      fMafias: [],
      fCitizens: [],
      selectedMafia: 0,
      selectedCitizen: 0,
      power: 0,
      mafiaPower: 0,
      citizenPower: 0,
    }
  },
  getters: {
    GameSettings: state => state.gameSettings,
  },
  mutations: {
    SET_ROLES: (state, items) => {
      Vue.set(state.gameSettings, 'roles', [...items]);
    },
    SET_MULTIPLE_ROLES: (state, mproles) => {
      Vue.set(state.gameSettings, 'multipleRoles', mproles);
    }
  },
  actions: {
    SetRoles: (context, items) => {
      context.commit('SET_ROLES', items);
    },
    SetMultipleRoles: (context, mproles) => {
      context.commit('SET_MULTIPLE_ROLES', mproles);
    }
  }
}