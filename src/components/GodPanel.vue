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
        ref="actionBar"
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
          'night': !dashboard.day,
          'has-action-button': showGodPanel && !dashboard.day
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
    <!-- Dashboard Game Hint -->
    <PageBox
      v-if="showGodPanel"
      class="only-box"
    >
      <h2
        class="center-aligned"
      >
        {{ $t('god.dashboardHintTitle') }}
      </h2>
      <ul
        class="dashboard-hint has-top-margin"
      >
        <li
          v-for="(hint, index) in $t('god.dashboardHint')"
          :key="index"
        >
          <span
            :class="hint.name"
          >
            {{ hint.hint }}
          </span>
        </li>
      </ul>
    </PageBox>
    <!-- Game Log History -->
    <Log
      :class="{
        'active': logHistory
      }"
      @closeLog="toggleLogHistory"
    />
    <!-- Vote Killer Box -->
    <Overlay
      class="vote-box dialog"
      :class="{
        'active': dashboard.lastPhaseAction && dashboard.round >= 1
      }"
    >
      <template>
        <div
          class="justice-used"
          v-if="dashboard.justiceUsed"
        >
          <img
            src="@/assets/images/roles/judge.svg"
            class="default-image-size"
            :alt="$t('god.justiceAlt')"
          >
          <img
            src="@/assets/images/actions/justice.svg"
            class="default-image-size"
            :alt="$t('god.justiceAlt')"
          >
          <p>
            {{ $t('god.justiceText') }}
          </p>
        </div>
        <div
          v-else
          class="default-vote"
        >
          <img
            src="@/assets/images/roles/vote.svg"
            :alt="$t('god.voteIconAlt')"
          >
          <p>{{ $t('god.lastPhaseText') }}</p>
        </div>
        <select
          v-model="lastDayTarget"
          name="last_day_target"
          @change="findTarget(lastDayTarget)"
        >
          <option
            :value="null"
            disabled
          >
            {{ $t('god.selectPlaceholder') }}
          </option>
          <option
            v-for="(person, index) in checkGroup('lastDay')"
            :key="index"
          >
            {{ person.player }}
          </option>
        </select>
        <BaseButton
          @clicked="killByVote(dashboard.targetData.player)"
        >
          {{ $t('god.confirmButton') }}
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="lastPhaseController()"
        >
          {{ $t('god.skipButton') }}
        </BaseButton>
      </template>
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
    <!-- Last Night Log -->
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
      <template>
        <p>
          <strong
            class="has-left-right-margin"
          >
            {{ dashboard.avenger }}
          </strong>
          {{ $t('god.avengerText') }}
        </p>
        <img
          src="@/assets/images/actions/kill.svg"
          class="default-image-size"
          :alt="$t('god.revengeIconAlt')"
        >
        <img
          src="@/assets/images/roles/revenge.svg"
          class="default-image-size"
          :alt="$t('god.revengeIconAlt')"
        >
        <p>
          {{ $t('god.revengeText') }}
        </p>
        <select
          v-model="revengeTarget"
          class="has-top-margin"
          name="last_day_target"
          @change="findTarget(revengeTarget)"
        >
          <option
            :value="null"
            disabled
          >
            {{ $t('god.selectPlaceholder') }}
          </option>
          <option
            v-for="(person, index) in checkGroup('lastDay')"
            :key="index"
          >
            {{ person.player }}
          </option>
        </select>
        <BaseButton
          @clicked="killByVote(dashboard.targetData.player, true)"
        >
          {{ $t('god.confirmButton') }}
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="deadWatcher(false)"
        >
          {{ $t('god.skipButton') }}
        </BaseButton>
      </template>
    </Overlay>
    <!-- Restart or Reset Game -->
    <template
      v-if="showGodPanel"
    >
      <BaseButton
        class="active has-xsmall-bottom-margin"
        @clicked="toggleOverlay(true), toggleResetGame(false)"
      >
        {{ $t('god.rgwRoles') }}
      </BaseButton>
      <BaseButton
        class="danger has-bottom-margin"
        @clicked="toggleOverlay(true), toggleResetGame(true)"
      >
        {{ $t('god.resetGame') }}
      </BaseButton>
    </template>
    <Overlay
      :class="{
        'active': overlay,
        'dialog': true
      }"
    >
      <img
        class="has-xsmall-bottom-margin"
        src="@/assets/images/icons/warning.svg"
        :alt="$t('general.warningIcon')"
      >
      <template
        v-if="!resetGame"
      >
        <p>
          {{ $t('god.resetText') }}
        </p>
        <BaseButton
          class="green "
          @clicked="resetSameGame()"
        >
          <span>
            {{ $t('god.restartButton') }}
          </span>
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="toggleOverlay(false)"
        >
          <span>
            {{ $t('god.cancelButton') }}
          </span>
        </BaseButton>
      </template>
      <template
        v-else
      >
        <p>
          {{ $t('god.resetTotalText') }}
        </p>
        <BaseButton
          class="green "
          @clicked="resetFactory()"
        >
          <span>
            {{ $t('god.startButton') }}
          </span>
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="toggleOverlay(false)"
        >
          <span>
            {{ $t('god.cancelButton') }}
          </span>
        </BaseButton>
      </template>
    </Overlay>

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
import Log from '@/components/Log.vue';
import Table from '@/components/Table.vue';
import actionLog from '@/mixins/actionLog';
import actions from '@/mixins/actions';
import actionFilters from '@/mixins/actionFilters';
import changePhase from '@/mixins/changePhase';
import deadWatcher from '@/mixins/deadWatcher';
import passiveActive from '@/mixins/passiveActive';
import possibilities from '@/mixins/possibilities';
import saveHistory from '@/mixins/saveHistory';
import setActions from '@/mixins/setActions';
import skipAction from '@/mixins/skipAction';
import voteKiller from '@/mixins/voteKiller';
import RoleViewer from '@/components/RoleViewer.vue';

