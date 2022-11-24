<template>
  <div
    class="priority-box"
  >
    <!-- Before Action Box -->
    <transition
      name="fade"
    >
      <div
        class="before-action-box"
        v-if="mafiaParty && dashboard.round === 1"
      >
        <div
          class="table-display"
        >
          <div
            class="table-cell-display"
          >
            <img
              src="@/assets/images/roles/mafiaparty.svg"
              :alt="$t('god.mafiaPartyIconAlt')"
            >
            <p
              class="site-color"
            >
              {{ $t('god.mafiaPartyText') }}
            </p>
            <ul
              class="error-bullet type-2"
            >
              <li
                v-for="(mp, index) in $t('god.mafiaPartyException')"
                :key="index"
                v-html="mp"
              />
            </ul>
            <BaseButton
              class="primary has-small-top-margin"
              @clicked="toggleMafiaParty(false)"
            >
              {{ $t('god.mafiaPartyButton') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </transition>

    <!-- Next Killer Box -->
    <transition
      name="fade"
    >
      <NextKillerBox
        v-if="dashboard.killerChanged"
      />
    </transition>

    <!-- Role Viewer -->
    <Overlay
      :class="{
        'active': gameSettings.roleViewer,
        'viewer': true
      }"
    >
      <RoleViewer
        v-if="gameSettings.roleViewer"
        :roles="gameSettings.viewerItems"
        :show="gameSettings.roleViewer"
      />
    </Overlay>

    <!-- Actions Progress Bar -->
    <div
      class="progress-bar"
    >
      <a
        class="prev-action"
        href="javascript:void(0)"
        @click="navigateActions(dashboard.actionProgress, 'prev')"
        v-if="dashboard.actionProgress !== 0"
      />
      <div
        class="bar-holder"
      >
        <span
          :style="{width: progress+'%'}"
        />
        <i>
          <strong>{{ dashboard.actionProgress }}</strong> / {{ dashboard.actionBox.length }}
        </i>
      </div>
      <a
        class="next-action"
        href="javascript:void(0)"
        @click="navigateActions(dashboard.actionProgress, 'next')"
        v-if="dashboard.actionProgress !== dashboard.actionBox.length"
      />
    </div>

    <!-- Handle Actions -->
    <div>
      <div
        class="action-box-wrapper"
        v-for="(player, index) in dashboard.actionBox"
        :key="index"
      >
        <!-- Actions Overlay -->
        <template
          v-if="dashboard.actionProgress === index"
        >
          <!-- Hacked Overlay -->
          <div
            v-if="checkStatus(player).status.hack"
            class="action-overlay hack-overlay"
            key="hackedTarget"
          >
            <div
              class="table-display"
            >
              <div
                class="table-cell-display"
              >
                <img
                  src="@/assets/images/roles/hacked.svg"
                  :alt="$t('god.hackedIconAlt')"
                >
                <p><span>{{ player.info[currentLang].name }} </span> <strong v-html="$t('god.hackedPerson')" /></p>
                <BaseButton
                  class="primary"
                  @clicked="skipAction(index)"
                >
                  {{ $t('god.skipButton3') }}
                </BaseButton>
              </div>
            </div>
          </div>
          <!-- In Jail Overlay -->
          <div
            v-if="checkStatus(player).status.inJail"
            class="action-overlay jail-overlay"
            key="inJailTarget"
          >
            <div
              class="table-display"
            >
              <div
                class="table-cell-display"
              >
                <img
                  src="@/assets/images/icons/in-jail.svg"
                  :alt="$t('god.inJailIconAlt')"
                >
                <p><span>{{ player.info[currentLang].name }} </span> <strong v-html="$t('god.inJailPerson')" /></p>
                <BaseButton
                  class="black"
                  @clicked="skipAction(index)"
                >
                  {{ $t('god.skipButton3') }}
                </BaseButton>
              </div>
            </div>
          </div>
          <div
            class="action-overlay dead-overlay"
            v-if="checkStatus(player).status.dead && !checkStatus(player).status.recentlyDead"
            key="deadTarget"
          >
            <div
              class="table-display"
            >
              <div
                class="table-cell-display"
              >
                <div
                  class="has-clear-fix"
                >
                  <img
                    src="@/assets/images/roles/grave.svg"
                    :alt="$t('god.deadIconAlt')"
                  >
                  <img
                    class="overlap"
                    :src="getImg('/roles', player.icon)"
                    :alt="$t('god.playerIconAlt')"
                  >
                </div>
                <p><span>{{ player.info[currentLang].name }} </span> <strong v-html="$t('god.deadPerson')" /></p>
                <BaseButton
                  class="black"
                  @clicked="skipAction(index)"
                >
                  {{ $t('god.skipButton3') }}
                </BaseButton>
              </div>
            </div>
          </div>

          <p>{{ $t('god.actionQuestion1') }}<span :class="{'mafia-role': player.mafia, 'citizen-role': !player.mafia && !player.solo , 'solo-role': !player.mafia && player.solo}"> {{ player.info[currentLang].name }} </span> {{ $t('god.actionQuestion2') }} <strong>{{ player.info[currentLang].action }}</strong> ?</p>
          <ActionBox
            :player="player"
            :player-index="index"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBox from '@/components/ActionBox.vue';
import NextKillerBox from '@/components/NextKillerBox.vue';
import RoleViewer from '@/components/RoleViewer.vue';
import actionLog from '@/mixins/actionLog';
import actions from '@/mixins/actions';
import controlActions from '@/mixins/controlActions';
import navigateActions from '@/mixins/navigateActions';
import passiveActive from '@/mixins/passiveActive';
import saveHistory from '@/mixins/saveHistory';
import voteKiller from '@/mixins/voteKiller';

export default {
  name: 'ActionBar',
  components: {
    ActionBox,
    NextKillerBox,
    RoleViewer
  },
  data () {
    return {
      mafiaParty: true
    }
  },
  computed: {
    progress () {
      return (this.dashboard.actionProgress / this.dashboard.actionBox.length) * 100
    }
  },
  methods: {
    checkStatus (player) {
      let target
      if (player) {
        this.gameSettings.selectedRoles.forEach((role) => {
          if (role.player === player.player) {
            target = role
          }
        })
      }
      return target
    },
    toggleMafiaParty (value) {
      this.mafiaParty = value
    }
  },
  mixins: [
    actionLog,
    actions,
    navigateActions,
    controlActions,
    passiveActive,
    saveHistory,
    voteKiller
  ]
}
</script>
