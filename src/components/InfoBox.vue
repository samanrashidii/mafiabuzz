<template>
    <div class="info-box" :class="{'active': info.show}">
        <a href="javascript:void(0)" @click="info.show = false"></a>
        <img :src="getImgUrl(info.icon)" alt="" />
        <h2>{{info.name}}</h2>
        <div class="mafia-status">
            <strong class="mafia-role" v-if="info.mafia">{{Common.Mafia}}</strong>
            <strong class="citizen-role" v-else>{{Common.Citizen}}</strong>
        </div>
        <p>{{info.description}}</p>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    props: {
        info : {
            type : Object
        }
    },
    computed:{
        ...mapGetters([
            'Common'
        ]),
    },
    methods:{
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
    },
}
</script>

<style>

</style>
