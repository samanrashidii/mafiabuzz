import Vue from 'vue';
import Vuex from 'vuex';
import dB from './db.json';

Vue.use(Vuex);

const asd = [{
  "mafia": true,
  "name": "Chef",
  "icon": "chef.png",
  "alt": "Chef Icon",
  "priority": 21,
  "power": -18,
  "free": true,
  "player": 'Saman',
  "dead": false,
  "action": "CheckIdentity",
  "actionStatus": false,
  "actionIcon": "chef.png",
  "description": "The baker is on the side of the innocents. During the night, the baker gives one player a loaf of bread, potentially revealing their identity. If the baker dies, the innocents have just three nights to dispose of the mafia, or the innocents starve, and the mafia win."
},
{
  "mafia": true,
  "name": "Yakuza",
  "icon": "yakuza.png",
  "alt": "Yakuza Icon",
  "power": -22,
  "priority": 26,
  "free": true,
  "player": 'Samira',
  "dead": false,
  "action": "Kill",
  "actionStatus": false,
  "actionIcon": "chef.png",
  "description": "The Yakuza is a regular mafia player with an extra power: they may sacrifice themselves from the second night (during the night) and choose an innocent to join the mafia."
},
{
  "mafia": false,
  "name": "Citizen",
  "icon": "citizen.png",
  "alt": "Citizen Icon",
  "power": 5,
  "priority": 101,
  "free": true,
  "player": 'Shahryar',
  "dead": false,
  "action": null,
  "actionStatus": false,
  "actionIcon": "chef.png",
  "description": "The Dentist may select any other player at night, and prevent them speaking during the following day.[33] The Silencer is a mafioso with the identical power, except that they may not silence the same player on successive days. The silenced individual wakes in the morning and is immediately instructed not to talk until the end of the day"
},
{
  "mafia": false,
  "name": "Police",
  "icon": "police.png",
  "alt": "Police Icon",
  "power": 12,
  "priority": 41,
  "free": true,
  "player": 'Erfan',
  "dead": false,
  "action": "CheckIdentity",
  "actionStatus": false,
  "actionIcon": "chef.png",
  "description": "The dark background roles are standard (mafia or innocent) except for revealing a deceptive alignment when killed. The M.E. gathers information from the killings that can help the innocents, while the Priest learns about the alignment of the dead in the same way that the Detective learns about the living."
},
{
  "mafia": false,
  "name": "Doctor",
  "icon": "doctor.png",
  "alt": "Doctor Icon",
  "power": 10,
  "priority": 46,
  "free": true,
  "player": 'Amin',
  "dead": false,
  "action": "Heal",
  "actionStatus": false,
  "actionIcon": "chef.png",
  "description": "Revivers and Master Revivers are able to resurrect dead players, Master Revivers can bring the revived into their association"
},
{
  "mafia": false,
  "name": "Cupid",
  "icon": "cupid.png",
  "alt": "Cupid Icon",
  "power": 7,
  "priority": 56,
  "free": true,
  "player": 'Mehdi',
  "dead": false,
  "action": "Link",
  "actionStatus": false,
  "actionIcon": "chef.png",
  "description": "This role is taken in addition to the assigned role, and it endows the player with additional, overt, powers (particularly during the daytime). Empowerment can be random, but is usually made by vote. For instance, the Mayor or Sheriff can be elected each morning, and gain two lynching votes"
}];

export default new Vuex.Store({
  state: {
    db: dB,
    roles: asd,
    gameCreated: false,
    numbers: null,
    stepCounter: 3,
    dashboard: {
      god: false,
      day: true,
    },
  },
  getters: {
    Roles: state => state.db.roles,
    Creator: state => state.db.pages.creator,
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
  },
});
