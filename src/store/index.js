import Vue from 'vue';
import Vuex from 'vuex';
import gameStatus from './modules/gameStatus';
import roles from './modules/roles';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    gameStatus,
    roles,
  },
  state: {
    roles: [],
    savedRoles: [],
    gameReset: false,
    gameCreated: false,
    numbers: null,
    stepCounter: 1,
    dashboard: {
      god: false,
      day: true,
      round: 0,
      lastPhaseAction: true,
      mafiaParty: true,
      currentAction: 0,
      log: {
        id: 0,
        passiveLog: false,
        action: 'common.None',
        passive: 'common.None',
        attacker: null,
        ability: {},
        status: {},
        target: '',
        targetInfo: {},
        targetRole: 'replacingRoles.loading.role',
        targetPassive: 'common.None',
        targetID: 0,
        target2: null,
        actionIcon: 'replacingRoles.loading.icon',
        passiveIcon: 'replacingRoles.loading.icon',
        mafia: false,
        targetMafia: false,
      },
      historyLog: [],
      totalHistory: [],
      actionBox: [],
      lastNightLog: [],
    },
  },
  getters: {
    DefaultState: state => state,
    SelectedRoles: state => state.roles,
    SavedRoles: state => state.savedRoles,
    GameReset: state => state.gameReset,
    gameStatus: state => state.gameCreated,
    Numbers: state => state.numbers,
    StepCounter: state => state.stepCounter,
    Dashboard: state => state.dashboard,
    Actions: state => state.actionBox,
  },
  mutations: {
    GET_ROLES: (state, items) => {
      Vue.set(state, 'roles', [...items]);
    },
    SET_SAVED_ROLES: (state, roles) => {
      Vue.set(state, 'savedRoles', [...roles]);
    },
    SET_GAME: (state, status) => {
      Vue.set(state, 'gameCreated', status);
    },
    SET_NUMBERS: (state, numb) => {
      Vue.set(state, 'numbers', numb);
    },
    SET_STEP: (state, step) => {
      Vue.set(state, 'stepCounter', step);
    },
    CONTROL_DASHBOARD: (state, dashinfo) => {
      Vue.set(state, 'dashboard', dashinfo);
    },
    GAME_RESET: (state, stat) => {
      Vue.set(state, 'gameReset', stat);
    },
    SET_ACTIONS: (state, action) => {
      Vue.set(state, 'actionBox', action);
    },
  },
  actions: {
    getRoles: (context, items) => {
      context.commit('GET_ROLES', items);
    },
    setSavedRoles: (context, roles) => {
      context.commit('SET_SAVED_ROLES', roles);
    },
    setGame: (context, status) => {
      context.commit('SET_GAME', status);
    },
    setNumbers: (context, numb) => {
      context.commit('SET_NUMBERS', numb);
    },
    setStep: (context, step) => {
      context.commit('SET_STEP', step);
    },
    controlDashboard: (context, dashinfo) => {
      context.commit('CONTROL_DASHBOARD', dashinfo);
    },
    setGameReset: (context, stat) => {
      context.commit('GAME_RESET', stat);
    },
    setActions: (context, action) => {
      context.commit('SET_ACTIONS', action);
    },
  },
});
