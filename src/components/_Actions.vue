<template>
  <div>
      <!-- Night Priority Action Box -->

    <transition name="fade">
      <div
        class="priority-box"
        v-if="!dashboard.day && dashboard.actionBox.length !== dashboard.actionProgress"
      >
        <!-- Before Action Box -->
        <transition name="fade">
          <div
            class="before-action-box"
            v-if="dashboard.lastPhaseAction && dashboard.round > 1 || dashboard.mafiaParty && dashboard.round === 1"
          >
            <div class="table-display">
              <div class="table-cell-display">
                <!-- Last Phase Action -->
                <template v-if="dashboard.lastPhaseAction && dashboard.round > 1">
                  <img
                    :src="getImgUrl('/roles', $t('god.voteIcon'))"
                    :alt="$t('god.deadIconAlt')"
                  >
                  <p>{{ $t('god.lastPhaseText') }}</p>
                  <select
                    name="action_target"
                    v-model="dashboard.log.target"
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
                  <app-button @click.native="killByVote(dashboard.log.target)">
                    {{ $t('god.confirmButton') }}
                  </app-button>
                  <app-button
                    class="danger"
                    @click.native="lastPhaseController()"
                  >
                    {{ $t('god.skipButton') }}
                  </app-button>
                </template>
                <!-- Last Phase Action -->
                <template v-else-if="dashboard.mafiaParty && dashboard.round === 1">
                  <img
                    :src="getImgUrl('/roles', $t('god.mafiaPartyIcon'))"
                    :alt="$t('god.mafiaPartyIconAlt')"
                  >
                  <p class="site-color">
                    {{ $t('god.mafiaPartyText') }}
                  </p>
                  <ul class="error-bullet type-2">
                    <li
                      v-for="(mp, index) in $t('god.mafiaPartyException')"
                      :key="index"
                      v-html="mp"
                    />
                  </ul>
                  <app-button
                    class="has-small-top-margin"
                    @click.native="mafiaPartyController()"
                  >
                    {{ $t('god.mafiaPartyButton') }}
                  </app-button>
                </template>
              </div>
            </div>
          </div>
        </transition>

        <!-- Actions Progress Bar -->
        <div class="progress-bar">
          <span :style="{width: progress+'%'}" />
          <i><strong>{{ dashboard.actionProgress }}</strong> / {{ dashboard.actionBox.length }}</i>
        </div>

        <!-- Handle Actions -->

        <div v-if="dashboard.actionBox.length > 0">
          <template v-for="(action, index) in dashboard.actionBox">
            <div
              class="action-box"
              v-if="readyActions(action, index)"
              :key="index"
            >

              <transition
                name="fade"
                mode="out-in"
              >
                <!-- Hacked Target Action -->
                <div
                  class="action-overlay hacked-overlay"
                  v-if="dashboard.targetHacked"
                  key="hackedTarget"
                >
                  <div class="table-display">
                    <div class="table-cell-display">
                      <img
                        :src="getImgUrl('/roles', $t('god.hackedIcon'))"
                        :alt="$t('god.hackedIconAlt')"
                      >
                      <p><span :class="{'mafia-role': dashboard.info.mafia, 'citizen-role': !dashboard.info.mafia}">{{ $t(dashboard.info.name2) }} </span> <strong v-html="$t('god.hackedPerson')" /></p>
                      <app-button
                        class="purple"
                        @click.native="skipAction()"
                      >
                        {{ $t('god.skipButton3') }}
                      </app-button>
                    </div>
                  </div>
                </div>
                <!-- Dead Target Action -->
                <div
                  class="action-overlay dead-overlay"
                  v-else-if="dashboard.targetDead"
                  key="deadTarget"
                >
                  <div class="table-display">
                    <div class="table-cell-display">
                      <img
                        :src="getImgUrl('/roles', $t('god.deadIcon'))"
                        :alt="$t('god.deadIconAlt')"
                      >
                      <img
                        class="overlap"
                        :src="getImgUrl('/roles', $t(dashboard.info.icon2))"
                        :alt="$t('god.playerIconAlt')"
                      >
                      <p><span :class="{'mafia-role': dashboard.info.mafia, 'citizen-role': !dashboard.info.mafia}">{{ $t(dashboard.info.name2) }} </span> <strong v-html="$t('god.deadPerson')" /></p>
                      <app-button
                        class="black"
                        @click.native="skipAction()"
                      >
                        {{ $t('god.skipButton3') }}
                      </app-button>
                    </div>
                  </div>
                </div>
                <!-- Revived Target Action -->
                <div
                  class="action-overlay dead-overlay"
                  v-else-if="dashboard.targetRevived"
                  key="revivedTarget"
                >
                  <div class="table-display">
                    <div class="table-cell-display">
                      <img
                        :src="getImgUrl('/roles', $t(dashboard.info.icon2))"
                        :alt="$t('god.revivedIconAlt')"
                      >
                      <p><span :class="{'mafia-role': dashboard.info.mafia, 'citizen-role': !dashboard.info.mafia}">{{ dashboard.info.player }} </span> <strong v-html="$t('god.revivedPerson')" /></p>
                      <app-button
                        class="black"
                        @click.native="skipAction()"
                      >
                        {{ $t('god.skipButton3') }}
                      </app-button>
                    </div>
                  </div>
                </div>
              </transition>

              <p>{{ $t('god.actionQuestion1') }}<span :class="{'mafia-role': action.mafia, 'citizen-role': !action.mafia}"> {{ $t(action.name) }} </span> {{ $t('god.actionQuestion2') }} <strong>{{ $t(action.action.action) }}</strong> ?</p>
              <div class="player-box-holder has-small-bottom-margin">
                <div class="player-box">
                  <img
                    :src="getImgUrl('/roles', $t(action.icon))"
                    :alt="$t('god.playerIconAlt')"
                  >
                  <h4
                    class="has-xsmall-top-margin"
                    :class="{'mafia-role': action.mafia,'citizen-role': !action.mafia}"
                  >
                    {{ action.player }}
                  </h4>
                </div>
                <div class="arrow">
                  <img
                    class="action-image"
                    :src="getImgUrl('/actions', $t(action.actionIcon))"
                    :alt="$t('god.playerActionIconAlt')"
                  >
                </div>
                <div class="player-box">
                  <img
                    :src="getImgUrl('/roles', $t(dashboard.info.targetIcon))"
                    :alt="$t('god.playerIconAlt')"
                  >
                  <h4
                    class="has-xsmall-top-margin"
                    :class="{'mafia-role': dashboard.info.targetMafia !== null && dashboard.info.targetMafia, 'citizen-role': dashboard.info.targetMafia !== null && !dashboard.info.targetMafia}"
                  >
                    {{ dashboard.info.target }}
                  </h4>
                </div>
              </div>
              <select
                @change="findTarget(dashboard.log.target)"
                name="action_target"
                v-model="dashboard.log.target"
              >
                <option
                  :value="null"
                  disabled
                >
                  {{ $t('god.selectPlaceholder') }}
                </option>
                <option
                  v-for="(person, index) in checkGroup(action)"
                  :key="index"
                >
                  {{ person.player }}
                </option>
              </select>
              <template v-if="action.ability.binder && dashboard.log.target !== null">
                <label for="action_target_2">{{ $t('god.actionHintText2') }}</label>
                <select
                  name="action_target_2"
                  v-model="dashboard.log.target2"
                >
                  <option
                    :value="null"
                    disabled
                  >
                    {{ $t('god.selectPlaceholder') }}
                  </option>
                  <option
                    v-for="(person, index) in checkSecondGroup(action)"
                    :key="index"
                  >
                    {{ person.player }}
                  </option>
                </select>
              </template>
            </div>
          </template>
        </div>

        <!-- Action Buttons -->
        <app-button @click.native="executeAction(dashboard.info)">
          {{ $t('god.confirmButton') }}
        </app-button>
        <app-button
          class="danger"
          @click.native="alertBox = true"
        >
          {{ $t('god.skipButton') }}
        </app-button>

        <!-- Log Actions During Night -->
        <overlay :class="{'active': logAction, 'log': true, 'done': logActionDone}">
          <div class="log-action">
            <img
              :src="getImgUrl('/actions', $t(dashboard.log.actionIcon))"
              :alt="$t('god.actionIconAlt')"
              v-if="!dashboard.log.passiveLog"
            >
            <img
              :src="getImgUrl('/roles', $t(dashboard.log.passiveIcon))"
              :alt="dashboard.log.target"
              v-else
            >
            <log-events
              v-if="dashboard.readyToLog"
              :log="dashboard.log"
            />
          </div>
        </overlay>
      </div>
    </transition>

    <!-- Alert Box -->

    <overlay :class="{'active': alertBox,'dialog': true}">
      <img
        class="has-xsmall-bottom-margin"
        :src="require(`@/assets/images/icons/warning.png`)"
        :alt="$t('general.warningIcon')"
      >
      <template>
        <p>{{ $t('god.skipText') }}</p>
        <app-button
          @click.native="skipAction()"
          class="green"
        >
          <span>{{ $t('god.skipButton2') }}</span>
        </app-button>
        <app-button
          @click.native="alertBox = false"
          class="danger"
        >
          <span>{{ $t('god.cancelButton') }}</span>
        </app-button>
      </template>
    </overlay>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>