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
      // lastPhaseAction: true,
      // mafiaParty: true,
      // readyToLog: false,
      // historyLog: [],
      // totalHistory: [],
      // lastNightLog: [],
      // lastNightBox: false,
      // targetHacked: false,
      // targetDead: false,
      // targetRevived: false,
      // killer: false,
      // multipleMafia: false,
      // log: {
      //   id: 0,
      //   passiveLog: false,
      //   godLog: true,
      //   action: 'common.None',
      //   passive: 'common.None',
      //   attacker: null,
      //   ability: {},
      //   status: {},
      //   target: '',
      //   targetInfo: {},
      //   targetRole: 'replacingRoles.loading.role',
      //   targetPassive: 'common.None',
      //   targetID: 0,
      //   target2: null,
      //   actionIcon: 'replacingRoles.loading.icon',
      //   passiveIcon: 'replacingRoles.loading.icon',
      //   mafia: false,
      //   targetMafia: false,
      // },
      // info: {
      //   id: 0,
      //   show: false,
      //   player: 'replacingRoles.loading.name',
      //   damageReturned: false,
      //   action: 'replacingRoles.loading.name',
      //   passive: 'none',
      //   ability: {},
      //   status: {},
      //   name2: 'replacingRoles.loading.name',
      //   icon: 'replacingRoles.loading.icon',
      //   icon2: 'replacingRoles.loading.icon',
      //   description: 'replacingRoles.loading.description',
      //   actionIcon: 'replacingRoles.loading.icon',
      //   mafia: false,
      //   target: '?',
      //   targetInfo: {},
      //   targetRole: 'replacingRoles.preTarget.role',
      //   targetStatus: null,
      //   targetPassive: 'none',
      //   targetID: 0,
      //   targetMafia: null,
      //   targetIcon: 'replacingRoles.preTarget.icon',
      // },
    }
  },
  getters: {
    Dashboard: state => state.dashboard,
  },
  mutations: {
    SET_DASHBOARD: (state, dashboard) => {
      Vue.set(state, 'dashboard', dashboard)
    },
  },
  actions: {
    SetDashboard: (context, dashboard) => {
      context.commit('SET_DASHBOARD', dashboard)
    },
  },
};
