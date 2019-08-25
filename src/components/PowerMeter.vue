<template>
    <div class="power-meter">
        <div class="has-clear-fix">
            <div class="mafia-power">
                <strong v-if="mafia > 0"><i class="hint-color">{{mafia}} </i> <span class='mafia-role'>{{$t('common.Mafia')}}</span> {{$t('powerMeter.minus')}}</strong>
                <strong v-else-if="mafia < 0"><i class="hint-color">{{Math.abs(mafia)}} </i> <span class='mafia-role'>{{$t('common.Mafia')}}</span> {{$t('powerMeter.plus')}}</strong>
                <span>{{$t('powerMeter.mafia')}}: <b>{{power.mafia}}</b></span>
            </div>
            <div class="citizen-power">
                <strong v-if="citizen > 0"><i class="hint-color">{{citizen}} </i> <span class='citizen-role'>{{$t('common.Citizen')}}</span> {{$t('powerMeter.minus')}}</strong>
                <strong v-else-if="citizen < 0"><i class="hint-color">{{Math.abs(citizen)}} </i> <span class='citizen-role'>{{$t('common.Citizen')}}</span> {{$t('powerMeter.plus')}}</strong>
                <span>{{$t('powerMeter.citizen')}} : <b>{{power.citizen}}</b></span>
            </div>
            <div class="meter" :style="{ transform: `translateX(${power.average}%)`}"><span></span></div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        power: Object,
        mafia:{
            type: Number,
            default: 0
        },
        citizen:{
            type: Number,
            default: 0
        },
    },
}
</script>

<style lang="scss" scoped>

.power-meter{
    position: fixed;
    bottom:0;
    left:1%;
    width: 98%;
    height: 62px;
    padding:30px 15px 12px 15px;
    background-color: $background_color_side;
    box-shadow:0 0 4px $background_color_main;
    border-radius: 5px 5px 0 0;
    z-index: 99999;
    transition:all .2s ease-in-out;
    .has-clear-fix{
        position: relative;
        max-width: 950px;
        height: 100%;
        line-height: 19px;
        font-size: $font_size_2;
        text-align: center;
        margin:auto;
        transition:all .2s ease-in-out;
        .mafia-power{
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
            color:$mafia_placeholder;
            background-color: $background_color_mafia;
            border-radius: 25px 0 0 25px;
        }
        .citizen-power{
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
            color:$citizen_placeholder;
            background-color: $background_color_citizen;
            border-radius: 0 25px 25px 0;
        }
        strong{
            position: absolute;
            top:-26px;
            left:0;
            width:100%;
            color:$color_1;
            text-align: center;
            span{font-size: $font_size_2;}
        }
        span{
            font-size: $font_size_0;
            b{
                font-size: $font_size_2;
                color:$black_color;
            }
        }
    }
    &.active .has-clear-fix{
        transform:translateY(-8px)
    }
    &.hidden{
        opacity: 0;
        visibility: hidden;
    }
}


</style>
