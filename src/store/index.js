import Vue from 'vue'
import Vuex from 'vuex'
import gameSettings from './modules/gameSettings'
import dashboard from './modules/dashboard'
import roles from './modules/roles'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    gameSettings,
    dashboard,
    roles
  },
  getters: {
    allStates: (state) => {
      const states = {
        gameSettings: state.gameSettings,
        dashboard: state.dashboard,
        roles: state.roles
      }
      return states
    }
  }
})
