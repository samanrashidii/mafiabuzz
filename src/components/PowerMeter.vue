<template>
    <div class="power-meter">
        <div class="has-clear-fix">
            <div class="mafia-power">
                <strong v-if="mafia > 0">{{mafia}} characters left</strong>
                <strong v-else-if="mafia < 0">{{-(mafia)}} characters overplus</strong>
                <span>Mafia Power</span>
            </div>
            <div class="citizen-power">
                <strong v-if="citizen > 0">{{citizen}} characters left</strong>
                <strong v-else-if="citizen < 0">{{-(citizen)}} characters overplus</strong>
                <span>Citizen Power</span>
            </div>
            <div class="meter" :style="{ transform: `translateX(${power}%)`}"><span></span></div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        power:{
            type: Number,
            default: 0
        },
        mafia:{
            type: Number,
            default: 0
        },
        citizen:{
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>

.power-meter{
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: 62px;
    padding:30px 15px 12px 15px;
    background-color: $background_color_side;
    z-index: 9999999;
    .has-clear-fix{
        position: relative;
        max-width: 950px;
        height: 100%;
        line-height: 19px;
        font-size: $font_size_2;
        text-align: center;
        margin:auto;
        .mafia-power{
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
            color:$mafia_placeholder;
            background-color: $background_color_mafia;
            border-radius: 25px 0 0 25px;
            strong{color:$background_color_mafia;}
        }
        .citizen-power{
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
            color:$citizen_placeholder;
            background-color: $background_color_citizen;
            border-radius: 0 25px 25px 0;
            strong{color:$background_color_citizen;}
        }
        strong{
            position: absolute;
            top:-26px;
            left:0;
            width:100%;
            text-align: center;
        }
    }
}


</style>

