<template>
    <div class="table">
        <table>
            <tr>
                <th>{{Common.Role}}</th>
                <th>{{Common.Player}}</th>
                <th v-if="dashboard.day == true">{{Common.Vote}}</th>
                <th v-if="dashboard.day == false">{{Common.Status}}</th>
                <th v-if="dashboard.day == false">{{Common.Action}}</th>
            </tr>
            <tr v-for="(fM, index) in finalMafias" :key="index" :class="characterClasses(fM)">
                <td>
                    <a @click="showInfo(fM)" href="javascript:void(0)">
                        <img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}
                    </a>
                </td>
                <td><span class="character-player">{{fM.player}}</span></td>
                <td class="vote-counter" v-if="dashboard.day == true"><input type="tel" :name="`vote_count_${index}`" placeholder="0" :maxlength="'2'" :tabindex="index+10" /></td>
                <td v-if="dashboard.day == false"><a href="javascript:void(0)" @click="deadOrAlive(fM)" :class="{'killer': fM.status.dead == false, 'angel': fM.status.dead == true}"></a></td>
                <td v-if="dashboard.day == false">
                    <span class="disabled" v-if="fM.action.passive == null && fM.action.action == null"></span>
                    <span class="done-action" v-else-if="fM.action.action == null && fM.action.passive != null && fM.actionStatus == true"></span>
                    <span @click="showInfo(fM)" class="passive" v-if="fM.action.passive != null && fM.action.action == null"></span>
                    <span @click="showInfo(fM)" :class="{'pending-action': fM.actionStatus == false && fM.action.action != null, 'done-action': fM.actionStatus == true}" v-else></span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    props:{
        tableItems:{
            type:
        }
    },
    computed:{
    ...mapGetters([
        'Dashboard',
        'God',
        'Numbers',
        'Common',
        'SavedRoles',
        'SelectedRoles',
        'Actions',
        'ReplacingRole'
    ]),
}
</script>

<style scoped>

</style>