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
            :src="getImgUrl('/roles', tD.icon)"
            :alt="tD.alt"
          > {{ $t(tD.name) }}
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
              placeholder="0"
              :maxlength="'2'"
              :tabindex="index+10"
            >
          </td>
          <td v-if="dashboard.day === false">
            <span
              class="disabled"
              v-if="!tD.status.hasPassive && !tD.status.hasAction"
            />
            <span
              class="passive"
              v-if="tD.status.hasPassive && !tD.status.hasAction"
            />
            <span
              :class="{'pending-action': !tD.actionStatus && tD.status.hasAction && !tD.action.oneTime, 'done-action': tD.actionStatus}"
              v-else
            />
          </td>
        </template>
        <template v-else>
          <td>
            <CharacterPower :mafia="tD.mafia" :power="tD.power" />        
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CharacterPower from '@/components/CharacterPower.vue';
import getImg from '@/mixins/getImg';
import actions from '@/mixins/dashboard/actions';
import godAction from '@/mixins/dashboard/godAction';

export default {
  components: {
    CharacterPower,
  },
  computed:{
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
  props: {
    tableData: Array,
    dashboardTable: Boolean
  },
  methods:{
    ...mapActions({
      SetDashboard: 'dashboard/SetDashboard',
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    characterClasses(char) {
      if(this.dashboardTable){
        return {
          dead: char.status.dead === true,
          ninja: char.status.playerSwapped === true,
          'love-bind': char.status.linked === true,
          silenced: char.status.silenced === true,
          healed: char.status.healed === true,
          shield: char.status.shield === true && !char.status.hacked, // Active if not hacked
          invisible: char.status.invisible === true && !char.status.hacked, // Active if not hacked
          hacked: char.status.hacked === true,
          skeleton: char.status.revived === true,
        }
      }
    }
  },
  mixins: [
    actions,
    getImg,
    godAction,
  ],
};
</script>
