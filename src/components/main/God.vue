<template>
  <div class="god">

    <!-- Dashboard Buttons -->

    <div
      class="button-holder"
      v-if="dashboard.god"
    >
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
      <ActionBar v-if="dashboard.startAction && dashboard.actionProgress !== dashboard.actionBox.length" />
    </transition>

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
            class="bttn awesome2 night-actions" 
            href="javascript:void(0)"
            key="night-actions"
            >{{$t('god.nightActionButton')}}
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
                :src="getImgUrl('/icons', $t('god.icon'))"
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
                  :dashboardTable="true"
                />
                <Table
                  class="citizen-table table-roles"
                  :table-data="gameSettings.fCitizens"
                  :dashboardTable="true"
                />

              </div>
            </div>
          </transition>
        </div>
      </div>
    </PageBox>

    <!-- Dashboard Game Hint -->

    <PageBox
      class="only-box"
      v-if="dashboard.god"
    >
      <ul class="dashboard-hint">
        <li
          v-for="(hint, index) in $t('god.dashboardHint')"
          :key="index"
        >
          <span :class="hint.name">{{ hint.hint }}</span>
        </li>
      </ul>
    </PageBox>

    <!-- Restart or Reset Game -->

    <AppButton
      class="active has-xsmall-bottom-margin"
      @click.native="overlay = true, totRestart = false"
      v-if="dashboard.god"
    >
      {{ $t('god.rgwRoles') }}
    </AppButton>
    <AppButton
      class="purple has-bottom-margin"
      v-if="dashboard.god"
      @click.native="overlay = true, totRestart = true"
    >
      {{ $t('god.resetGame') }}
    </AppButton>

    <Overlay :class="{'active': overlay,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        :src="getImgUrl('/icons', $t('general.warning'))"
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
          <span>{{ $t('god.restartButton') }}</span>
        </AppButton>
        <AppButton
          @click.native="overlay = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </AppButton>
      </template>
    </Overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ActionBar from '@/components/ActionBar.vue';
import Overlay from '@/components/Overlay.vue';
import Table from '@/components/Table.vue';
import getImg from '@/mixins/getImg';
import changePhase from '@/mixins/dashboard/changePhase';
import setActions from '@/mixins/dashboard/setActions';
export default {
  data() {
    return {
      overlay: false,
      logAction: false,
      logHistory: false,
      logActionDone: false,
      totRestart: false,
    };
  },
  components: {
    ActionBar,
    Overlay,
    Table,
  },
  computed: {
    ...mapGetters({
      Dashboard: 'dashboard/Dashboard',
      GameSettings: 'gameStatus/GameSettings',
    }),
    dashboard(){
      return JSON.parse(JSON.stringify(this.Dashboard))
    },
    gameSettings(){
      return JSON.parse(JSON.stringify(this.GameSettings))
    },
  },
  methods: {
    ...mapActions({
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    // Reset Game From Start
    resetFactory() {
      console.log('hard reset')
    },
    // Reset Game with Same Roles and Names
    resetSameGame() {
      console.log('soft reset')
    },
    // Show God Dashboard
    showPlay() {
      this.dashboard.god = true
      this.SetDashboard(this.dashboard);
    },
    // Start Action Box
    startAction(){
      this.dashboard.startAction = true;
      this.SetDashboard(this.dashboard);
    }
  },
  mixins: [
    changePhase,
    getImg,
    setActions
  ],
};

</script>
