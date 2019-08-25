<template>
    <div class="info-box" :class="{'active': info.show}">
        <a href="javascript:void(0)" @click="info.show = false"></a>
        <img :src="getImgUrl('roles', $t(info.icon))" :alt="$t(info.alt)" />
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
    info: Object,
  },
  mixins: [getImg],
};
</script>

<style lang="scss" scoped>

.info-box{
    position:fixed;
    bottom:-95%;
    left: 1%;
    width:98%;
    height: 95%;
    padding:45px 15px 15px 15px;
    background-color: $transparent_black;
    border-radius: 15px 15px 0 0 ;
    z-index: 999999999;
    transition: all .3s ease-in-out;
    &.active{
        bottom:0;
    }
    img{margin-bottom: 5px;}
    h2{text-align: center;}
    p{font-size: $font_size_4;}
    a{
        position: absolute;
        top:0;
        left:0;
        display: block;
        width:100%;
        height: 36px;
        border-bottom:1px solid $background_color_main;
        border-radius: 15px 15px 0 0;
        z-index: 10;
    }
    &.static{
        position: static;
        width:100%;
        height: auto;
        text-align: justify;
        padding:15px;
        margin:15px auto;
        border-radius: $site_radius;
        a{display:none;}
        p{padding-top:15px;}
    }
}

</style>
