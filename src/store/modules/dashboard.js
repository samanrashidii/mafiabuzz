import Vue from 'vue'

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
        resultImage: '',
        godImage: '',
        godText: '',
        voteImage: '',
        voteText: ''
      },
      freezeStatus: {
        linked: null,
        hacked: null,
        silenced: null,
        healed: null,
        antiSilenced: null
      },
      targetData: {},
      lastPhaseAction: false,
      voteKill: false,
      mafiaParty: true,
      historyLog: [],
      totalHistory: [],
      lastNight: [],
      lastNightBox: false,
      revengeKillBox: false,
      revengeUsed: false,
      avenger: null,
      justiceUsed: false,
      killerChanged: false,
      nextKiller: {
        icon: null,
        alt: null,
        name: null,
        player: null
      }
    }
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
  }
}
