import SERVER from '@/server';
export default {
  methods: {
    startGameEngine(type) {
      SERVER.getMainData()
      .then((response) => {
        this.SetMainApp(response.data);
      });
      SERVER.getRoles()
        .then((response) => {
          this.SetRoles(response.data);
          SERVER.getReplacingRoles()
            .then((response) => {
              const defaultState = JSON.parse(localStorage.getItem('defaultState'));
              const defaultSettings = JSON.parse(localStorage.getItem('defaultSettings'));
              this.SetReplacingRoles(response.data);
              if(type === 'hard'){
                this.SetGameSettings(defaultState.gameStatus.gameSettings)
                this.SetDashboard(defaultState.dashboard.dashboard)
              } else if(type === 'soft'){
                this.SetGameSettings(defaultSettings.gameStatus.gameSettings)
                this.SetDashboard(defaultSettings.dashboard.dashboard)
                this.SetRoles(defaultSettings.roles.Roles)
                this.SetReplacingRoles(defaultSettings.roles.ReplacingRoles)
              } else if(type === 'change'){
                this.SetGameSettings(defaultSettings.gameStatus.gameSettings)
                this.SetRoles(defaultSettings.roles.Roles)
                this.SetReplacingRoles(defaultSettings.roles.ReplacingRoles)
                this.gameSettings.gameStatus = false;
                this.gameSettings.stepCounter = 1;
                this.SetGameSettings(this.gameSettings);
              }
            });
      });
    }
  },
};
