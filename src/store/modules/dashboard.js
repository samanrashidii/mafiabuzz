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
      log: {
        mainText: '',
        sideText: '',
        passiveText: '',
        resultText: '',
        image: '',
        resultImage: ''
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
      lastNightLog: [],
      lastNight: [],
      lastNightBox: false,
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
