<template>
    <div class="create">
        <div class="title">
            <h2 v-html="Creator.title"></h2>
            <p v-html="Creator.subtitle"></p>
        </div>
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
            <button class="start-bttn" @click.prevent="checkGame()" type="button"><span>{{Creator.start}}</span></button>
            <overlay :class="{'active': overlay}">
                <template v-if="isValid">
                    <img class="has-bottom-margin" :src="require(`@/assets/images/icons/not-valid.png`)" alt="Not Valid Icon" />
                    <ul class="error-bullet">
                        <li v-if="error.mafia">
                            You have chosen <span>{{gameSettings.mafia}}</span> Mafia characters but selected <i class="mafia-role">{{gameValdiation.selectedMafia}}</i>
                        </li>
                        <li class="blue" v-if="error.citizens">
                            You have chosen <span>{{gameSettings.citizens}}</span> Citizen characters but selected <i class="citizen-role">{{gameValdiation.selectedCitizen}}</i>
                        </li>
                    </ul>
                    <app-button @click.native="overlay = false" class="settings-bttn"><span>Change Game Settings</span></app-button>
                </template>
                <template v-else>
                    <h3 class="has-small-bottom-margin">Your game will start with below characters</h3>
                    <div class="table mafia-table">
                        <table>
                            <tr v-for="(fM, index) in finalMafias" :key="index">
                                <td><img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}</td>
                                <td><span class="character-power">{{Math.abs(fM.power)}}</span></td>
                            </tr>
                        </table>
                    </div>
                    <div class="table citizen-table">
                        <table>
                            <tr v-for="(fC, index) in finalCitizens" :key="index">
                                <td><img :src="getImgUrl(fC.icon)" :alt="fC.alt" /> {{fC.name}}</td>
                                <td><span class="character-power">{{Math.abs(fC.power)}}</span></td>
                            </tr>
                        </table>
                    </div>
                    <app-button @click.native="overlay = false" class="settings-bttn"><span>Change Game Settings</span></app-button>
                    <app-button @click.native="startGame()" class="active start-bttn"><span>Start Game!</span></app-button>
                </template>
            </overlay>
        </form>
        <power-meter :power="calcPower" :mafia="calcDifference(gameSettings.mafia, gameValdiation.selectedMafia)" :citizen="calcDifference(gameSettings.citizens, gameValdiation.selectedCitizen)" :class="{'active': !isValid}"></power-meter>
    </div>
</template>

<script>
import Roles from '@/components/Roles.vue';
import PowerMeter from '@/components/PowerMeter.vue';
import Overlay from '@/components/Overlay.vue';
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
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
            },
            fMafias: [],
            fCitizens: [],
        }
    },
    computed:{
        ...mapGetters([
            'Creator',
        ]),
        finalMafias(){
            return this.fMafias.sort((a, b) => (a.name > b.name) ? 1 : -1);
        },
        finalCitizens(){
            return this.fCitizens.sort((a, b) =>  (a.name > b.name) ? 1 : -1);
        },
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
                return false;
            } else{
                return true;
            }
        }
    },
    methods:{
        ...mapActions([
            'getRoles',
            'setGame',
        ]),
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        calcDifference(main,side){
            return main - side
        },
        checkGame(){
            this.overlay = true;
            this.fMafias = this.gameSettings.roles.filter(x => x.mafia == true);
            this.fCitizens = this.gameSettings.roles.filter(x => x.mafia == false);
        },
        startGame(){
            this.getRoles(this.gameSettings.roles);
            this.setGame(true);
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

.create{padding-bottom: $meter_height;}

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


