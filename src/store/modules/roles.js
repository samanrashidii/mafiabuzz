import Vue from 'vue';
import roles from '@/api/roles.json';

export default {
  namespaced: true,
  state: {
    Roles: roles,
  },
  getters: {
    Roles: state => state.Roles,
  },
  mutations: {
    SET_ROLES: (state, changedRoles) => {
      Vue.set(state, 'Roles', changedRoles);
    },
  },
  actions: {
    SetRoles: (context, changedRoles) => {
      context.commit('SET_ROLES', changedRoles);
    },
  }
}