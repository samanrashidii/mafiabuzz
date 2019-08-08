<template>
    <div class="create">
        <div class="dashboard-header">
            <div>
                <router-link class="site-bttn game-mode" :to="{name : 'home'}"><span>{{Creator.gameModeButton}}</span></router-link>
            </div>
            <div class="welcome">
                <img :src="require(`@/assets/images/${Creator.welcome.image}`)" alt="Mafioso Logo">
                <h3 v-html="Creator.welcome.text">{</h3>
            </div>
            <div class="title">
                <template v-if="checkGameMode()">
                    <h2 v-html="Creator.title"></h2>
                    <p v-html="Creator.subtitle"></p>
                </template>
                <!-- Under Construction -->
                <template v-else>
                    <img :src="require(`@/assets/images/under-construction.png`)" alt="Under Construction Icon" />
                    <h2 v-html="Common.UnderConstructionTitle"></h2>
                    <p v-html="Common.UnderConstructionText"></p>
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
                </div>
                
                <roles @selectedRoles="gameSettings.roles = $event"></roles>

                <app-button @click.native="checkGame()" class="active start-bttn"><span>{{Creator.start}}</span></app-button>

                <overlay :class="{'active': overlay,'dialog': isValid}">
                    <template v-if="isValid">
                        <img class="has-bottom-margin" :src="require(`@/assets/images/icons/not-valid.png`)" alt="Not Valid Icon" />
                        <ul class="error-bullet">
                            <li v-if="error.mafia">
                                {{Creator.errorText1}} <span class="hint-color">{{gameSettings.mafia}} </span> <strong class="mafia-role">{{Common.Mafia}}</strong> {{Creator.errorText2}}
                            </li>
                            <li class="blue" v-if="error.citizens">
                                {{Creator.errorText1}} <span class="hint-color">{{gameSettings.citizens}} </span> <strong class="citizen-role">{{Common.Citizen}}</strong> {{Creator.errorText2}}
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
                                <tr>
                                    <th>{{Common.Role}}</th>
                                    <th>{{Common.Power}}</th>
                                </tr>
                                <tr v-for="(fM, index) in finalMafias" :key="index">
                                    <td><img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}</td>
                                    <td><div class="character-power"><span class="mafia" :style="{width: `${Math.abs(fM.power)*2}%`}"><i>{{Math.abs(fM.power)}}</i></span></div></td>
                                </tr>
                            </table>
                        </div>
                        <div class="table citizen-table">
                            <table>
                                <tr>
                                    <th>{{Common.Role}}</th>
                                    <th>{{Common.Power}}</th>
                                </tr>
                                <tr v-for="(fC, index) in finalCitizens" :key="index">
                                    <td><img :src="getImgUrl(fC.icon)" :alt="fC.alt" /> {{fC.name}}</td>
                                    <td><div class="character-power"><span class="citizen" :style="{width: `${fC.power*2}%`}"><i>{{Math.abs(fC.power)}}</i></span></div></td>
                                </tr>
                            </table>
                        </div>
                        <app-button @click.native="startGame()" class="start-bttn green "><span>{{Creator.start}}</span></app-button>
                        <app-button @click.native="overlay = false" class="settings-bttn danger"><span>{{Creator.changeSettings}}</span></app-button>
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
            'Common'
        ]),
        calcMafia(){
            let mafiaNumbers = Math.floor(this.gameSettings.unit / 2) -1;
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

button{background-color:$creator_color;}

</style>


