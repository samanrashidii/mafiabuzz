<template>
  <div class="table">
    <table>
      <tr>
        <th>{{ $t('common.Role') }}</th>
        <th>{{ $t('common.Power') }}</th>
      </tr>
      <tr
        v-for="(tD, index) in tableData"
        :key="index"
      >
        <td>
          <img
            :src="getImgUrl('/roles', $t(tD.icon))"
            :alt="tD.alt"
          > {{ $t(tD.name) }}
        </td>
        <td>
          <CharacterPower :mafia="tD.mafia" :power="tD.power" />        
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterPower from '@/components/CharacterPower.vue';
import getImg from '@/mixins/getImg';

export default {
  components: {
    CharacterPower,
  },
  props: {
    tableData: Array,
  },
  mixins: [getImg],
};
</script>
