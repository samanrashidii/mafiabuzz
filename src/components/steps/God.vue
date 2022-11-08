<template>
  <div
    class="god god-panel"
  >
    <!-- Dashboard Buttons -->
    <div
      class="button-holder"
      v-if="dashboard.god"
    >
      <BaseButton
        v-if="gameSettings.discordChannel"
        @clicked="sendStats()"
        class="discord-bttn purple"
      >
        <span>{{ $t('thirdparty.discordUpdateButton') }}</span>
      </BaseButton>
      <BaseButton
        v-if="gameSettings.discordChannel"
        @clicked="sendVoteResult()"
        class="discord-bttn purple"
      >
        <span>{{ $t('thirdparty.discordSendVoteResult') }}</span>
      </BaseButton>
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
        v-if="dashboard.startAction && dashboard.actionProgress !== dashboard.actionBox.length"
        ref="targetScroll"
      />
    </transition>

    <div
      class="main-dashboard"
    >
      <PageBox
        class="display godashboard"
        :class="{
          'day': dashboard.day && dashboard.god,
          'night': !dashboard.day,
          'has-action-button': dashboard.god && !dashboard.day && !dashboard.startAction
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
            <a
              v-if="dashboard.god && !dashboard.day && !dashboard.startAction"
              class="bttn awesome2 night-actions color-flow"
              href="javascript:void(0)"
              key="night-actions"
              @click="startAction()"
            >
              {{ $t('god.nightActionButton') }}
            </a>
          </transition-group>
          <div
            class="center-aligned"
          >
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
                  v-html="$t('god.gameStartText')"
                  class="different-colors"
                />
                <BaseButton
                  class="active"
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
                    :dashboard-table="true"
                    class="mafia-table table-roles"
                  />
                  <Table
                    :table-data="gameSettings.fCitizens"
                    :dashboard-table="true"
                    class="citizen-table table-roles"
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
      <BaseButton
        class="awesome"
        @clicked="logHistory = true"
      >
        <span>
          {{ $t('god.historyLogButton') }} <i>{{ dashboard.totalHistory.length }}</i>
        </span>
      </BaseButton>
    </div>

    <!-- Dashboard Game Hint -->
    <PageBox
      v-if="dashboard.god"
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
      :class="{'active': dashboard.revengeKillBox && dashboard.actionProgress === 0}"
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
    <BaseButton
      v-if="dashboard.god"
      class="active has-xsmall-bottom-margin"
      @clicked="overlay = true, totRestart = false"
    >
      {{ $t('god.rgwRoles') }}
    </BaseButton>
    <BaseButton
      v-if="dashboard.god"
      class="danger has-bottom-margin"
      @clicked="overlay = true, totRestart = true"
    >
      {{ $t('god.resetGame') }}
    </BaseButton>
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
        v-if="!totRestart"
      >
        <p>
          {{ $t('god.resetText') }}
        </p>
        <BaseButton
          @clicked="resetSameGame()"
          class="green "
        >
          <span>
            {{ $t('god.restartButton') }}
          </span>
        </BaseButton>
        <BaseButton
          class="danger"
          @clicked="overlay = false"
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
          @clicked="overlay = false"
        >
          <span>
            {{ $t('god.cancelButton') }}
          </span>
        </BaseButton>
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
import ActionBar from '@/components/ActionBar.vue';
import GameFinished from '@/components/GameFinished.vue';
import LastNightLog from '@/components/LastNightLog.vue';
import Log from '@/components/Log.vue';
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
    RoleViewer,
    Table
  },
  computed: {
    roles() {
      return JSON.parse(JSON.stringify(this.Roles))
    },
    dashboard() {
      return JSON.parse(JSON.stringify(this.Dashboard))
    },
    replacingRoles() {
      return JSON.parse(JSON.stringify(this.ReplacingRoles))
    },
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
    voteKiller
  ]
}

</script>
