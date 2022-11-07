import Vue from 'vue'
import Vuex from 'vuex'
import gameStatus from './modules/gameStatus'
import dashboard from './modules/dashboard'
import roles from './modules/roles'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    gameStatus,
    dashboard,
    roles
  },
  getters: {
    DefaultState: (state) => {
      const defaultItems = {
        gameStatus: state.gameStatus,
        dashboard: state.dashboard,
        roles: state.roles
      }
      return defaultItems
    }
  }
})
