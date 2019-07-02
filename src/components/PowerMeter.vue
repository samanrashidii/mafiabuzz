<template>
    <div class="power-meter">
        <div class="has-clear-fix">
            <div class="mafia-power">Mafia Power</div>
            <div class="citizen-power">Citizen Power</div>
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
    height: 50px;
    padding:15px;
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
            float: left;
            width: 50%;
            height: 100%;
            color:$mafia_placeholder;
            background-color: $background_color_mafia;
            border-radius: 25px 0 0 25px;
        }
        .citizen-power{
            float: left;
            width: 50%;
            height: 100%;
            color:$citizen_placeholder;
            background-color: $background_color_citizen;
            border-radius: 0 25px 25px 0;
        }
    }
}


</style>

