import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    mainApp: null,
  },
  getters: {
    MainApp: state => state.mainApp,
  },
  mutations: {
    SET_MAIN_APP: (state, data) => {
      Vue.set(state, 'mainApp', data);
    },
  },
  actions: {
    SetMainApp: (context, data) => {
      context.commit('SET_MAIN_APP', data);
    },
  },
};
