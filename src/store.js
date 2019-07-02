import Vue from 'vue';
import Vuex from 'vuex';
import dB from './db.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: dB,
  },
  getters: {
    Roles: state => state.db.roles,
    Creator: state => state.db.pages.creator,
  },
  mutations: {

  },
  actions: {

  },
});
