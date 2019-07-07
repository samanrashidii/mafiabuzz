import Vue from 'vue';
import Vuex from 'vuex';
import dB from './db.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: dB,
    roles: [],
    gameCreated: false,
    numbers: null,
  },
  getters: {
    Roles: state => state.db.roles,
    Creator: state => state.db.pages.creator,
    SelectedRoles: state => state.roles,
    gameStatus: state => state.gameCreated,
    Numbers: state => state.numbers,
  },
  mutations: {
    GET_ROLES: (state, items) => {
      Vue.set(state, 'roles', [...items]);
    },
    SET_GAME: (state, status) => {
      Vue.set(state, 'gameCreated', status);
    },
    SET_NUMBERS: (state, numb) => {
      Vue.set(state, 'numbers', numb);
    },
  },
  actions: {
    getRoles: (context, items) => {
      context.commit('GET_ROLES', items);
    },
    setGame: (context, status) => {
      context.commit('SET_GAME', status);
    },
    setNumbers: (context, numb) => {
      context.commit('SET_NUMBERS', numb);
    },
  },
});
