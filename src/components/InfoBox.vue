<template>
    <div class="info-box" :class="{'active': info.show}">
        <a href="javascript:void(0)" @click="info.show = false"></a>
        <img :src="getImgUrl($t(info.icon))" alt="" />
        <h2>{{$t(info.name)}}</h2>
        <div class="mafia-status">
            <strong class="mafia-role" v-if="info.mafia">{{$t('common.Mafia')}}</strong>
            <strong class="citizen-role" v-else>{{$t('common.Citizen')}}</strong>
        </div>
        <p>{{$t(info.description)}}</p>
    </div>
</template>

<script>
export default {
    props: {
        info : {
            type : Object
        }
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
