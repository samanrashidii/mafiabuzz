<template>
    <div class="creator">
        <app-navigation />
        <h2>Hi <span>God</span></h2>
        <p>I know you are God but do you know how to start the game?<br /> okay if you don't, I'll tell you how :)</p>
        <div class="steps">
            <form action="#" method="POST" accept-charset="utf-8" name="game_settings" class="game_settings"></form>
            <div class="step-box">
                <span class="step-number">1</span>
                <label for="quantity">Choose how many people do want to have in your universe:</label>
                <select name="quantity" id="quantity" v-model="gameSettings.unit">
                    <option v-for="n in 25" :key="n">{{n+5}}</option>
                </select>
            </div>
            <div class="step-box">
                <span class="step-number">2</span>
                <label for="mafia_number">Please choose how many of these people will be mafia:</label>
                <select name="mafia_number" id="mafia_number" v-model="gameSettings.mafia">
                    <option v-for="n in calcMafia" :key="n">{{n+1}}</option>
                </select>
            </div>
            <div class="step-box">
                <span class="step-number">3</span>
                <label>Now you must choose between below roles for your game:</label>
                <ul class="note">
                    <li>Mafia roles have <span>red border</span> and you can choose maximum of <i>{{gameSettings.mafia}}</i> Mafia roles.</li>
                    <li>Citizen roles have <strong>green border</strong> and you can choose maximum of <i>{{gameSettings.citizens}}</i> Citizen roles.</li>
                </ul>
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
                citizens: 4,
            }
        }
    },
    computed:{
        calcMafia(){
            let mafiaNumbers = Math.floor(this.gameSettings.unit / 3);
            this.gameSettings.citizens = this.gameSettings.unit - this.gameSettings.mafia;
            return mafiaNumbers-1;
        },
    }
}
</script>

<style lang="scss" scoped>

.step-box{
    position: relative;
    padding:20px 15px;
    margin-top:40px;
    box-shadow: 0 0 10px $color_black;
}

span.step-number{
    position: absolute;
    top:-20px;
    left:-4px;
    display: inline-block;
    width:34px;
    height: 20px;
    line-height: 20px;
    font-size: $font_size_4;
    color: $color_2;
    text-align: center;
    margin-right: 4px;
    background-color:$creator_color;
    border-radius: 1px;
}

.step-box label{
    display:inline-block;
    font-size: $font_size_4;
    color:$color_site_3;
    margin-bottom:20px;
}

.note li{
    font-size: $font_size_3;
    color:$color_4;
    margin-bottom:12px;
}

.note li::before{
    content:'*';
    display: inline-block;
    vertical-align: middle;
    margin-right: 7px;
}

.note li strong,
.note li i{color:$green_color;}
.note li span{color:$red_color}

</style>


