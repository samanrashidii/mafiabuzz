import Vue from 'vue';
import Vuex from 'vuex';
import dB from './db.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: dB,
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
      currentAction: 0,
      log: {
        id: 0,
        action: null,
        passive: null,
        attacker: null,
        target: null,
        targetRole: null,
        targetPassive: null,
        targetID: 0,
        target2: null,
        actionIcon: "loader.svg",
        passiveIcon: "loader.svg",
        mafia: false,
        targetMafia: false,
      },
      historyLog: [],
      totalHistory: [],
      actionBox: [],
    },
  },
  getters: {
    Roles: state => state.db.roles,
    Common: state => state.db.common,
    ReplacingRole: state => state.db.replacingRoles,
    Navigation: state => state.db.navigation,
    Home: state => state.db.pages.home,
    Creator: state => state.db.pages.creator,
    Player: state => state.db.pages.player,
    About: state => state.db.pages.about,
    HowToPlay: state => state.db.pages.howToPlay,
    PowerMeter: state => state.db.powerMeter,
    God: state => state.db.god,
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
