<template>
    <div>
        <div class="button-holder" v-if="dashboard.god">
            <transition name="fade" mode="out-in">
                <app-button :class="{'day':dashboard.day, 'night':!dashboard.day}" @click.native="confirmAction = true" v-if="!confirmAction">
                    <span v-if="dashboard.day">Night Time!</span>
                    <span v-else>Day Time!</span>
                </app-button>
                <div class="confirm-action has-clear-fix" key="confirm" v-else>
                    <a class="cancel" href="javascript:void(0)" @click="confirmAction = false">No, Stay Here!</a>
                    <a class="confirm" href="javascript:void(0)" @click="changePhase(dashboard.day)">Go Next Phase</a>
                </div>
            </transition>
        </div>
        <div class="step-box display godashboard" :class="{'day': dashboard.day && dashboard.god, 'night': !dashboard.day}">
            <transition name="fade">
                <strong class="round-tracker" v-if="!dashboard.day">{{dashboard.round}}</strong>
            </transition>
            <div class="center-aligned">
                <transition-group name="fade" mode="out-in">
                    <div v-if="!dashboard.god" key="beforeShow">
                        <img class="game-icon" :src="require(`@/assets/images/icons/game.png`)" alt="Game Icon" />
                        <h3 class="different-colors">Okay<i>.</i><i>.</i><i>.</i> your game started!</h3>
                        <app-button class="active" @click.native="showPlay()">I'm God! Show me game details</app-button>
                    </div>
                    <div v-else key="afterShow">
                        <overlay :class="{'active': overlay, 'dialog':true}">
                            <div class="action-box">
                                <div class="player-box-holder">
                                    <div class="player-box">
                                        <img :src="getImgUrl(info.icon)" alt="Character Icon"  />
                                        <h4 class="has-xsmall-top-margin" :class="{'mafia-role': info.mafia,'citizen-role': !info.mafia}">{{info.player}}</h4>
                                    </div>
                                    <div class="arrow">
                                        <img class="action-image" :src="getActionImgUrl(info.actionIcon)" alt="Character Action Icon" />
                                    </div>
                                    <div class="player-box">
                                        <img :src="getImgUrl(info.targetIcon)" alt="Character Icon"  />
                                        <h4 class="has-xsmall-top-margin" :class="{'mafia-role': info.targetMafia != null && info.targetMafia, 'citizen-role': info.targetMafia != null && !info.targetMafia}">{{info.target}}</h4>
                                    </div>
                                </div>
                                <label class="has-top-margin" for="action_target">Please select the person who takes action:</label>
                                <select @change="findTarget(log.target)" name="action_target" id="action_target" v-model="log.target">
                                    <option v-for="(person, index) in checkGroup(info.player)" :key="index">{{person.player}}</option>
                                </select>
                                <app-button class="danger" @click.native="cancelAction()">Cancel</app-button>
                                <app-button @click.native="executeAction()">Action ...!!!</app-button>
                            </div>
                        </overlay>
                        <div class="players-role">

                            <info-box :info="info"></info-box>

                            <div class="table mafia-table">
                                <table>
                                    <tr v-for="(fM, index) in finalMafias" :key="index" :class="{'dead': fM.dead == true}">
                                        <td>
                                            <a @click="showInfo(fM)" href="javascript:void(0)">
                                                <img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fM.player}}</span></td>
                                        <td><a href="javascript:void(0)" @click="deadOrAlive(fM)" :class="{'killer': fM.dead == false, 'angel': fM.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="passive" v-if="fM.action.passive != null && fM.action.action == null"></span>
                                            <span @click="fireAction(fM)" :class="{'pending-action': fM.actionStatus == false && fM.action.action != null, 'done-action': fM.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div class="table citizen-table">
                                <table>
                                    <tr v-for="(fC, index) in finalCitizens" :key="index" :class="{'dead': fC.dead == true}">
                                        <td>
                                            <a @click="showInfo(fC)" href="javascript:void(0)">
                                                <img :src="getImgUrl(fC.icon)" :alt="fC.alt" /> {{fC.name}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fC.player}}</span></td>
                                        <td><a href="javascript:void(0)" @click="deadOrAlive(fC)" :class="{'killer': fC.dead == false, 'angel':fC.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="passive" v-if="fC.action.passive != null && fC.action.action == null"></span>
                                            <span @click="fireAction(fC)" :class="{'pending-action': fC.actionStatus == false, 'done-action': fC.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
        <div class="step-box only-box" v-if="dashboard.god">
            <ul class="dashboard-hint">
                <li>
                    <span class="killer">Kill character and disable it's action.</span>
                </li>
                <li>
                    <span class="angel">Bring back character to life.</span>
                </li>
                <li>
                    <span class="passive">Character has passive only.</span>
                </li>
                <li>
                    <span class="pending-action">Character has action but not used.</span>
                </li>
                <li>
                    <span class="done-action">Character's action has been used.</span>
                </li>
            </ul>
        </div>
        <app-button class="has-bottom-margin" v-if="dashboard.god" @click.native="finishGame()">Game Finished...!!!</app-button>
    </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import InfoBox from '@/components/InfoBox.vue';
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
            overlay: false,
            confirmAction: false,
            info: {
                show: false,
                player: "Loading",
                action: "Loading Action",
                passive: "Passive",
                name: "Default",
                icon: "loader.gif",
                description: "...",
                actionIcon: "loader.gif",
                mafia: false,
                target: 'Person?',
                targetMafia: null,
                targetIcon: 'default.png',
            },
            log: {
                round: null,
                action: null,
                passive: null,
                attacker: null,
                target: null
            },
            historyLog: [],
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
        dashboard(){
            return this.Dashboard;
        },
    },
    methods:{
        ...mapActions([
            'setRoles', //
            'controlDashboard', //
        ]),
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        getActionImgUrl(pic) {
            return require(`@/assets/images/actions/${pic}`);
        },
        showPlay(){
            this.dashboard.god = true;
        },
        updateDashboard(){
            this.controlDashboard(this.dashboard); //
        },
        showInfo(role){
            this.info.name = role.name;
            this.info.icon = role.icon;
            this.info.description = role.description;
            this.info.mafia = role.mafia;
            this.info.show == false ? this.info.show = true : this.info.show = false;
        },
        fireAction(player){
            if(player.actionStatus == false){
                this.info.player = player.player;
                this.info.icon = player.icon;
                this.info.action = player.action.action;
                this.info.passive = player.action.passive;
                this.info.actionIcon = player.actionIcon;
                this.info.mafia = player.mafia;
                this.overlay = true;
            }
        },
        checkGroup(player){
            return this.finalPlayers.filter(x => x.player != player);
        },
        findTarget(target){
            this.finalPlayers.forEach(element => {
                if(element.player == target){
                    this.info.targetMafia = element.mafia;
                    this.info.targetIcon = element.icon;
                }
            });
            this.info.target = target;
        },
        cancelAction(){
            this.overlay = false;
            setTimeout(() => {
                this.info.target = 'Player?';
                this.info.targetMafia = null;
                this.info.targetIcon = 'default.png';
                this.log.target = null;
            }, 500);
        },
        deadOrAlive(player){
            if(player.dead == false){
                this.finalPlayers.forEach(element => {
                    if(element.player == player.player){
                        element.dead = true;
                    }
                });
            } else{
                this.finalPlayers.forEach(element => {
                    if(element.player == player.player){
                        element.dead = false;
                    }
                });
            }
        },
        changePhase(phase){
            this.confirmAction = false;
            if(phase == false){
                this.dashboard.day = true;
            } else{
                this.dashboard.round++;
                this.log.round = this.dashboard.round;
                this.finalPlayers.forEach(element => {
                    element.actionStatus = false;
                });
                this.dashboard.day = false;
            }
        },
        executeAction(){
            if(this.log.target != null){
                this.log.attacker = this.info.player;
                this.log.action = this.info.action;
                this.log.passive = this.info.passive;
                alert(`
                    Attacker : ${this.log.attacker}
                    Action : ${this.log.action}
                    Target : ${this.log.target}
                `);
                this.cancelAction();
                this.finalPlayers.forEach(element => {
                    if(element.player == this.log.attacker){
                        element.actionStatus = true;
                    }
                });
            }
        },
        finishGame(){
            let confirmFinish = confirm("Are you sure about it?");
            if(confirmFinish){
                this.$router.go();
            }
        }
    },
    components: {
        overlay: Overlay,
        infoBox: InfoBox,
    }
}
</script>

<style lang="scss" scoped>

    .step-box.display{
        padding:110px 15px 15px 15px;
        border-radius: 3px;
    }

    .table table tr{
        position: relative;
        td{
            position: relative;
            font-size: $font_size_3;
            text-align: center;
            padding:6px 4px;
            img{
                width:22px;
                margin-right: 3px;
            }
            &:nth-child(1){
                width:40%;
                font-size: $font_size_1;
                text-align:left;
            }
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

    .player-box{
        display:inline-block;
        vertical-align: middle;
    }

</style>
