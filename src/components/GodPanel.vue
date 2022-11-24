<template>
  <div
    class="god god-panel"
  >
    <!-- Dashboard Buttons -->
    <div
      v-if="showGodPanel"
      class="button-holder"
    >
      <template
        v-if="gameSettings.discordChannel"
      >
        <BaseButton
          class="discord-bttn purple"
          @clicked="sendStats()"
        >
          <span>
            {{ $t('thirdparty.discordUpdateButton') }}
          </span>
        </BaseButton>
        <BaseButton 
          class="discord-bttn purple"
          @clicked="sendVoteResult()"
        >
          <span>
            {{ $t('thirdparty.discordSendVoteResult') }}
          </span>
        </BaseButton>
      </template>
      <transition
        name="fade"
        mode="out-in"
      >
        <BaseButton
          :class="{
            'day': dashboard.day,
            'night': !dashboard.day,
            'swap-bttn': true
          }"
          @clicked="changePhase(dashboard.day)"
        >
          <span
            v-if="dashboard.day"
          >
            {{ $t('god.nightText') }}
          </span>
          <span
            v-else
          >
            {{ $t('god.dayText') }}
          </span>
        </BaseButton>
      </transition>
    </div>
    <!-- Day & Night Dashboard -->
    <transition
      name="fade"
    >
      <ActionBar
        v-if="dashboard.actionProgress !== dashboard.actionBox.length"
      />
    </transition>
    <div
      class="main-dashboard"
    >
      <PageBox
        class="display god-dashboard"
        :class="{
          'game-not-started': !showGodPanel,
          'day': dashboard.day && showGodPanel,
          'night': !dashboard.day
        }"
      >
        <div
          class="inner-display"
        >
          <transition-group
            name="fade"
          >
            <strong
              v-if="!dashboard.day"
              class="round-tracker"
              key="round-tracker"
            >
              {{ dashboard.round }}
            </strong>
          </transition-group>
          <div
            class="center-aligned"
          >
            <transition
              name="slide"
              mode="out-in"
            >
              <div
                v-if="!showGodPanel"
                key="beforeShow"
              >
                <img
                  class="game-icon"
                  src="@/assets/images/icons/game.png"
                  :alt="$t('god.gameDashboardIconAlt')"
                >
                <h3
                  v-html="$t('god.gameStartText')"
                  class="different-colors"
                />
                <BaseButton
                  class="primary"
                  @clicked="showPlay()"
                >
                  {{ $t('god.godButton') }}
                </BaseButton>
              </div>
              <div
                v-else
                key="afterShow"
              >
                <div
                  class="players-role"
                >
                  <Table
                    :table-data="gameSettings.fMafias"
                    class="mafia-table table-roles"
                    dashboard-table
                  />
                  <Table
                    :table-data="gameSettings.fCitizens"
                    class="citizen-table table-roles"
                    dashboard-table
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>
      </PageBox>
    </div>
    <!-- Show History Log -->
    <div
      v-if="showGodPanel"
      class="log-bttn"
    >
      <BaseButton
        class="awesome"
        @clicked="toggleLogHistory(true)"
      >
        <span>
          {{ $t('god.historyLogButton') }} <i>{{ dashboard.totalHistory.length }}</i>
        </span>
      </BaseButton>
    </div>
    <HistoryLog
      :class="{
        'active': logHistory
      }"
      @closeLog="toggleLogHistory"
    />
    <!-- Dashboard Game Hint -->
    <DashboardHints
      v-if="showGodPanel"
    />
    <!-- Vote Killer Box -->
    <Overlay
      class="vote-box dialog"
      :class="{
        'active': dashboard.lastPhaseAction && dashboard.round >= 1
      }"
    >
      <VoteAlert />
    </Overlay>
    <!-- Role Viewer -->
    <Overlay
      :class="{
        'active': gameSettings.searchingUsed,
        'viewer': true
      }"
    >
      <RoleViewer
        v-if="gameSettings.searchingUsed"
        :roles="deadRoles"
        :show="gameSettings.searchingUsed"
      />
    </Overlay>
    <!-- Last Night Report -->
    <Overlay
      :class="{
        'active': dashboard.lastNightBox,
        'dialog': false,
        'last-night': true
      }"
    >
      <LastNightLog />
    </Overlay>
    <!-- Revenge Kill Targeting -->
    <Overlay
      class="revenge-box dialog"
      :class="{
        'active': dashboard.revengeKillBox && dashboard.actionProgress === 0
      }"
    >
      <RevengeAlert />
    </Overlay>
    <!-- Restart or Reset Game -->
    <RestartGameAlert
      v-if="showGodPanel"
    />
    <!-- Game Finish Box -->
    <GameFinished
      :class="{
        'active': gameSettings.gameFinished
      }"
      :game-winner="gameSettings.winner"
      :solo-winner-details="gameSettings.soloWinner"
    />
  </div>
