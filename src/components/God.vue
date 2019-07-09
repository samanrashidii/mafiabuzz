<template>
    <div>
        <div class="step-box only-box" v-if="!dashboard.god">
            <ul class="dashboard-hint">
                <li>
                    <span class="killer">Kill character and disable it's action.</span>
                </li>
                <li>
                    <span class="angel">Bring back character to life.</span>
                </li>
                <li>
                    <span class="no-action">Character doesn't have an action.</span>
                </li>
                <li>
                    <span class="pending-action">Character's action is not fired.</span>
                </li>
                <li>
                    <span class="done-action">Character's action is done.</span>
                </li>
            </ul>
        </div>
        <div class="step-box display">
            <div class="center-aligned">
                <transition name="fade" mode="out-in">
                    <div v-if="dashboard.god" key="beforeShow">
                        <img :src="require(`@/assets/images/icons/game.png`)" alt="Game Icon" />
                        <h3 class="different-colors">Okay<i>.</i><i>.</i><i>.</i> your game started!</h3>
                        <app-button @click.native="showPlay()">I'm God! it's fine to show me game details</app-button>
                    </div>
                    <div v-else key="afterShow">
                        <div class="players-role">
                            <div class="table mafia-table">
                                <table>
                                    <tr v-for="(fM, index) in finalMafias" :key="index" :class="{'dead': fM.dead == true}">
                                        <td><img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}</td>
                                        <td><span class="character-player">{{fM.player}}</span></td>
                                        <td><a href="javascript:void(0)" @click="deadOrAlive(fM)" :class="{'killer': fM.dead == false, 'angel': fM.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="no-action" v-if="!actionStatus(fM.action)"></span>
                                            <span @click="fireAction(fM)" :class="{'pending-action': fM.actionStatus == false, 'done-action': fM.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="table citizen-table">
                                <table>
                                    <tr v-for="(fC, index) in finalCitizens" :key="index" :class="{'dead': fC.dead == true}">
                                        <td><img :src="getImgUrl(fC.icon)" :alt="fC.alt" /> {{fC.name}}</td>
                                        <td><span class="character-player">{{fC.player}}</span></td>
                                        <td><a href="javascript:void(0)" @click="deadOrAlive(fC)" :class="{'killer': fC.dead == false, 'angel':fC.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="no-action" v-if="!actionStatus(fC.action)"></span>
                                            <span @click="fireAction(fC)" :class="{'pending-action': fC.actionStatus == false, 'done-action': fC.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <app-button @click.native="changePhase(dashboard.day)">
                            <span v-if="dashboard.day">Night Time!</span>
                            <span v-else>Day Time!</span>
                        </app-button>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
export default {
    props:{
        finalPlayers: {
            type: Array,
        }
    },
    data(){
        return {
            fMafias: [],
            fCitizens: [],
        }
    },
    created(){
        this.fMafias = this.finalPlayers.filter(x => x.mafia == true);
        this.fCitizens = this.finalPlayers.filter(x => x.mafia == false);
    },
    computed:{
        ...mapGetters([
            'Dashboard',
        ]),
        finalMafias(){
            return this.fMafias.sort((a, b) => (a.name > b.name) ? 1 : -1);
        },
        finalCitizens(){
            return this.fCitizens.sort((a, b) =>  (a.name > b.name) ? 1 : -1);
        },
        gameRoles(){
            return [...this.SelectedRoles];
        },
        dashboard(){
            return this.Dashboard;
        }
    },
    methods:{
        ...mapActions([
            'setRoles',
            'controlDashboard',
        ]),
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        showPlay(){
            this.dashboard.god = true;
        },
        updateDashboard(){
            this.controlDashboard(this.dashboard);
        },
        actionStatus(action){
            if(action !== null){
                return true
            } else{
                return false
            }
        },
        fireAction(player){
            if(player.actionStatus == false){
                this.finalPlayers.forEach(element => {
                    if(element.name == player.name){
                        element.actionStatus = true;
                    }
                });
            }
        },
        deadOrAlive(player){
            if(player.dead == false){
                this.finalPlayers.forEach(element => {
                    if(element.name == player.name){
                        element.dead = true;
                    }
                });
            } else{
                this.finalPlayers.forEach(element => {
                    if(element.name == player.name){
                        element.dead = false;
                    }
                });
            }
        },
        changePhase(phase){
            if(phase == false){
                this.dashboard.day = true;
            } else{
                this.dashboard.day = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .table table tr{
        position: relative;
        td{
            position: relative;
            font-size: $font_size_3;
            text-align: center;
            img{
                width:22px;
                margin-right: 3px;
            }
            &:nth-child(1){width:40%;}
            &:nth-child(2){
                width:30%;
                background-color: $background_color_5;
            }
            &:nth-child(3){
                width:15%;
                background-color: $background_color_default;
                a{
                    position: absolute;
                    top:0;
                    left:0;
                    display: block;
                    width:100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-color: inherit;
                    z-index: 12;
                }
            }
            &:nth-child(4){
                width:15%;
                background: $background_color_middle;
                span{
                    position: absolute;
                    top:0;
                    left:0;
                    display: block;
                    width:100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    z-index: 10;
                }
            }
            &::after{
                content:'';
                position: absolute;
                top:0;
                left:0;
                width:100%;
                height: 100%;
                visibility: hidden;
                opacity: 0;
                background-repeat: no-repeat;
                background-position: center;
                z-index: 11;
                transition:all .2s ease-in-out;
            }
        }
    }

</style>
