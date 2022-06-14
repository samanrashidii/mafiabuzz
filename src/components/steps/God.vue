<template>
  <div class="god">
    <!-- Dashboard Buttons -->
    <div
      class="button-holder"
      v-if="dashboard.god"
    >
      <AppButton
        v-if="gameSettings.discordChannel"
        @click.native="sendStats()"
        class="discord-bttn purple"
      >
        <span>{{ $t('thirdparty.discordUpdateButton') }}</span>
      </AppButton>
      <AppButton
        v-if="gameSettings.discordChannel"
        @click.native="sendVoteResult()"
        class="discord-bttn purple"
      >
        <span>{{ $t('thirdparty.discordSendVoteResult') }}</span>
      </AppButton>
      <transition
        name="fade"
        mode="out-in"
      >
        <AppButton
          :class="{'day':dashboard.day, 'night':!dashboard.day, 'swap-bttn':true}"
          @click.native="changePhase(dashboard.day)"
        >
          <span v-if="dashboard.day">{{ $t('god.nightText') }}</span>
          <span v-else>{{ $t('god.dayText') }}</span>
        </AppButton>
      </transition>
    </div>

    <!-- Day & Night Dashboard -->
    <transition name="fade">
      <ActionBar
        v-if="dashboard.startAction && dashboard.actionProgress !== dashboard.actionBox.length"
        ref="targetScroll"
      />
    </transition>

    <div class="main-dashboard">
      <PageBox
        class="display godashboard"
        :class="{'day': dashboard.day && dashboard.god, 'night': !dashboard.day, 'has-action-button': dashboard.god && !dashboard.day && !dashboard.startAction}"
      >
        <div class="inner-display">
          <transition-group name="fade">
            <strong
              class="round-tracker"
              v-if="!dashboard.day"
              key="round-tracker"
            >{{ dashboard.round }}</strong>
            <a
              v-if="dashboard.god && !dashboard.day && !dashboard.startAction"
              @click="startAction()"
              class="bttn awesome2 night-actions color-flow"
              href="javascript:void(0)"
              key="night-actions"
            >{{ $t('god.nightActionButton') }}
            </a>
          </transition-group>
          <div class="center-aligned">
            <transition
              name="slide"
              mode="out-in"
            >
              <div
                v-if="!dashboard.god"
                key="beforeShow"
              >
                <img
                  class="game-icon"
                  src="@/assets/images/icons/game.png"
                  :alt="$t('god.gameDashboardIconAlt')"
                >
                <h3
                  class="different-colors"
                  v-html="$t('god.gameStartText')"
                />
                <AppButton
                  class="active"
                  @click.native="showPlay()"
                >
                  {{ $t('god.godButton') }}
                </AppButton>
              </div>
              <div
                v-else
                key="afterShow"
              >
                <div class="players-role">
                  <Table
                    class="mafia-table table-roles"
                    :table-data="gameSettings.fMafias"
                    :dashboard-table="true"
                  />
                  <Table
                    class="citizen-table table-roles"
                    :table-data="gameSettings.fCitizens"
                    :dashboard-table="true"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>
      </PageBox>
    </div>

    <div
      class="log-bttn"
      v-if="dashboard.god"
    >
      <AppButton
        @click.native="logHistory = true"
        class="awesome"
      >
        <span>{{ $t('god.historyLogButton') }} <i>{{ dashboard.totalHistory.length }}</i></span>
      </AppButton>
    </div>

    <!-- Dashboard Game Hint -->
    <PageBox
      class="only-box"
      v-if="dashboard.god"
    >
      <h2 class="center-aligned">{{ $t('god.dashboardHintTitle') }}</h2>
      <ul class="dashboard-hint has-top-margin">
        <li
          v-for="(hint, index) in $t('god.dashboardHint')"
          :key="index"
        >
          <span :class="hint.name">{{ hint.hint }}</span>
        </li>
      </ul>
    </PageBox>

    <!-- Game Log -->

    <Log
      :class="{'active': logHistory}"
      @closeLog="logHistory = $event"
    />

    <!-- Vote Killer Box -->
    <Overlay
      class="vote-box dialog"
      :class="{'active': dashboard.lastPhaseAction && dashboard.round >= 1}"
    >
      <template>
        <div
          class="justice-used"
          v-if="dashboard.justiceUsed"
        >
          <img
            class="default-image-size"
            src="@/assets/images/roles/judge.svg"
            :alt="$t('god.justiceAlt')"
          >
          <img
            class="default-image-size"
            src="@/assets/images/actions/justice.svg"
            :alt="$t('god.justiceAlt')"
          >
          <p>{{ $t('god.justiceText') }}</p>
        </div>
        <div
          class="default-vote"
          v-else
        >
          <img
            src="@/assets/images/roles/vote.svg"
            :alt="$t('god.voteIconAlt')"
          >
          <p>{{ $t('god.lastPhaseText') }}</p>
        </div>
        <select
          name="last_day_target"
          v-model="lastDayTarget"
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
        <AppButton @click.native="killByVote(dashboard.targetData.player)">
          {{ $t('god.confirmButton') }}
        </AppButton>
        <AppButton
          class="danger"
          @click.native="lastPhaseController()"
        >
          {{ $t('god.skipButton') }}
        </AppButton>
      </template>
    </Overlay>

    <!-- Role Viewer -->
    <Overlay
      :class="{
        'active': gameSettings.roleViewer,
        'viewer': true
      }"
    >
      <RoleViewer
        v-if="gameSettings.roleViewer"
        :roles="deadRoles"
        :show="gameSettings.roleViewer"
      />
    </Overlay>

    <!-- Last Night Log -->
    <Overlay
      :class="{
        'active': dashboard.lastNightBox,
        'dialog': false, 'last-night': true
      }"
    >
      <LastNightLog />
    </Overlay>

    <!-- Revenge Kill Targeting -->
    <Overlay
      class="revenge-box dialog"
      :class="{'active': dashboard.revengeKillBox && dashboard.actionProgress === 0}"
    >
      <template>
        <p>
          <strong class="has-left-right-margin">{{ dashboard.avenger}}</strong>
          {{ $t('god.avengerText') }}
        </p>
        <img
          class="default-image-size"
          src="@/assets/images/actions/kill.svg"
          :alt="$t('god.revengeIconAlt')"
        >
        <img
          class="default-image-size"
          src="@/assets/images/roles/revenge.svg"
          :alt="$t('god.revengeIconAlt')"
        >
        <p>
          {{ $t('god.revengeText') }}
        </p>
        <select
          class="has-top-margin"
          name="last_day_target"
          v-model="revengeTarget"
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
        <AppButton
          @click.native="killByVote(dashboard.targetData.player, true)"
        >
          {{ $t('god.confirmButton') }}
        </AppButton>
        <AppButton
          class="danger"
          @click.native="deadWatcher(false)"
        >
          {{ $t('god.skipButton') }}
        </AppButton>
      </template>
    </Overlay>

    <!-- Restart or Reset Game -->
    <AppButton
      class="active has-xsmall-bottom-margin"
      @click.native="overlay = true, totRestart = false"
      v-if="dashboard.god"
    >
      {{ $t('god.rgwRoles') }}
    </AppButton>
    <AppButton
      class="danger has-bottom-margin"
      v-if="dashboard.god"
      @click.native="overlay = true, totRestart = true"
    >
      {{ $t('god.resetGame') }}
    </AppButton>
    <Overlay :class="{'active': overlay,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        src="@/assets/images/icons/warning.svg"
        :alt="$t('general.warningIcon')"
      >
      <template v-if="!totRestart">
        <p>{{ $t('god.resetText') }}</p>
        <AppButton
          @click.native="resetSameGame()"
          class="green "
        >
          <span>{{ $t('god.restartButton') }}</span>
        </AppButton>
        <AppButton
          @click.native="overlay = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </AppButton>
      </template>
      <template v-else>
        <p>{{ $t('god.resetTotalText') }}</p>
        <AppButton
          @click.native="resetFactory()"
          class="green "
        >
          <span>{{ $t('god.startButton') }}</span>
        </AppButton>
        <AppButton
          @click.native="overlay = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </AppButton>
      </template>
    </Overlay>

    <!-- Game Finish Box -->
    <GameFinished
      :class="{'active': gameSettings.gameFinished}"
      :game-winner="gameSettings.winner"
      :solo-winner-details="gameSettings.soloWinner"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ActionBar from '@/components/ActionBar.vue';
