<template>
    <div class="creator">
        <app-navigation />
        <h2>Hi <span>God</span></h2>
        <p>I know you are God but do you know how to start the game?<br /> okay if you don't, I'll tell you how :)</p>
        <div class="steps">
            <form action="#" method="POST" accept-charset="utf-8" name="game_settings" class="game_settings"></form>
            <div class="step-box">
                <label for="quantity"><span>1</span> Choose how many people do want to have in your world</label>
                <select name="quantity" id="quantity" v-model="gameSettings.unit">
                    <option v-for="n in 25" :key="n">{{n+5}}</option>
                </select>
            </div>
            <div class="step-box">
                <label for="mafia_number"><span>2</span> Please choose how many of these people are mafia</label>
                <select name="mafia_number" id="mafia_number" v-model="gameSettings.mafia">
                    <option v-for="n in 12" :key="n">{{n+1}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            gameSettings: {
                unit: 6,
                mafia: 2,
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.step-box{
    position: relative;
    padding:20px 15px;
    margin-top:30px;
    box-shadow: 0 0 10px $color_black;
}

.steps label span{
    position: absolute;
    top:-16px;
    left:-10px;
    display: inline-block;
    width:30px;
    height: 30px;
    line-height: 30px;
    color: $color_2;
    text-align: center;
    margin-right: 4px;
    background-color:$creator_color;
    border-radius: 50%;
}

.step-box label{
    display:inline-block;
    font-size: $font_size_4;
    color:$color_site_3;
    margin-bottom:15px;
}

</style>


