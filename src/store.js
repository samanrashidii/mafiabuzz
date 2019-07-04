import Vue from 'vue';
import Vuex from 'vuex';
import dB from './db.json';

Vue.use(Vuex);

const saman = [{
  "mafia": true,
  "name": "Chef",
  "icon": "chef.png",
  "alt": "Chef Icon",
  "priority": 21,
  "power": -18,
  "free": true,
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
  "description": "This role is taken in addition to the assigned role, and it endows the player with additional, overt, powers (particularly during the daytime). Empowerment can be random, but is usually made by vote. For instance, the Mayor or Sheriff can be elected each morning, and gain two lynching votes"
}];

export default new Vuex.Store({
  state: {
    db: dB,
    roles: saman,
  },
  getters: {
    Roles: state => state.db.roles,
    Creator: state => state.db.pages.creator,
    SelectedRoles: state => state.roles,
  },
  mutations: {
    GET_ROLES: (state, items) => {
      Vue.set(state, 'roles', [...items]);
    },
  },
  actions: {
    getRoles: (context, items) => {
      context.commit('GET_ROLES', items);
    },
  },
});
