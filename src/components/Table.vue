<template>
  <div class="table">
    <table>
      <tr>
        <th>{{ $t('common.Role') }}</th>
        <template v-if="dashboardTable">
          <th>{{ $t('common.Player') }}</th>
          <th>
            {{ $t('common.Status') }}
          </th>
          <th v-if="dashboard.day === true">
            {{ $t('common.Vote') }}
          </th>
          <th v-if="dashboard.day === false">
            {{ $t('common.Action') }}
          </th>
        </template>
        <template v-else>
          <th>{{ $t('common.Power') }}</th>
        </template>
      </tr>
      <tr
        v-for="(tD, index) in tableData"
        :key="index"
        :class="characterClasses(tD)"
      >
        <td>
          <img
            :src="getImg('/roles', tD.icon)"
            :alt="tD.info[currentLang].name"
          > {{ tD.info[currentLang].name }}
        </td>
        <template v-if="dashboardTable">
          <td><span class="character-player">{{ tD.player }}</span></td>
          <td>
            <a
              href="javascript:void(0)"
              @click="godAction(tD)"
              :class="{'killer': tD.status.dead === false, 'angel': tD.status.dead === true}"
            />
          </td>
          <td
            class="vote-counter"
            v-if="dashboard.day === true"
          >
            <input
              type="tel"
              :name="`vote_count_${index}`"
              v-model.number="tD.vote"
              placeholder="0"
              :maxlength="'2'"
              :tabindex="index+10"
              @blur="updateVotes(tD.vote, tD.id)"
              @click="selectThis"
            >
          </td>
          <td v-if="dashboard.day === false">
            <span
              class="disabled"
              v-if="!tD.status.hasPassive && !tD.status.hasAction && !tD.actionStatus"
            />
            <span
              class="passive"
              v-if="tD.status.hasPassive && !tD.status.hasAction"
            />
            <span
              v-else
              :class="{'pending-action': (!tD.actionStatus && tD.status.hasAction && !tD.action.oneTime)
                         || (!tD.actionStatus && tD.status.hasAction && tD.status.hasOneAction && tD.action.oneTime),
                       'done-action': tD.actionStatus}"
            />
          </td>
        </template>
        <template v-else>
          <td>
            <CharacterPower
              :mafia="tD.mafia"
              :solo="tD.solo"
              :power="tD.power"
            />
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CharacterPower from '@/components/CharacterPower.vue';
import actionLog from '@/mixins/dashboard/actionLog';
import actions from '@/mixins/dashboard/actions';
import deadWatcher from '@/mixins/dashboard/deadWatcher';
import godAction from '@/mixins/dashboard/godAction';
import passiveActive from '@/mixins/dashboard/passiveActive';
import saveHistory from '@/mixins/dashboard/saveHistory';

export default {
  components: {
    CharacterPower
  },
  computed: {
    ...mapGetters({
      Dashboard: 'dashboard/Dashboard',
      GameSettings: 'gameStatus/GameSettings'
    }),
    dashboard() {
      return JSON.parse(JSON.stringify(this.Dashboard))
    },
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings))
    }
  },
  props: {
    tableData: Array,
    dashboardTable: Boolean
  },
  methods: {
    ...mapActions({
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings'
    }),
    characterClasses(char) {
      if (this.dashboardTable) {
        return {
          dead: char.status.dead,
          ninja: char.status.playerReplaced,
          'love-bind': char.status.linked,
          silenced: char.status.silenced,
          shield: char.status.shield && !char.status.hacked,
          invisible: char.status.invisible && !char.status.hacked,
          'in-jail': char.status.inJail || char.status.busted,
          hacked: char.status.hacked,
          skeleton: char.status.minion,
          solo: char.solo
        }
      }
      return {
        solo: char.solo
      }
    },
    selectThis (event) {
      event.target.setSelectionRange(0, 2)
    },
    updateVotes (vote, id) {
      this.gameSettings.selectedRoles.forEach(element => {
        if (element.id === id) {
          element.vote = vote
        }
      })
      this.SetGameSettings(this.gameSettings)
    }
  },
  mixins: [
    actionLog,
    actions,
    deadWatcher,
    godAction,
    passiveActive,
    saveHistory
  ]
}
</script>
