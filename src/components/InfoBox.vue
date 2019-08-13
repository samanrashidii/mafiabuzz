<template>
    <div class="info-box" :class="{'active': info.show}">
        <a href="javascript:void(0)" @click="info.show = false"></a>
        <img :src="getImgUrl('roles', $t(info.icon))" alt="" />
        <h2>{{$t(info.name)}}</h2>
        <div class="mafia-status">
            <strong class="mafia-role" v-if="info.mafia">{{$t('common.Mafia')}}</strong>
            <strong class="citizen-role" v-else>{{$t('common.Citizen')}}</strong>
        </div>
        <p>{{$t(info.description)}}</p>
    </div>
</template>

<script>
import getImg from '@/mixins/getImg';
export default {
    props: {
        info : {
            type : Object
        }
    },
    mixins: [getImg]
}
</script>

<style>

</style>
