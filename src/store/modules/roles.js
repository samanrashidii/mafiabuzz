import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    Roles: [],
    ReplacingRoles: []
  },
  getters: {
    Roles: state => state.Roles,
    ReplacingRoles: state => state.ReplacingRoles
  },
  mutations: {
    SET_ROLES: (state, changedRoles) => {
      Vue.set(state, 'Roles', changedRoles)
    },
    SET_REPLACING_ROLES: (state, data) => {
      Vue.set(state, 'ReplacingRoles', data)
    }
  },
  actions: {
    SetRoles: (context, changedRoles) => {
      context.commit('SET_ROLES', changedRoles)
    },
    SetReplacingRoles: (context, data) => {
      context.commit('SET_REPLACING_ROLES', data)
    }
  }
}
