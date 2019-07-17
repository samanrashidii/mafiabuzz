import Vue from 'vue';
import Vuex from 'vuex';
import dB from './db.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: dB,
    roles: [],
    gameCreated: false,
    numbers: null,
    stepCounter: 1,
    dashboard: {
      god: false,
      day: true,
      round: 0,
      log: {
        action: null,
        passive: null,
        attacker: null,
        target: null,
        target2: null,
        actionIcon: "loader.svg",
        mafia: false,
        targetMafia: false,
      },
      historyLog: [],
      totalHistory: [],
    },
  },
  getters: {
    Roles: state => state.db.roles,
    Navigation: state => state.db.navigation,
    Creator: state => state.db.pages.creator,
    Player: state => state.db.pages.player,
    About: state => state.db.pages.about,
    HowToPlay: state => state.db.pages.howToPlay,
    God: state => state.db.god,
    SelectedRoles: state => state.roles,
    gameStatus: state => state.gameCreated,
    Numbers: state => state.numbers,
    StepCounter: state => state.stepCounter,
    Dashboard: state => state.dashboard,
  },
  mutations: {
    GET_ROLES: (state, items) => {
      Vue.set(state, 'roles', [...items]);
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
    UPDATE_LOG: (state, log) => {
      Vue.set(state.historyLog, 'dashboard', log);
    },
  },
  actions: {
    getRoles: (context, items) => {
      context.commit('GET_ROLES', items);
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
    updateLog: (context, log) => {
      context.commit('UPDATE_LOG', log);
    },
  },
});
