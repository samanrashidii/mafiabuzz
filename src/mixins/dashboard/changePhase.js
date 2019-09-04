export default {
    methods: {
        changePhase(phase) {
            if (!phase) {
                this.dashboard.day = true
                this.gameSettings.selectedRoles.forEach((element) => {
                // Reset One Night Actions
                element.status.roleChecked = false
                element.status.identityChecked = false
                element.status.hacked = false
                element.status.silenced = false
                element.status.healed = false
                // One Time Actions of Yakuza - Cupid - Bomb - Bulletproof
                if (element.ability.playerSwaper || element.ability.binder || element.ability.detonator || element.ability.hasShield) {
                    if (!element.action.oneTime) {
                    element.actionStatus = true
                    }
                } else {
                    element.actionStatus = false
                }
                });
                this.dashboard.totalHistory.push(this.dashboard.historyLog);
                this.gameSettings.selectedRoles.forEach((element) => {
                    this.dashboard.historyLog.forEach((item) => {
                        if (element.player === item.target && element.status.recentlyDead && !element.status.recentlyRevived
                        || element.player === item.target2 && element.status.recentlyDead && !element.status.recentlyRevived
                        || element.player === item.attacker && element.status.recentlyDead && !element.status.recentlyRevived) {
                        let logNote = `<span class='last-log red-bg dead-icon'><i>${element.player}</i> ${this.$t('god.logDeadText')}</span>`
                        element.status.recentlyDead = false
                        this.dashboard.lastNight.push(logNote)
                        }
                        if (element.player === item.target && element.status.recentlyRevived && !element.status.recentlyDead) {
                        let logNote = `<span class='last-log green-bg revived-icon'><i>${element.player}</i> ${this.$t('god.logRevivedText')}</span>`
                        element.status.recentlyRevived = false
                        this.dashboard.lastNight.push(logNote)
                        }
                        if (element.player === item.target && element.status.recentlySilenced) {
                        let logNote = `<span class='last-log blue-bg silenced-icon'><i>${element.player}</i> ${this.$t('god.logSilencedText')}</span>`
                        element.status.recentlySilenced = false
                        this.dashboard.lastNight.push(logNote)
                        }
                    });
                });
                if (this.dashboard.lastNight.length > 0) {
                    this.dashboard.lastNightBox = true
                }
                this.dashboard.historyLog = []
            } else {
                this.dashboard.lastPhaseAction = true
                if (this.dashboard.round >= 1) {
                    this.dashboard.lastNight = []
                }
                this.chooseKiller()
                this.dashboard.round++
                this.dashboard.actionProgress = 0
                this.setActionsByPriority()
                this.dashboard.day = false
            }
            this.SetDashboard(this.dashboard)
            this.SetGameSettings(this.gameSettings)
        }
    }
}