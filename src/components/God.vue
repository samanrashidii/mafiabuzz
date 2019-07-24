<template>
    <div>
        <div class="button-holder" v-if="dashboard.god">
            <transition name="fade" mode="out-in">
                <app-button :class="{'day':dashboard.day, 'night':!dashboard.day}" @click.native="changePhase(dashboard.day)">
                    <span v-if="dashboard.day">{{God.nightText}}</span>
                    <span v-else>{{God.dayText}}</span>
                </app-button>
            </transition>
        </div>
        <div class="step-box display godashboard" :class="{'day': dashboard.day && dashboard.god, 'night': !dashboard.day}">
            <transition name="fade">
                <strong class="round-tracker" v-if="!dashboard.day">{{dashboard.round}}</strong>
            </transition>
            <transition name="fade">
                <countdown :dayTime="dayTime" v-if="dashboard.day && dashboard.god"></countdown>
            </transition>
            <div class="center-aligned">
                <transition-group name="fade" mode="out-in">
                    <div v-if="!dashboard.god" key="beforeShow">
                        <img class="game-icon" :src="require(`@/assets/images/icons/game.png`)" alt="Game Icon" />
                        <h3 class="different-colors" v-html="God.gameStartText"></h3>
                        <app-button class="active" @click.native="showPlay()">{{God.godButton}}</app-button>
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
                                <label class="has-small-top-margin" for="action_target">{{God.actionHintText}}</label>
                                <select @change="findTarget(log.target, log.targetID)" name="action_target" id="action_target" v-model="log.target">
                                    <option v-for="(person, index) in checkGroup(info)" :key="index">{{person.player}}</option>
                                </select>
                                <template v-if="info.id == 11 && log.target != null">
                                    <label class="has-small-top-margin" for="action_target_2">{{God.actionHintText2}}</label>
                                    <select name="action_target_2" id="action_target_2" v-model="log.target2">
                                        <option v-for="(person, index) in checkSecondGroup(info)" :key="index">{{person.player}}</option>
                                    </select>
                                </template>
                                <app-button class="danger" @click.native="cancelAction()">{{God.cancelButton}}</app-button>
                                <app-button @click.native="executeAction(info)">{{God.confirmButton}}</app-button>
                            </div>
                        </overlay>
                        <div class="players-role">

                            <info-box :info="info"></info-box>

                            <div class="table mafia-table">
                                <table>
                                    <tr v-for="(fM, index) in finalMafias" :key="index" :class="characterClasses(fM)">
                                        <td>
                                            <a @click="showInfo(fM)" href="javascript:void(0)">
                                                <img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fM.player}}</span></td>
                                        <td><a href="javascript:void(0)" @click="deadOrAlive(fM)" :class="{'killer': fM.status.dead == false, 'angel': fM.status.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="disabled" v-if="fM.action.passive == null && fM.action.action == null"></span>
                                            <span class="done-action" v-else-if="fM.action.action == null && fM.action.passive != null && fM.actionStatus == true"></span>
                                            <span class="passive" v-if="fM.action.passive != null && fM.action.action == null"></span>
                                            <span @click="fireAction(fM)" :class="{'pending-action': fM.actionStatus == false && fM.action.action != null, 'done-action': fM.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div class="table citizen-table">
                                <table>
                                    <tr v-for="(fC, index) in finalCitizens" :key="index" :class="characterClasses(fC)">
                                        <td>
                                            <a @click="showInfo(fC)" href="javascript:void(0)">
                                                <img :src="getImgUrl(fC.icon)" :alt="fC.alt" /> {{fC.name}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fC.player}}</span></td>
                                        <td><a href="javascript:void(0)" @click="deadOrAlive(fC)" :class="{'killer': fC.status.dead == false, 'angel':fC.status.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="disabled" v-if="fC.action.passive == null && fC.action.action == null"></span>
                                            <span class="done-action" v-else-if="fC.action.action == null && fC.action.passive != null && fC.actionStatus == true"></span>
                                            <span class="passive" v-else-if="fC.action.passive != null && fC.action.action == null"></span>
                                            <span @click="fireAction(fC)" :class="{'pending-action': fC.actionStatus == false, 'done-action': fC.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div class="log-table" v-if="historyLog.length > 0 && dashboard.day" :class="{'result': historyLog.length > 0 && dashboard.day}">
                                <span class="table-title">What Happened Last Night</span>
                                <table>
                                    <tr v-for="(log, index) in historyLog" :key="index">
                                        <td>
                                            <img :src="getActionImgUrl(log.actionIcon)" alt="Action Icon" v-if="!log.passiveLog" />
                                            <img :src="getImgUrl(log.passiveIcon)" :alt="log.target" v-else />
                                        </td>
                                        <td>
                                            <template v-if="!log.passiveLog">
                                                <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> used "
                                                <span class="action-color">{{log.action}}</span> " on 
                                                <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
                                                <!-- Godfather Check Result -->
                                                <i v-if="log.targetID == 2 && log.action == 'Check Identity'"> but result is <span :class="{'citizen-role':log.targetMafia}">Citizen</span> because of " <span :class="{'site-color':true}">{{log.targetPassive}}</span> "</i>
                                                <i v-else-if="log.targetID != 2 && log.action == 'Check Identity'"> and result is <span :class="{'citizen-role':log.targetMafia}">{{log.targetMafia}}</span></i>
                                                <!-- Chef Check Result -->
                                                <i v-if="log.id == 6 && log.action == 'Check Role'"> and result is " <span :class="{'site-color':true}">{{log.targetRole}}</span> "</i>
                                                <!-- Cupid Link Result -->
                                                <i v-if="log.action == 'Bind'"> and <span :class="{'binded': log.target2 != null}">{{log.target2}}</span></i>
                                            </template>
                                            <template v-else>
                                                <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia}">{{log.target}}</span>'s passive activated : 
                                                <br />
                                                " <span :class="{'site-color':true}">{{log.passive}}</span> "
                                            </template>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    </div>
                </transition-group>
            </div>
        </div>

        <div class="step-box only-box same-padding" v-if="historyLog.length > 0 && !dashboard.day">
            <div class="log-table">
                <table>
                    <tr v-for="(log, index) in historyLog" :key="index">
                        <td>{{index+1}}</td>
                        <td>
                            <img :src="getActionImgUrl(log.actionIcon)" alt="Action Icon" v-if="!log.passiveLog" />
                            <img :src="getImgUrl(log.passiveIcon)" :alt="log.target" v-else />
                        </td>
                        <td>
                            <template v-if="!log.passiveLog">
                                <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> used " 
                                <span class="action-color">{{log.action}}</span> " on 
                                <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
                                <!-- Godfather Check Result -->
                                <i v-if="log.targetID == 2 && log.action == 'Check Identity'"> but result is <span :class="{'citizen-role':log.targetMafia}">Citizen</span> because of " <span :class="{'site-color':true}">{{log.targetPassive}}</span> "</i>
                                <i v-else-if="log.targetID != 2 && log.action == 'Check Identity'"> and result is <span :class="{'mafia-role':log.targetMafia, 'citizen-role':!log.targetMafia}"><span>{{log.targetMafia ? 'Mafia' : 'Citizen'}}</span></span></i>
                                <!-- Chef Check Result -->
                                <i v-if="log.id == 6 && log.action == 'Check Role'"> and result is " <span :class="{'site-color':true}">{{log.targetRole}}</span> "</i>
                                <!-- Cupid Link Result -->
                                <i v-if="log.action == 'Bind'"> and <span :class="{'binded': log.target2 != null}">{{log.target2}}</span></i>
                            </template>
                            <template v-else>
                                <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia}">{{log.target}}</span>'s passive activated : 
                                <br />
                                " <span :class="{'site-color':true}">{{log.passive}}</span> "
                            </template>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="step-box only-box" v-if="dashboard.god">
            <ul class="dashboard-hint">
                <li v-for="(hint, index) in God.dashboardHint" :key="index">
                    <span :class="hint.name">{{hint.hint}}</span>
                </li>
            </ul>
        </div>
        <app-button class="active has-xsmall-bottom-margin" v-if="dashboard.god" @click.native="rgwRoles()">{{God.rgwRoles}}</app-button>
        <app-button class="purple has-bottom-margin" v-if="dashboard.god" @click.native="resetGame()">{{God.resetGame}}</app-button>
    </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import InfoBox from '@/components/InfoBox.vue';