</template>

<script>
import ActionBar from '@/components/ActionBar.vue';
import GameFinished from '@/components/GameFinished.vue';
import LastNightLog from '@/components/LastNightLog.vue';
import HistoryLog from '@/components/HistoryLog.vue';
import Table from '@/components/Table.vue';
import RoleViewer from '@/components/RoleViewer.vue';
import RestartGameAlert from '@/components/RestartGameAlert.vue';
import RevengeAlert from '@/components/RevengeAlert.vue';
import DashboardHints from '@/components/DashboardHints.vue';
import VoteAlert from '@/components/VoteAlert.vue';

export default {
  name: 'GodPanel',
  components: {
    ActionBar,
    GameFinished,
    LastNightLog,
    HistoryLog,
    RoleViewer,
    Table,
    RestartGameAlert,
    RevengeAlert,
    DashboardHints,
    VoteAlert
  },
  data() {
    return {
      logAction: false,
      logHistory: false,
      showGodPanel: false,
      logActionDone: false
    }
  },
  computed: {
    deadRoles () {
      const output = this.gameSettings.selectedRoles.filter(role => role.status.dead)
      return output
    }
  },
  mounted () {
    setInterval(() => {
      localStorage.setItem('save-automatic', JSON.stringify(this.allStates))
    }, 60000)
  },
  methods: {
    showPlay() {
      // Show God Panel, After Players See Their Roles
      this.showGodPanel = true
      this.addAttributesToCharacters()
      this.SetDashboard(this.dashboard)
    },
    addAttributesToCharacters () {
      this.gameSettings.selectedRoles.forEach((role) => {
        // Add Sniper Bullet Limit
        if (role.ability.sniper) {
          role.status.actionLimit = this.mafiaHalfNumber
        }
      })
      this.SetGameSettings(this.gameSettings)
    },
    sendVoteResult () {
      // Post Vote Result To Discord
      let text = `
      ${this.$t('thirdparty.discordVoteResultText')}
      `
      this.gameSettings.selectedRoles.forEach((role) => {
        if (!role.status.dead) {
          text += `
          ${role.player} => ${role.vote}
          `
        }
      })
      this.postDiscord(text)
    },
    toggleLogHistory (value) {
      this.logHistory = value
    },
    sendStats () {
      // Post Latest Game Stats To Discord
      let alivePeople = ''
      let deadPeople = ''
      this.gameSettings.selectedRoles.forEach((role) => {
        if (!role.status.dead) {
          alivePeople += `${role.player} • `
        } else {
          deadPeople += `${role.player} • `
        }
      })
      let text = `${this.$t('thirdparty.discordLatestStats')}`
      text += `

      ${this.$t('thirdparty.discordAlivePeople')}`
      
      text += `
      • ${alivePeople}`

      if (deadPeople.length > 1) {

      text += `

      ${this.$t('thirdparty.discordDeadPeople')}`
      text += `
      • ${deadPeople}`

      }

      text += `

      ${this.$t('thirdparty.discordSpentNights')} ${this.dashboard.round}
      `
      this.postDiscord(text)
    }
  }
}

</script>
