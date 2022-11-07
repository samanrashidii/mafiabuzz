import Vue from 'vue'
import SERVER from '@/service/server'

export default {
  namespaced: true,
  state: {
    gameSettings: {
      totalPlayers: 45,
      playerMargin: 5,
      unit: 6,
      mafia: 1,
      citizen: 5,
      alivePeople: 0,
      deadPeople: 0,
      aliveMafia: 0,
      aliveCitizen: 0,
      selectedMafia: 0,
      selectedCitizen: 0,
      selectedRoles: [],
      multipleRoles: {
        normalMafia: 0,
        normalCitizen: 0
      },
      fMafias: [],
      fCitizens: [],
      powerControl: {
        power: 0,
        mafiaPower: 0,
        citizenPower: 0
      },
      gameSettings: false,
      gameReset: false,
      gameFinished: false,
      winner: null,
      soloWins: false,
      soloWinnner: null,
      reviewGame: false,
      stepCounter: 1,
      personNumb: 1,
      roleViewer: false,
      searchingUsed: false,
      viewerItems: [],
      discordChannel: null
    }
  },
  getters: {
    GameSettings: state => state.gameSettings
  },
  mutations: {
    SET_GAME_SETTINGS: (state, settings) => {
      Vue.set(state, 'gameSettings', settings)
      // Start Game Rules
      state.gameSettings.fMafias = state.gameSettings.selectedRoles.filter(x => x.mafia)
      state.gameSettings.fCitizens = state.gameSettings.selectedRoles.filter(x => !x.mafia)
      state.gameSettings.alivePeople = state.gameSettings.selectedRoles.filter(x => !x.status.dead).length
      state.gameSettings.deadPeople = state.gameSettings.selectedRoles.filter(x => x.status.dead).length
      state.gameSettings.aliveMafia = state.gameSettings.selectedRoles.filter(x => !x.status.dead && x.mafia).length
      state.gameSettings.aliveCitizen = state.gameSettings.selectedRoles.filter(x => !x.status.dead && !x.mafia && !x.solo).length
      state.gameSettings.aliveSolo = state.gameSettings.selectedRoles.filter(x => !x.status.dead && !x.mafia && x.solo).length
      // End Game Rules
      const hasFinishStopper = state.gameSettings.selectedRoles.filter(x => x.solo && x.status.finishStopper && !x.status.dead)
      const mafiaOdds = state.gameSettings.selectedRoles.filter(x => !x.status.dead && x.mafia && !x.status.traitor).length
      const soloOdds = hasFinishStopper.length > 0
      const finishGame = (winner) => {
        state.gameSettings.gameFinished = true
        state.gameSettings.winner = winner
      }
      if (state.gameSettings.alivePeople <= 2 && state.gameSettings.gameSettings && soloOdds) {
        state.gameSettings.soloWinner = hasFinishStopper[0]
        state.gameSettings.soloWins = true
      }

      if (state.gameSettings.soloWins && !state.gameSettings.reviewGame) {
        finishGame('solo')
      } else if (state.gameSettings.alivePeople / 2 <= mafiaOdds && hasFinishStopper.length === 0 && state.gameSettings.gameSettings && !state.gameSettings.reviewGame) {
        finishGame('mafia')
      } else if (mafiaOdds === 0 && hasFinishStopper.length === 0 && state.gameSettings.gameSettings && !state.gameSettings.reviewGame) {
        finishGame('citizen')
      }
    },
    SET_DISCORD_CHANNEL: (state, data) => {
      state.gameSettings.discordChannel = data
      if (data) {
        window.localStorage.setItem('discordToken', data)
      } else {
        window.localStorage.removeItem('discordToken')
      }
    }
  },
  actions: {
    SetGameSettings: (context, settings) => {
      context.commit('SET_GAME_SETTINGS', settings)
    },
    SetDiscordChannel: (context, data) => {
      context.commit('SET_DISCORD_CHANNEL', data)
    },
    PostToDiscord: (context, data) => SERVER.postToDiscord(data.payload, data.url)
  }
}
