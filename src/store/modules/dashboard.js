import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    dashboard: {
      god: false,
      day: true,
      round: 0,
      actionBox: [],
      actionProgress: 0,
      startAction: false,
      actionTarget1: null,
      actionTarget2: null,
      log: {
        mainText: '',
        sideText: '',
        passiveText: '',
        image: '',
      },
      targetData: {},
      freezeStatus: {
        linked: null,
        hacked: null,
        silenced: null,
        healed: null,
      },
      // lastPhaseAction: true,
      // mafiaParty: true,
      // readyToLog: false,
      historyLog: [],
      totalHistory: [],
      // lastNightLog: [],
      // lastNightBox: false,
      // targetHacked: false,
      // targetDead: false,
      // targetRevived: false,
      // killer: false,
      // multipleMafia: false
    },
  },
  getters: {
    Dashboard: state => state.dashboard
  },
  mutations: {
    SET_DASHBOARD: (state, dashboard) => {
      Vue.set(state, 'dashboard', dashboard)
    }
  },
  actions: {
    SetDashboard: (context, dashboard) => {
      context.commit('SET_DASHBOARD', dashboard)
    }
  },
};
