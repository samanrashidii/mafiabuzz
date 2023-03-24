<template>
  <div
    class="table"
  >
    <table
      :class="{
        'safemode': gameSettings.safemode
      }"
    >
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
        <td
          :class="{
            'killer-role': tD.ability.killer && !tD.status.dead
          }"
        >
          <img
            :src="getImg('/roles', tD.icon)"
            :alt="tD.info[currentLang].name"
          > 
          <span>
            {{ tD.info[currentLang].name }}
          </span>
          <span
            v-if="tD.lastRoleInfo"
          >
            {{ `(${(tD.lastRoleInfo[currentLang].name || '')})` }}
          </span>
          <img
            v-if="tD.ability.killer && !tD.status.dead"
            src="@/assets/images/icons/killer.svg"
            alt="Killer Icon"
            class="killer-icon"
            :title="$t('common.killCapacity')"
          >
          <img
            v-if="tD.status.realGun"
            src="@/assets/images/icons/kill.svg"
            alt="Real Gun Icon"
            class="gun-icon"
            :title="$t('god.realGun')"
          >
          <img
            v-if="tD.status.fakeGun"
            src="@/assets/images/icons/fakegun.svg"
            alt="Fake Gun Icon"
            class="gun-icon"
            :title="$t('god.fakeGun')"
          >
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
              v-if="!tD.status.hasPassive && !tD.status.hasAction && !tD.hasDoneAction"
              class="disabled"
            />
            <span
              v-if="tD.status.hasPassive && !tD.status.hasAction"
              class="passive"
            />
            <span
              v-else
              :class="{
                'pending-action': (!tD.hasDoneAction && tD.status.hasAction) || (!tD.hasDoneAction && tD.status.hasAction),
                'done-action': tD.hasDoneAction
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
import CharacterPower from '@/components/CharacterPower.vue';

export default {
  name: 'Table',
  components: {
    CharacterPower
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
          'heal': char.status.heal,
          'ninja': char.status.roleReplaced,
          'love-bind': char.status.link,
          'silence': char.status.silence,
          'shield': char.status.shield && !char.status.hack,
          'invisible': char.status.fakeIdentity && !char.status.hack,
          'in-jail': char.status.inJail || char.status.busted,
          'hack': char.status.hack,
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
      this.gameSettings.selectedRoles.forEach(role => {
        if (role.id === id) {
          role.vote = vote
        }
      })
      this.SetGameSettings(this.gameSettings)
    }
  }
}
</script>
