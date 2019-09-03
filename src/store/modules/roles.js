import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    Roles: null,
  },
  getters: {
    Roles: state => state.Roles,
  },
  mutations: {
    SET_ROLES: (state, changedRoles) => {
      Vue.set(state, 'Roles', changedRoles)
    },
  },
  actions: {
    SetRoles: (context, changedRoles) => {
      context.commit('SET_ROLES', changedRoles)
    },
  },
};
