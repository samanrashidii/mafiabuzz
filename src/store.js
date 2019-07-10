import Vue from 'vue';
import Vuex from 'vuex';
import dB from './db.json';

Vue.use(Vuex);

const asd = [{
  "id": 5,
  "name": "Traitor",
  "icon": "traitor.png",
  "mafia": true,
  "action": {
      "passive": "Betray",
      "action": null,
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "The Traitor is a mafioso who lives between citizens, He Doesn't wake up at night and will not revealed as a mafioso by 'Detective', but works to protect mafia and make them win",
  "power": -14,
  "free": true,
  "alt": "Traitor Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Shahryar'
  },
{
  "id": 6,
  "name": "Chef",
  "icon": "chef.png",
  "mafia": true,
  "action": {
      "passive": null,
      "action": "CheckIdentity",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "Chef is a mafioso who can poison one person at night and make him reveal his role to chef",
  "power": -18,
  "free": true,
  "alt": "Chef Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Saman'
},
{
  "id": 7,
  "name": "Yakuza",
  "icon": "yakuza.png",
  "mafia": true,
  "action": {
      "passive": null,
      "action": "Replace",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "The Yakuza is a mafioso with the power of sacrifice himself from the second night and choose an innocent to give up his role and join the mafioso with 'Mafia' role",
  "power": -22,
  "free": true,
  "alt": "Yakuza Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Samira'
},
{
  "id": 8,
  "name": "Citizen",
  "icon": "citizen.png",
  "mafia": false,
  "action": {
      "passive": null,
      "action": "Replace",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "The Dentist may select any other player at night, and prevent them speaking during the following day.[33] The Silencer is a mafioso with the identical power, except that they may not silence the same player on successive days. The silenced individual wakes in the morning and is immediately instructed not to talk until the end of the day",
  "power": 5,
  "free": true,
  "alt": "Citizen Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Mehdi'
},
{
  "id": 9,
  "name": "Police",
  "icon": "police.png",
  "mafia": false,
  "action": {
      "passive": null,
      "action": "Replace",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "The dark background roles are standard (mafia or innocent) except for revealing a deceptive alignment when killed. The M.E. gathers information from the killings that can help the innocents, while the Priest learns about the alignment of the dead in the same way that the Detective learns about the living.",
  "power": 12,
  "free": true,
  "alt": "Police Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Amin'
},
{
  "id": 10,
  "name": "Doctor",
  "icon": "doctor.png",
  "mafia": false,
  "action": {
      "passive": null,
      "action": "Replace",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "Revivers and Master Revivers are able to resurrect dead players, Master Revivers can bring the revived into their association",
  "power": 10,
  "free": true,
  "alt": "Doctor Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Erfan'
},
{
  "id": 11,
  "name": "Cupid",
  "icon": "cupid.png",
  "mafia": false,
  "action": {
      "passive": null,
      "action": "Replace",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "This role is taken in addition to the assigned role, and it endows the player with additional, overt, powers (particularly during the daytime). Empowerment can be random, but is usually made by vote. For instance, the Mayor or Sheriff can be elected each morning, and gain two lynching votes",
  "power": 7,
  "free": true,
  "alt": "Cupid Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Aryan'
},
{
  "id": 12,
  "name": "Bomb",
  "icon": "bomb.png",
  "mafia": false,
  "action": {
      "passive": null,
      "action": "Replace",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "When the thief is used in Werewolves, an additional townsfolk card is added before dealing, and the Thief may choose on the first night to steal the role of another player or to take the unused role card. The player whose role was stolen gets the unused role card and the Thief card is discarded.",
  "power": 7,
  "free": true,
  "alt": "Bomb Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Paniz'
},
{
  "id": 13,
  "name": "Grandma",
  "icon": "grandma.png",
  "mafia": false,
  "action": {
      "passive": null,
      "action": "Replace",
      "default": "Nothing"
  },
  "actionIcon": "chef.png",
  "description": "the Innocents may have some roles with the ability to kill at night. The Vigilante is an innocent who kills every night, in their own night-time phase,[Note 13] in some variations, having a limited bullet supply for the entire game. Some variations introduce a time limit of two nights before the player in the Killing Role can exercise their right to kill again or the trait that if they kill an innocent they either lose the ability to kill or die from guilt the next night.",
  "power": 10,
  "free": true,
  "alt": "Grandma Icon",
  "actionStatus": false,
  "dead": false,
  "player": 'Behrad'
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
