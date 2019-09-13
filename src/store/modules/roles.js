import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    Roles: null,
  },
  getters: {
    Roles: state => state.Roles,
    DefaultAbility: state => state.Roles[0].ability,
    DefaultStatus: state => state.Roles[0].status
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