import Countdown from '@/components/Countdown.vue';
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
            defaultTime: 0,
            confirmAction: false,
            info: {
                id: 0,
                show: false,
                player: "Loading",
                linked: false,
                healed: false,
                action: "Loading Action",
                passive: "Passive",
                name: "Default",
                icon: "loader.svg",
                description: "...",
                actionIcon: "loader.svg",
                mafia: false,
                target: 'Person?',
                targetRole: 'Default',
                targetPassive: null,
                targetID: 0,
                targetMafia: null,
                targetIcon: 'default.png',
            },
        }
    },
    created(){
        this.fMafias = this.finalPlayers.filter(x => x.mafia == true);
        this.fCitizens = this.finalPlayers.filter(x => x.mafia == false);
        this.defaultTime = this.Numbers.time;
    },
    computed:{
        ...mapGetters([
            'Dashboard',
            'God',
            'Numbers',
            'SavedRoles',
            'SelectedRoles'
        ]),
        dashboard:{
            get: function(){
                return this.Dashboard;
            },
            set: function(newValue){
                this.Dashboard = newValue;
            }
        },
        dayTime: {
            get: function(){
                return this.Numbers.time * 60;
            },
            set: function(newValue){
                this.Numbers.time = newValue;
            }
        },
        defaultDashboard(){
            return {
                    god: false,
                    day: true,
                    round: 0,
                    log: {
                        id: 0,
                        passiveLog: false,
                        action: null,
                        passive: null,
                        passiveIcon: "loader.svg",
                        attacker: null,
                        target: null,
                        targetRole: null,
                        targetPassive: null,
                        targetID: 0,
                        target2: null,
                        actionIcon: "loader.svg",
                        mafia: false,
                        targetMafia: false,
                    },
                    historyLog: [],
                    totalHistory: [],
                }
        },
        finalMafias(){
            return this.fMafias;
        },
        finalCitizens(){
            return this.fCitizens;
        },
        historyLog: {
            get: function(){
                return this.Dashboard.historyLog;
            },
            set: function(newValue){
                this.Dashboard.historyLog = newValue;
            }
        },
        log(){
            return this.Dashboard.log;
        },
        savedRoles(){
            let $savedRoles = JSON.parse(JSON.stringify(this.SavedRoles));
            return $savedRoles;
        },
        totalHistory(){
            return this.Dashboard.totalHistory;
        },
    },
    methods:{
        ...mapActions([
            'setStep',
            'controlDashboard',
            'getRoles',
            'setGameReset'
        ]),
        cancelAction(){
            this.overlay = false;
            setTimeout(() => {
                this.info.target = 'Player?';
                this.info.targetRole = 'Default';
                this.info.targetID = 0;
                this.info.targetMafia = null;
                this.info.targetIcon = 'default.png';
                this.info.linked = false;
                this.info.healed = false;
                this.log.target = null;
                this.log.targetRole = null;
                this.log.targetPassive = null;
            }, 500);
        },
        changePhase(phase){
            this.confirmAction = false;
            if(phase == false){
                this.dashboard.day = true;
                this.totalHistory.push(this.historyLog);
            } else{
                this.dayTime = this.defaultTime;
                if(this.dashboard.round >= 1){
                    this.historyLog = [];
                }
                this.dashboard.round++;
                this.finalPlayers.forEach(element => {
                    // Reset One Night Actions
                    element.status.silenced = false;
                    element.status.roleChecked = false;
                    element.status.identityChecked = false;
                    element.status.healed = false;
                    element.status.hacked = false;
                    // Cupid Attacker
                    if(element.id == 11 || element.id == 12 || element.id == 7){
                        if(!element.action.oneTime){
                            element.actionStatus = true;
                        }
                    } else{
                        element.actionStatus = false;
                    }
                });
                this.dashboard.day = false;
            }
        },
        characterClasses(char){
            return {
                'dead': char.status.dead == true, 
                'ninja': char.status.stolen == true,
                'love-bind': char.status.linked == true,
                'silenced': char.status.silenced == true,
                'healed': char.status.healed == true,
                'invisible': char.status.invisible == true,
            }
        },
        checkGroup(player){
            // Necromancer Target
            if(player.id == 15){
               return this.finalPlayers.filter(x => x.player != player.player && x.status.dead == true);
            } 
            // Yakuza Target
            else if(player.id == 7){
               return this.finalPlayers.filter(x => x.mafia != player.mafia && x.status.dead == false);
            }
            // Doctor & Ruspy Target
            else if(player.id == 10 || player.id == 3){
               return this.finalPlayers.filter(x => x.status.dead == false);
            }
            // Default Target
            else{
               return this.finalPlayers.filter(x => x.player != player.player && x.status.dead == false); 
            }
        },
        checkSecondGroup(player){
            // Cupid Target
            if(player.id == 11){
               return this.finalPlayers.filter(x => x.player != player.player && x.player != player.target && x.status.dead == false);
            } 
        },
        deadOrAlive(player){
            // Check Alive People and People Don't Have Heal Buff = Kill them with filters
            if(player.status.dead == false && !player.status.healed){
                // Cupid Targets
                if(player.status.linked){
                    this.finalPlayers.forEach(element => {
                        if(element.status.linked){
                            element.status.dead = true;
                        }
                    });
                }
                // Bomb Targets
                if(player.id == 12){
                    this.finalPlayers.forEach(element => {
                        if(element.player == player.player){
                            element.status.dead = true;
                            this.passiveCalc(element);
                        }
                    });
                }
                // Default Target
                else{
                    this.finalPlayers.forEach(element => {
                        if(element.player == player.player){
                            element.status.dead = true;
                        }
                    });
                }
            // Check Dead People = Revive them with filters
            } else{
                this.finalPlayers.forEach(element => {
                    if(element.player == player.player){
                        // Revive Cupid Targets
                        if(element.status.linked && element.status.dead){
                            element.status.linked = false;
                        }
                        // Revive
                        element.status.dead = false;
                    }
                });
            }
        },
        executeAction(targetInfo){
            let attacker = targetInfo.id;
            let defender = targetInfo.targetID;
            let linked = targetInfo.linked;
            let healed = targetInfo.healed;
            
            if(this.log.target != null){
                this.log.id = this.info.id;
                this.log.attacker = this.info.player;
                this.log.action = this.info.action;
                this.log.passive = this.info.passive;
                this.log.actionIcon = this.info.actionIcon;
                this.log.mafia = this.info.mafia;
                this.log.targetRole = this.info.targetRole;
                this.log.targetMafia = this.info.targetMafia;
                this.log.targetPassive = this.info.targetPassive;
                this.log.targetID = this.info.targetID;
                
                this.historyLog.push({...this.log});
                this.cancelAction();

                this.finalPlayers.forEach((element, index) => {
                    if(element.player == this.log.attacker){
                        element.actionStatus = true;
                        // Yakuza Attacker
                        if(attacker == 7 && !element.status.healed){
                            element.status.dead = true;
                            element.action.oneTime = false;
                        }
                        // Cupid Attacker
                        if(attacker == 11){
                            element.action.oneTime = false;
                        }
                    }
                    if(element.player == this.log.target){
                        // Yakuza Target
                        if(attacker == 7){
                            element.status.stolen = true;
                            element.icon = 'ninja.png';
                            element.action.action = null;
                            element.action.passive = null;
                            element.action.secondaryAction = null;
                        }
                    }
                    // Cupid Targets
                    if(attacker == 11){
                        if(element.player == this.log.target){
                            element.status.linked = true;
                        }
                        if(element.player == this.log.target2){
                            element.status.linked = true;
                        }
                    }
                    // Godfather and Mafia Targets -- Kill if not Healed
                    if(attacker == 2 && !healed || attacker == 1 && !healed){
                        if(element.player == this.log.target){
                            element.status.dead = true;
                        }
                        // Bomb Targets | Passive
                        if(element.id == defender){
                            this.passiveCalc(element);
                        }
                        // Cupid Targets | Status
                        if(linked){
                            this.finalPlayers.forEach(element => {
                                if(element.status.linked && !element.status.healed){
                                    element.status.dead = true;
                                } 
                            });
                        }
                    }
                    // Ruspy Targets
                    if(attacker == 3){
                        if(element.player == this.log.target){
                            element.status.silenced = true;
                        }
                    }
                    // Doctor Targets
                    if(attacker == 10){
                        if(element.player == this.log.target){
                            element.status.healed = true;
                        }
                    }
                });
            }
        },
        findTarget(target){
            this.finalPlayers.forEach(element => {
                if(element.player == target){
                    this.info.targetRole = element.name;
                    this.info.targetPassive = element.action.passive;
                    this.info.targetMafia = element.mafia;
                    this.info.targetIcon = element.icon;
                    this.info.targetID = element.id;
                    this.info.linked = element.status.linked;
                    this.info.healed = element.status.healed;
                }
            });
            this.info.target = target;
        },
        fireAction(player){
            if(player.actionStatus == false){
                this.info.id = player.id;
                this.info.player = player.player;
                this.info.icon = player.icon;
                this.info.action = player.action.action;
                this.info.passive = player.action.passive;
                this.info.actionIcon = player.actionIcon;
                this.info.mafia = player.mafia;
                this.overlay = true;
            }
        },
        getActionImgUrl(pic) {
            return require(`@/assets/images/actions/${pic}`);
        },
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        passiveCalc(element){
            if(!element.status.detonated && element.action.oneTime){
                element.status.detonated = true;
                this.log.target = element.player;
                this.log.passiveLog = true;
                this.log.passive = element.action.passive;
                this.log.passiveIcon = element.icon;
                element.status.detonated = true;
                element.actionStatus = true;
                element.action.oneTime = false;
                this.historyLog.push({...this.log});
                this.log.passiveLog = false;
            }
        },
        resetGame(){
            let confirmFinish = confirm("are you sure? Your selected roles and players will reset");
            if(confirmFinish){
                this.$router.push({name:'home'});
                setTimeout(() => {
                    this.$router.go();
                }, 250);
            }
        },
        rgwRoles(){
            let confirmFinish = confirm("Do you want to reset with same roles?");
            if(confirmFinish){
                this.getRoles(this.savedRoles);
                this.setGameReset(true);
                this.$emit('ready', false);
                this.$emit('personNumb', 1);
                this.controlDashboard(this.defaultDashboard);
                this.setStep(1);
            }
        },
        showInfo(role){
            this.info.name = role.name;
            this.info.icon = role.icon;
            this.info.description = role.description;
            this.info.mafia = role.mafia;
            this.info.show == false ? this.info.show = true : this.info.show = false;
        },
        showPlay(){
            this.dashboard.god = true;
        }
    },
    components: {
        overlay: Overlay,
        infoBox: InfoBox,
        countdown: Countdown,
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
        &.ninja{
            td{
                &::after{
                    visibility: visible;
                    opacity: 1;
                    background-color:rgb(194,73,73, .4);
                }
                &:last-child::after{
                    background-color: transparent;
                }
            }
        }
    }

    .log-table{
        position: relative;
        padding:1px;
        border-radius: 3px;
        background-color: $color_1;
        table{
            width: 100%;
            td{
                font-weight: normal;
                font-size: $font_size_3;
                color:$color_1;
                word-break: break-word;
                padding:6px;
                background-color: $background_color_main;
                img{width:28px;}
                &:first-child{
                    width:9%;
                    color:$color_2;
                    text-align: center;
                    border-radius: 2px 0 0 2px;
                    background-color: $background_color_5;
                }
                &:nth-child(2){
                    width:14%;
                    font-size: $font_size_2;
                }
                &:last-child{
                    font-size: $font_size_2;
                    text-align: left;
                    border-radius: 0 2px 2px 0;
                }
            }
        }
        &.result{
            margin-top:50px;
            background-color: $background_color_main;
            td{
                color:$color_2;
                background-color: $color_1;
                &:first-child{width:18%;}
                &:nth-child(2){width:82%;}
            }
            .table-title{
                position: absolute;
                top:-34px;
                left:50%;
                width:200px;
                height: 34px;
                line-height: 34px;
                font-size: $font_size_3;
                text-align: center;
                margin-left: -100px;
                background-color: $background_color_main;
                border-radius: 4px 4px 0 0;
            }
        }
    }

    .player-box{
        display:inline-block;
        vertical-align: middle;
    }

    .action-color{color:$day}

</style>
