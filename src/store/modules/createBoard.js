export default {
  namespaced: true,
  state: {
    createSettings:{
      maxPlayers: 25,
      playerMargin: 5,
    }
  },
  getters: {
    CreateSettings: state => state.createSettings,
  },
}