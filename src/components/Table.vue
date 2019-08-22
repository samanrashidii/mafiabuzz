<template>
    <div class="table">
        <table>
            <tr>
                <th>{{$t('common.Role')}}</th>
                <th>{{$t('common.Power')}}</th>
            </tr>
            <tr v-for="(tD, index) in tableData" :key="index">
                <td><img :src="getImgUrl('roles', $t(tD.icon))" :alt="tD.alt" /> {{$t(tD.name)}}</td>
                <td><div class="character-power"><span :class="{'mafia': tD.mafia, 'citizen': !tD.mafia}" :style="{width: `${Math.abs(tD.power)*2}%`}"><i>{{Math.abs(tD.power)}}</i></span></div></td>
            </tr>
        </table>
    </div>
</template>

<script>
import getImg from '@/mixins/getImg';
import {mapGetters} from 'vuex';
export default {
    props:{
        tableData:{
            type: Array
        }
    },
    mixins: [getImg]
}
</script>