export default {
  name: 'GodPanel',
  mixins: [
    actionLog,
    actions,
    actionFilters,
    changePhase,
    deadWatcher,
    passiveActive,
    possibilities,
    setActions,
    saveHistory,
    skipAction,
    voteKiller
  ],
  components: {
    ActionBar,
    GameFinished,
    LastNightLog,
    Log,
    RoleViewer,
    Table
  },
  data() {
    return {
      overlay: false,
      logAction: false,
      logHistory: false,
      showGodPanel: false,
      logActionDone: false,
      lastDayTarget: null,
      resetGame: false,
      revengeTarget: null
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
      localStorage.setItem('capturedState', JSON.stringify(this.DefaultState))
    }, 60000)
  },
  methods: {
    lastPhaseController() {
      // Finish Day After Taking Vote
      this.dashboard.lastPhaseAction = false
      this.finishDay()
      this.SetDashboard(this.dashboard)
      this.SetGameSettings(this.gameSettings)
    },
    resetFactory() {
      // Reset Game With Default Settings
      this.startGameEngine('hard')
    },
    resetSameGame() {
      // Reset Game With Last Game Played Settings
      this.startGameEngine('soft')
    },
    showPlay() {
      // Show God Panel, After Players See Their Roles
      this.showGodPanel = true
      this.addAttributesToCharacters()
      this.SetDashboard(this.dashboard)
    },
    addAttributesToCharacters () {
      this.gameSettings.selectedRoles.forEach((element) => {
        // Add Sniper Bullet Limit
        if (element.ability.sniper) {
          element.status.actionLimit = this.mafiaHalfNumber
        }
      })
      this.SetGameSettings(this.gameSettings)
    },
    sendVoteResult () {
      // Post Vote Result To Discord
      let text = `
      ${this.$t('thirdparty.discordVoteResultText')}
      `
      this.gameSettings.selectedRoles.forEach((element) => {
        if (!element.status.dead) {
          text += `
          ${element.player} => ${element.vote}
          `
        }
      })
      this.postDiscord(text)
    },
    toggleOverlay (value) {
      this.overlay = value
    },
    toggleResetGame (value) {
      this.resetGame = value
    },
    toggleLogHistory (value) {
      this.logHistory = value
    },
    sendStats () {
      // Post Latest Game Stats To Discord
      let alivePeople = ''
      let deadPeople = ''
      this.gameSettings.selectedRoles.forEach((element) => {
        if (!element.status.dead) {
          alivePeople += `${element.player} • `
        } else {
          deadPeople += `${element.player} • `
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
