<template>
    <div class="creator">
        <app-navigation />
        <h2 v-html="Creator.title"></h2>
        <p v-html="Creator.subtitle"></p>
        <form action="#" method="POST" accept-charset="utf-8" name="game_settings" class="game_settings">
            <div class="steps">
                <div class="step-box">
                    <span class="step-number">1</span>
                    <label for="quantity">{{Creator.step1}}</label>
                    <select name="quantity" id="quantity" v-model="gameSettings.unit">
                        <option v-for="n in Creator.maxPlayers" :key="n">{{n + Creator.playerMargin}}</option>
                    </select>
                </div>
                <div class="step-box">
                    <span class="step-number">2</span>
                    <label for="mafia_number">{{Creator.step2}}</label>
                    <select name="mafia_number" id="mafia_number" v-model.number="gameSettings.mafia">
                        <option v-for="n in calcMafia" :key="n">{{n+1}}</option>
                    </select>
                </div>
                <div class="step-box">
                    <span class="step-number">3</span>
                    <label>{{Creator.step3}}</label>
                    <ul class="note">
                        <li>Mafia characters have <span class="mafia-role">red color</span> and you can choose <i class="mafia-role">{{gameSettings.mafia}}</i> of them.</li>
                        <li>Citizen characters have <strong class="citizen-role">blue color</strong> and you can choose <i class="citizen-role">{{gameSettings.citizens}}</i> of them.</li>
                    </ul>
                </div>
            </div>
            <roles @selectedRoles="gameSettings.roles = $event"></roles>
            <button class="start-bttn" @click.prevent="overlay = true" type="button"><span>{{Creator.start}}</span></button>
            <overlay :class="{'active': overlay}">
                <template v-if="isValid">
                    <img class="has-bottom-margin" :src="require(`@/assets/images/icons/not-valid.png`)" alt="Not Valid Icon" />
                    <ul class="error-bullet">
                        <li v-if="error.mafia">
                            You have chosen {{gameSettings.mafia}} Mafia characters but selected <i class="mafia-role">{{gameValdiation.selectedMafia}}</i>
                        </li>
                        <li v-if="error.citizens">
                            You have chosen {{gameSettings.citizens}} Citizen characters but selected <i class="citizen-role">{{gameValdiation.selectedCitizen}}</i>
                        </li>
                    </ul>
                    <app-button @click.native="overlay = false">Okay I got it :)</app-button>
                </template>
                <template v-else>
                    <h2>Your game is about to start with below details</h2>
                    <app-button @click.native="overlay = false">Change game settings</app-button>
                    <app-button @click.native="startGame()" class="active">Start Game!</app-button>
                </template>
            </overlay>
        </form>
        <power-meter :power="calcPower"></power-meter>
    </div>
</template>

<script>
import Roles from '@/components/Roles.vue';
import PowerMeter from '@/components/PowerMeter.vue';
import Overlay from '@/components/Overlay.vue';
import {mapGetters} from 'vuex';
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
                power: 0,
            },
            overlay: false,
            error:{
                mafia: false,
                citizens: false
            }
        }
    },
    computed:{
        ...mapGetters([
            'Creator',
        ]),
        calcPower(){
            let $power = this.gameSettings.power;
            this.gameSettings.roles.forEach(element => {
                $power += element.power;  
            });
            if($power >= 95){
                $power = 95;
            } else if($power <= -95){
                $power = -95;
            }
            return $power;
        },
        calcMafia(){
            let mafiaNumbers = Math.floor(this.gameSettings.unit / 3) -1;
            this.gameSettings.citizens = this.gameSettings.unit - this.gameSettings.mafia;
            return mafiaNumbers;
        },
        isValid(){
            this.gameValdiation.selectedMafia = this.gameSettings.roles.filter(x => x.mafia == true).length;
            this.gameValdiation.selectedCitizen = this.gameSettings.roles.filter(x => x.mafia == false).length;
            if(this.gameValdiation.selectedMafia != this.gameSettings.mafia){
                this.error.mafia = true
            } else{
                this.error.mafia = false
            }
            if(this.gameValdiation.selectedCitizen != this.gameSettings.citizens){
                this.error.citizens = true
            } else{
                this.error.citizens = false
            }
            if(this.gameValdiation.selectedMafia == this.gameSettings.mafia && this.gameValdiation.selectedCitizen == this.gameSettings.citizens){
                console.log(':)');
                return false;
            } else{
                return true;
            }
        }
    },
    methods:{
        getImgUrl(pic) {
            return require(`@/assets/images/icons/${pic}`);
        },
        startGame(){
            let finalRoles = [];
            this.gameSettings.roles.forEach(element => {
                finalRoles.push(element.name);
            });
            alert(`Players : ${this.gameSettings.unit}
Mafia : ${this.gameSettings.mafia}
Citizen : ${this.gameSettings.citizens}
Roles : ${finalRoles.join(" , ")}`);
        }
    },
    components:{
        roles : Roles,
        powerMeter : PowerMeter,
        overlay: Overlay,
    }
}
</script>

<style lang="scss" scoped>

.creator{padding-bottom: 60px;}

.step-box{
    position: relative;
    padding:20px 15px;
    margin-top:40px;
    box-shadow: 0 0 10px $black_color;
}

span.step-number{
    position: absolute;
    top:-14px;
    left:-8px;
    display: inline-block;
    width:28px;
    height: 28px;
    line-height: 28px;
    font-size: $font_size_4;
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
    margin-bottom:20px;
}

.note li{
    font-size: $font_size_3;
    color:$color_4;
    margin-bottom:12px;
    &::before{
        content:'*';
        display: inline-block;
        vertical-align: middle;
        margin-right: 7px;
    }
}

.citizen-role{color:$blue_color}
.mafia-role{color:$red_color}

i.mafia-role,
i.citizen-role{
    display: inline-block;
    line-height: 1.4;
    padding:1px 6px;
    margin:0 4px;
    background-color:$background_color_2;
    border-radius:2px;
    box-shadow: inset 0 0 2px #7e7e7e;
}

button{background-color:$creator_color;}

</style>