import GameFinished from '@/components/GameFinished.vue';
import LastNightLog from '@/components/LastNightLog.vue';
import Log from '@/components/Log.vue';
import Overlay from '@/components/Overlay.vue';
import Table from '@/components/Table.vue';
import actionLog from '@/mixins/dashboard/actionLog';
import actions from '@/mixins/dashboard/actions';
import actionFilters from '@/mixins/dashboard/actionFilters';
import changePhase from '@/mixins/dashboard/changePhase';
import deadWatcher from '@/mixins/dashboard/deadWatcher';
import passiveActive from '@/mixins/dashboard/passiveActive';
import possibilities from '@/mixins/dashboard/possibilities';
import saveHistory from '@/mixins/dashboard/saveHistory';
import setActions from '@/mixins/dashboard/setActions';
import skipAction from '@/mixins/dashboard/skipAction';
import voteKiller from '@/mixins/dashboard/voteKiller';
import RoleViewer from '@/components/RoleViewer.vue';
import startGame from '@/mixins/startGame';

export default {
  data() {
    return {
      overlay: false,
      logAction: false,
      logHistory: false,
      logActionDone: false,
      lastDayTarget: null,
      totRestart: false,
      revengeTarget: null
    }
  },
  components: {
    ActionBar,
    GameFinished,
    LastNightLog,
    Log,
    Overlay,
    RoleViewer,
    Table
  },
  computed: {
    ...mapGetters({
      Dashboard: 'dashboard/Dashboard',
      DefaultState: 'DefaultState',
      GameSettings: 'gameStatus/GameSettings',
      ReplacingRoles: 'roles/ReplacingRoles',
      Roles: 'roles/Roles'
    }),
    roles() {
      return JSON.parse(JSON.stringify(this.Roles))
    },
    dashboard() {
      return JSON.parse(JSON.stringify(this.Dashboard))
    },
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings))
    },
    replacingRoles() {
      return JSON.parse(JSON.stringify(this.ReplacingRoles))
    },
    deadRoles () {
      const output = this.GameSettings.selectedRoles.filter(role => role.status.dead)
      return output
    }
  },
  mounted () {
    setInterval(() => {
      localStorage.setItem('capturedState', JSON.stringify(this.DefaultState))
    }, 60000)
  },
  methods: {
    ...mapActions({
      SetRoles: 'roles/SetRoles',
      SetReplacingRoles: 'roles/SetReplacingRoles',
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
      SetDiscordChannel: 'gameStatus/SetDiscordChannel'
    }),
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
      this.dashboard.god = true
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
    startAction() {
      // Start Night Actions
      this.dashboard.startAction = true
      this.SetDashboard(this.dashboard)
      setTimeout(() => {
        const container = this.$refs.targetScroll.$el
        this.$scrollTo(container, 500, {
          offset: -15
        })
      }, 200)
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
  },
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
    startGame,
    voteKiller
  ]
}

</script>
