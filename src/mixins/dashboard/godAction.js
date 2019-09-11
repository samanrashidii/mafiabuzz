export default {
  methods: {
    godAction(target) {
      target.status.dead === true ? this.revive(target) : this.kill(target)
      this.SetGameSettings(this.gameSettings)
    }
  }
};
