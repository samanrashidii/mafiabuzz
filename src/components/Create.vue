<template>
    <div class="create">
        <div class="dashboard-header">
            <div>
                <router-link class="site-bttn game-mode" :to="{name : 'home'}"><span>{{Creator.gameModeButton}}</span></router-link>
            </div>
            <div class="title">
                <template v-if="checkGameMode()">
                    <h2 v-html="Creator.title"></h2>
                    <p v-html="Creator.subtitle"></p>
                </template>
                <!-- Under Construction -->
                <template v-else>
                    <img :src="require(`@/assets/images/under-construction.png`)" alt="Under Construction Icon" />
                    <h2>We are <span>Sorry</span></h2>
                    <p>This mode is under construction ...!!!</p>
                </template>
            </div>
        </div>
        <template v-if="checkGameMode()">
            <form action="#" method="POST" accept-charset="utf-8" name="game_settings" class="game_settings">
                <div class="steps">
                    <div class="step-box">
                        <span class="step-number">1</span>
                        <label for="quantity" v-html="Creator.step1"></label>
                        <select name="quantity" id="quantity" v-model="gameSettings.unit">
                            <option v-for="n in Creator.maxPlayers" :key="n">{{n + Creator.playerMargin}}</option>
                        </select>
                    </div>
                    <div class="step-box">
                        <span class="step-number">2</span>
                        <label for="mafia_number" v-html="Creator.step2"></label>
                        <select name="mafia_number" id="mafia_number" v-model.number="gameSettings.mafia">
                            <option v-for="n in calcMafia" :key="n">{{n+1}}</option>
                        </select>
                    </div>
                    <div class="step-box">
                        <span class="step-number">3</span>
                        <label for="day_time" v-html="Creator.step3"></label>
                        <select name="day_time" id="mafia_number" v-model.number="gameSettings.time">
                            <option v-for="n in Creator.totalTime" :key="n">{{n+4}}</option>
                        </select>
                    </div>
                    <div class="step-box">
                        <span class="step-number">4</span>
                        <label v-html="Creator.step4"></label>
                        <ul class="note">
                            <li>Day phase will take <span class="day-color">{{gameSettings.time}}</span> minutes long.</li>
                            <li>Mafia characters have <span class="mafia-role">red color</span> and you can choose <i class="mafia-role">{{gameSettings.mafia}}</i> of them.</li>
                            <li>Citizen characters have <strong class="citizen-role">blue color</strong> and you can choose <i class="citizen-role">{{gameSettings.citizens}}</i> of them.</li>
                        </ul>
                    </div>
                </div>
                
                <roles @selectedRoles="gameSettings.roles = $event"></roles>

                <app-button @click.native="checkGame()" class="active start-bttn"><span>{{Creator.start}}</span></app-button>

                <overlay :class="{'active': overlay,'dialog': isValid}">
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
                        <app-button @click.native="overlay = false" class="settings-bttn danger"><span>{{Creator.changeSettings}}</span></app-button>
                    </template>
                    <template v-else>
                        <div class="note-box">
                            <img class="has-xsmall-bottom-margin" :src="require(`@/assets/images/icons/info.png`)" alt="Info Icon" />
                            <h3>{{Creator.checkBeforeStart}}</h3>
                        </div>
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
                        <app-button @click.native="overlay = false" class="settings-bttn danger"><span>{{Creator.changeSettings}}</span></app-button>
                        <app-button @click.native="startGame()" class="start-bttn green "><span>{{Creator.start}}</span></app-button>
                    </template>
                </overlay>
                
            </form>
            <power-meter :power="calcPower" :mafia="calcDifference(gameSettings.mafia, gameValdiation.selectedMafia)" :citizen="calcDifference(gameSettings.citizens, gameValdiation.selectedCitizen)" :class="{'active': !isValid}"></power-meter>
        </template>
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
            error:{
                mafia: false,
                citizens: false
            },
            fMafias: [],
            fCitizens: [],
            gameSettings: {
                unit: 6,
                mafia: 2,
                citizens: 4,
                roles: [],
                power: 0,
                mafiaPower: 0,
                citizenPower: 0,
                time: 5,
            },
            gameValdiation: {
                selectedMafia: 0,
                selectedCitizen: 0
            },
            overlay: false,
        }
    },
    computed:{
        ...mapGetters([
            'Creator',
            'Numbers',
        ]),
        calcMafia(){
            let mafiaNumbers = Math.floor(this.gameSettings.unit / 3) -1;
            this.gameSettings.citizens = this.gameSettings.unit - this.gameSettings.mafia;
            return mafiaNumbers;
        },
        calcPower(){
            let $power = {
                average: this.gameSettings.power,
                mafia: this.gameSettings.mafiaPower,
                citizen: this.gameSettings.citizenPower,
            }
            let $mafiaPower = this.gameSettings.mafiaPower;
            let $citizenPower = this.gameSettings.citizenPower;
            this.gameSettings.roles.forEach(element => {
                $power.average += element.power;
                if(element.mafia){
                    $power.mafia += -(element.power);
                } else{
                    $power.citizen += element.power;
                }
            });
            if($power.average >= 95){
                $power.average = 95;
            } else if($power.average <= -95){
                $power.average = -95;
            }
            return $power;
        },
        finalMafias(){
            return this.fMafias.sort((a, b) => (a.name > b.name) ? 1 : -1);
        },
        finalCitizens(){
            return this.fCitizens.sort((a, b) =>  (a.name > b.name) ? 1 : -1);
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
    created(){
        if(this.Numbers !== null){
            this.gameSettings.unit = this.Numbers.unit;
            this.gameSettings.mafia = this.Numbers.mafia;
        }
    },
    mounted(){
        console.log(this.gameSettings.roles);
    },
    methods:{
        ...mapActions([
            'getRoles',
            'setGame',
            'setNumbers',
            'setSavedRoles'
        ]),
        calcDifference(main,side){
            return main - side
        },
        checkGame(){
            this.overlay = true;
            this.fMafias = this.gameSettings.roles.filter(x => x.mafia == true);
            this.fCitizens = this.gameSettings.roles.filter(x => x.mafia == false);
        },
        checkGameMode(){
            if(this.$route.params.id == 'single-device'){
                return true;
            }
        },
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        startGame(){
            let numb = {
                unit : this.gameSettings.unit,
                mafia : this.gameSettings.mafia,
                time : this.gameSettings.time,
            }
            let $savedRoles = JSON.parse(JSON.stringify(this.gameSettings.roles));
            this.getRoles(this.gameSettings.roles);
            this.setSavedRoles($savedRoles);
            this.setNumbers(numb);
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
    color:$color_6;
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


