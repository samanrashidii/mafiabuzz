<template>
  <div
    class="table"
  >
    <table>
      <tr>
        <th>
          {{ $t('common.Role') }}
        </th>
        <template
          v-if="dashboardTable"
        >
          <th>
            {{ $t('common.Player') }}
          </th>
          <th>
            {{ $t('common.Status') }}
          </th>
          <th
            v-if="dashboard.day"
          >
            {{ $t('common.Vote') }}
          </th>
          <th
            v-if="!dashboard.day"
          >
            {{ $t('common.Action') }}
          </th>
        </template>
        <template
          v-else
        >
          <th>
            {{ $t('common.Power') }}
          </th>
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
          > 
          {{ tD.info[currentLang].name }}
        </td>
        <template
          v-if="dashboardTable"
        >
          <td>
            <span
              class="character-player"
            >
              {{ tD.player }}
            </span>
          </td>
          <td>
            <a
              href="javascript:void(0)"
              :class="{
                'killer': !tD.status.dead,
                'angel': tD.status.dead
              }"
              @click="godAction(tD)"
            />
          </td>
          <td
          v-if="dashboard.day"
            class="vote-counter"
          >
            <input
              v-model.number="tD.vote"
              type="tel"
              :name="`vote_count_${index}`"
              :maxlength="'2'"
              :tabindex="index+10"
              placeholder="0"
              @blur="updateVotes(tD.vote, tD.id)"
              @click="selectThis"
            >
          </td>
          <td
            v-if="!dashboard.day"
          >
            <span
              v-if="!tD.status.hasPassive && !tD.status.hasAction && !tD.actionStatus"
              class="disabled"
            />
            <span
              v-if="tD.status.hasPassive && !tD.status.hasAction"
              class="passive"
            />
            <span
              v-else
              :class="{
                'pending-action': (!tD.actionStatus && tD.status.hasAction && !tD.action.oneTime)
                || (!tD.actionStatus && tD.status.hasAction && tD.status.hasOneAction && tD.action.oneTime),
                'done-action': tD.actionStatus
              }"
            />
          </td>
        </template>
        <template
          v-else
        >
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
import actionLog from '@/mixins/actionLog';
import actions from '@/mixins/actions';
import deadWatcher from '@/mixins/deadWatcher';
import godAction from '@/mixins/godAction';
import passiveActive from '@/mixins/passiveActive';
import saveHistory from '@/mixins/saveHistory';
import CharacterPower from '@/components/CharacterPower.vue';

export default {
  name: 'Table',
  mixins: [
    actionLog,
    actions,
    deadWatcher,
    godAction,
    passiveActive,
    saveHistory
  ],
  components: {
    CharacterPower
  },
  computed: {
    dashboard() {
      return JSON.parse(JSON.stringify(this.Dashboard))
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    dashboardTable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    characterClasses (char) {
      let output = {}
      if (this.dashboardTable) {
        output = {
          'dead': char.status.dead,
          'ninja': char.status.playerReplaced,
          'love-bind': char.status.linked,
          'silenced': char.status.silenced,
          'shield': char.status.shield && !char.status.hacked,
          'invisible': char.status.invisible && !char.status.hacked,
          'in-jail': char.status.inJail || char.status.busted,
          'hacked': char.status.hacked,
          'skeleton': char.status.minion,
          'solo': char.solo
        }
      } else {
        output = {
          'solo': char.solo
        }
      }
      return output
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
  }
}
</script>
