<template>
    <div class="creator">
        <app-navigation />
        <h2>Hi <span>God</span></h2>
        <p>I know you are God but do you know how to start the game?<br /> okay if you don't, I'll tell you how :)</p>
        <form action="#" method="POST" accept-charset="utf-8" name="game_settings" class="game_settings">
            <div class="steps">
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
                    <select name="mafia_number" id="mafia_number" v-model.number="gameSettings.mafia">
                        <option v-for="n in calcMafia" :key="n">{{n+1}}</option>
                    </select>
                </div>
                <div class="step-box">
                    <span class="step-number">3</span>
                    <label>Now you must choose between below roles for your game:</label>
                    <ul class="note">
                        <li>Mafia have <span class="mafia-role">red color</span> and you can choose maximum of <i class="mafia-role">{{gameSettings.mafia}}</i> roles.</li>
                        <li>Citizen have <strong class="citizen-role">blue color</strong> and you can choose maximum of <i class="citizen-role">{{gameSettings.citizens}}</i> roles.</li>
                    </ul>
                </div>
            </div>
            <roles :selectedUnits="selectedUnits" @selectedRoles="gameSettings.roles = $event"></roles>
            <button @click.prevent="startGame()" type="submit" :disabled="isValid">Start Game</button>
        </form>
    </div>
</template>

<script>
import Roles from '@/components/Roles.vue';

export default {
    data(){
        return {
            gameValdiation: {
                selectedMafia: 0,
                selectedCitizen: 0
            },
            gameSettings: {
                unit: 6,
                mafia: 2,
                citizens: 4,
                roles: [],
            }
        }
    },
    computed:{
        calcMafia(){
            let mafiaNumbers = Math.floor(this.gameSettings.unit / 3) -1;
            this.gameSettings.citizens = this.gameSettings.unit - this.gameSettings.mafia;
            return mafiaNumbers;
        },
        selectedUnits(){
            return {
                mafia: this.gameSettings.mafia,
                citizens: this.gameSettings.citizens
            }
        },
        isValid(){
            this.gameValdiation.selectedMafia = this.gameSettings.roles.filter(x => x.mafia == true).length;
            this.gameValdiation.selectedCitizen = this.gameSettings.roles.filter(x => x.mafia == false).length;
            if(this.gameValdiation.selectedMafia == this.gameSettings.mafia && this.gameValdiation.selectedCitizen == this.gameSettings.citizens){
                console.log(':)');
                return false;
            } else{
                return true;
            }
        }
    },
    methods:{
        startGame(){
            console.log(this.gameSettings);
        }
    },
    components:{
        roles : Roles
    }
}
</script>

<style lang="scss" scoped>

.step-box{
    position: relative;
    padding:20px 15px;
    margin-top:40px;
    box-shadow: 0 0 10px $black_color;
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

.citizen-role{color:$blue_color}
.mafia-role{color:$red_color}

.note li i{
    display: inline-block;
    padding:1px 6px 3px 6px;
    margin:0 4px;
    background-color:$background_color_2;
    border-radius:2px;
    box-shadow: inset 0 0 2px #7e7e7e;
}

button{background-color:$creator_color;}

</style>


