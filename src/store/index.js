import Vue from 'vue';
import Vuex from 'vuex';
import gameStatus from './modules/gameStatus';
import dashboard from './modules/dashboard';
import main from './modules/main';
import roles from './modules/roles';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    gameStatus,
    dashboard,
    main,
    roles,
  },
  getters: {
    DefaultState: state => state,
  },
});
