<template>
    <div>

        <!-- Dashboard Buttons -->

        <div class="button-holder" v-if="dashboard.god">
            <transition name="fade" mode="out-in">
                <app-button :class="{'day':dashboard.day, 'night':!dashboard.day, 'swap-bttn':true}" @click.native="changePhase(dashboard.day)">
                    <span v-if="dashboard.day">{{$t('god.nightText')}}</span>
                    <span v-else>{{$t('god.dayText')}}</span>
                </app-button>
            </transition>
        </div>

        <!-- Night Priority Action Box -->

        <transition name="fade">
            <div class="priority-box" v-if="!dashboard.day && sortByPriority.length !== dashboard.currentAction">

                <!-- Before Action Box -->
                <transition name="fade">
                    <div class="before-action-box" v-if="dashboard.lastPhaseAction && dashboard.round > 1 || dashboard.mafiaParty && dashboard.round == 1">
                        <div class="table-display">
                            <div class="table-cell-display">
                                <!-- Last Phase Action -->
                                <template v-if="dashboard.lastPhaseAction && dashboard.round > 1">
                                    <img :src="getImgUrl($t('god.voteIcon'))" :alt="$t('god.deadIconAlt')" />
                                    <p>{{$t('god.lastPhaseText')}}</p>
                                    <select name="action_target" v-model="log.target">
                                        <option :value="null" disabled>{{$t('god.selectPlaceholder')}}</option>
                                        <option v-for="(person, index) in checkGroup('lastDay')" :key="index">{{person.player}}</option>
                                    </select>
                                    <app-button @click.native="killByVote(log.target)">{{$t('god.confirmButton')}}</app-button>
                                    <app-button class="danger" @click.native="dashboard.lastPhaseAction = false">{{$t('god.skipButton')}}</app-button>
                                </template>
                                <!-- Last Phase Action -->
                                <template v-else-if="dashboard.mafiaParty && dashboard.round == 1">
                                    <img :src="getImgUrl($t('god.mafiaPartyIcon'))" :alt="$t('god.mafiaPartyIconAlt')" />
                                    <p class="site-color">{{$t('god.mafiaPartyText')}}</p>
                                    <ul class="error-bullet type-2">
                                        <li v-for="(mp, index) in $t('god.mafiaPartyException')" :key="index" v-html="mp"></li>
                                    </ul>
                                    <app-button class="has-small-top-margin" @click.native="dashboard.mafiaParty = false">{{$t('god.mafiaPartyButton')}}</app-button>
                                </template>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- Actions Progress Bar -->
                <div class="progress-bar">
                    <span :style="{width: progress+'%'}"></span>
                    <i><strong>{{dashboard.currentAction}}</strong> / {{sortByPriority.length}}</i>
                </div>

                <!-- Handle Actions -->
                <template v-for="(action, index) in sortByPriority">
                    <div class="action-box" v-if="checkReadyActions(action, index)" :key="index">
                        {{fireAction(action)}}

                        <transition name="fade" mode="out-in">
                            <!-- Hacked Target Action -->
                            <div class="action-overlay hacked-overlay" v-if="targetHacked" key="hackedTarget">
                                <div class="table-display">
                                    <div class="table-cell-display">
                                        <img :src="getImgUrl($t('god.hackedIcon'))" :alt="$t('god.hackedIconAlt')" />
                                        <p><span :class="{'mafia-role': info.mafia, 'citizen-role': !info.mafia}">{{$t(info.name2)}} </span> <strong v-html="$t('god.hackedPerson')"></strong></p>
                                        <app-button class="purple" @click.native="skipAction()">{{$t('god.skipButton3')}}</app-button>
                                    </div>
                                </div>
                            </div>
                            <!-- Dead Target Action -->
                            <div class="action-overlay dead-overlay" v-else-if="targetDead" key="deadTarget">
                                <div class="table-display">
                                    <div class="table-cell-display">
                                        <img :src="getImgUrl($t('god.deadIcon'))" :alt="$t('god.deadIconAlt')" />
                                        <img class="overlap" :src="getImgUrl($t(info.icon2))" :alt="$t('god.playerIconAlt')" />
                                        <p><span :class="{'mafia-role': info.mafia, 'citizen-role': !info.mafia}">{{$t(info.name2)}} </span> <strong v-html="$t('god.deadPerson')"></strong></p>
                                        <app-button class="black" @click.native="skipAction()">{{$t('god.skipButton3')}}</app-button>
                                    </div>
                                </div>
                            </div>
                            <!-- Revived Target Action -->
                            <div class="action-overlay dead-overlay" v-else-if="targetRevived" key="revivedTarget">
                                <div class="table-display">
                                    <div class="table-cell-display">
                                        <img :src="getImgUrl($t(info.icon2))" :alt="$t('god.revivedIconAlt')" />
                                        <p><span :class="{'mafia-role': info.mafia, 'citizen-role': !info.mafia}">{{info.player}} </span> <strong v-html="$t('god.revivedPerson')"></strong></p>
                                        <app-button class="black" @click.native="skipAction()">{{$t('god.skipButton3')}}</app-button>
                                    </div>
                                </div>
                            </div>
                        </transition>

                        <p>{{$t('god.actionQuestion1')}}<span :class="{'mafia-role': info.mafia, 'citizen-role': !info.mafia}"> {{$t(info.name2)}} </span> {{$t('god.actionQuestion2')}} <strong>{{$t(info.action)}}</strong> ?</p>
                        <div class="player-box-holder has-small-bottom-margin">
                            <div class="player-box">
                                <img :src="getImgUrl($t(info.icon2))" :alt="$t('god.playerIconAlt')"  />
                                <h4 class="has-xsmall-top-margin" :class="{'mafia-role': info.mafia,'citizen-role': !info.mafia}">{{info.player}}</h4>
                            </div>
                            <div class="arrow">
                                <img class="action-image" :src="getActionImgUrl($t(info.actionIcon))" :alt="$t('god.playerActionIconAlt')" />
                            </div>
                            <div class="player-box">
                                <img :src="getImgUrl($t(info.targetIcon))" :alt="$t('god.playerIconAlt')"  />
                                <h4 class="has-xsmall-top-margin" :class="{'mafia-role': info.targetMafia != null && info.targetMafia, 'citizen-role': info.targetMafia != null && !info.targetMafia}">{{info.target}}</h4>
                            </div>
                        </div>
                        <select @change="findTarget(log.target, log.targetID)" name="action_target" v-model="log.target">
                            <option :value="null" disabled>{{$t('god.selectPlaceholder')}}</option>
                            <option v-for="(person, index) in checkGroup(info)" :key="index">{{person.player}}</option>
                        </select>
                        <template v-if="info.ability.binder && log.target != null">
                            <label for="action_target_2">{{$t('god.actionHintText2')}}</label>
                            <select name="action_target_2" v-model="log.target2">
                                <option :value="null" disabled>{{$t('god.selectPlaceholder')}}</option>
                                <option v-for="(person, index) in checkSecondGroup(info)" :key="index">{{person.player}}</option>
                            </select>
                        </template>
                    </div>
                </template>

                <!-- Action Buttons -->
                <app-button @click.native="executeAction(info)">{{$t('god.confirmButton')}}</app-button>
                <app-button class="danger" @click.native="alertBox = true">{{$t('god.skipButton')}}</app-button>

                <!-- Log Actions During Night -->
                <overlay :class="{'active': logAction, 'log': true, 'done': logActionDone}">
                    <div class="log-action">
                        <img :src="getActionImgUrl($t(log.actionIcon))" :alt="$t('god.actionIconAlt')" v-if="!log.passiveLog" />
                        <img :src="getImgUrl($t(log.passiveIcon))" :alt="log.target" v-else />
                        <log-events :log="log"></log-events>
                    </div>
                </overlay>
            </div>
        </transition>

        <!-- Alert Box -->

        <overlay :class="{'active': alertBox,'dialog': true}">
            <img class="has-xsmall-bottom-margin" :src="require(`@/assets/images/icons/warning.png`)" :alt="$t('general.warningIcon')" />
            <template>
                <p>{{$t('god.skipText')}}</p>
                <app-button @click.native="skipAction()" class="green"><span>{{$t('god.skipButton2')}}</span></app-button>
                <app-button @click.native="alertBox = false" class="danger"><span>{{$t('god.cancelButton')}}</span></app-button>
            </template>
        </overlay>

        <!-- Log History -->

        <overlay :class="{'active': logHistory, 'log-history': true}">
            <template v-for="(totLog, index) in totalHistory">
                <div class="log-table" :key="index" v-if="totLog.length > 0">
                    <span class="counter">{{$t('common.Night')}} {{index+1}}</span>
                    <table>
                        <tr v-for="(log, index) in totLog" :key="index">
                            <td>{{index+1}}</td>
                            <td>
                                <img :src="getActionImgUrl($t(log.actionIcon))" :alt="$t('god.actionIconAlt')" v-if="!log.passiveLog" />
                                <img :src="getImgUrl($t(log.passiveIcon))" :alt="$t('god.passiveIconAlt')" v-else />
                            </td>
                            <td>
                                <log-events :log="log"></log-events>
                            </td>
                        </tr>
                    </table>
                </div>
             </template>
             <div class="log-table" v-if="historyLog.length > 0">
                <span class="counter">{{$t('god.thisNight')}}</span>
                <table>
                    <tr v-for="(log, index) in historyLog" :key="index">
                        <td>{{index+1}}</td>
                        <td>
                            <img :src="getActionImgUrl($t(log.actionIcon))" :alt="$t('god.actionIconAlt')" v-if="!log.passiveLog" />
                            <img :src="getImgUrl($t(log.passiveIcon))" :alt="$t('god.passiveIconAlt')" v-else />
                        </td>
                        <td>
                            <log-events :log="log"></log-events>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="totalHistory.length == 0 && historyLog.length == 0">
                <h2>{{$t('god.noLog')}}</h2>
            </div>
            <app-button @click.native="logHistory = false" class="active has-small-top-margin"><span>{{$t('god.logCloseButton')}}</span></app-button>
        </overlay>

        <!-- Last Night Log -->

        <overlay :class="{'active': lastNightBox, 'dialog': true, 'last-night': true}">
            <img :src="getImgUrl($t('god.peopleIcon'))" :alt="$t('god.peopleIconAlt')">
            <h2>{{$t('god.lastNightTitle')}}</h2>
            <ul>
                <li v-for="(nL, index) in lastNight" :key="index" v-html="nL"></li>
            </ul>
            <app-button @click.native="lastNightBox = false" class="active"><span>{{$t('god.logCloseButton')}}</span></app-button>
        </overlay>

        <!-- Day & Night Dashboard -->

        <div class="step-box display godashboard" :class="{'day': dashboard.day && dashboard.god, 'night': !dashboard.day}">
            <transition name="fade">
                <strong class="round-tracker" v-if="!dashboard.day">{{dashboard.round}}</strong>
            </transition>
            <div class="center-aligned">
                <transition-group name="fade" mode="out-in">
                    <div v-if="!dashboard.god" key="beforeShow">
                        <img class="game-icon" :src="require(`@/assets/images/icons/game.png`)" :alt="$t('god.gameDashboardIconAlt')" />
                        <h3 class="different-colors" v-html="$t('god.gameStartText')"></h3>
                        <app-button class="active" @click.native="showPlay()">{{$t('god.godButton')}}</app-button>
                    </div>
                    <div v-else key="afterShow">
                        <div class="players-role">

                            <info-box :info="info"></info-box>

                            <!-- Mafia Table in Dashboard -->
                            <div class="table mafia-table">
                                <table>
                                    <tr>
                                        <th>{{$t('common.Role')}}</th>
                                        <th>{{$t('common.Player')}}</th>
                                        <th v-if="dashboard.day == true">{{$t('common.Vote')}}</th>
                                        <th v-if="dashboard.day == false">{{$t('common.Status')}}</th>
                                        <th v-if="dashboard.day == false">{{$t('common.Action')}}</th>
                                    </tr>
                                    <tr v-for="(fM, index) in finalMafias" :key="index" :class="characterClasses(fM)">
                                        <td>
                                            <a @click="showInfo(fM)" href="javascript:void(0)">
                                                <img :src="getImgUrl($t(fM.icon))" :alt="$t(fM.alt)" /> {{$t(fM.name)}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fM.player}}</span></td>
                                        <td class="vote-counter" v-if="dashboard.day == true"><input type="tel" :name="`vote_count_${index}`" placeholder="0" :maxlength="'2'" :tabindex="index+10" /></td>
                                        <td v-if="dashboard.day == false"><a href="javascript:void(0)" @click="deadOrAlive(fM)" :class="{'killer': fM.status.dead == false, 'angel': fM.status.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="disabled" v-if="!fM.status.hasPassive && !fM.status.hasAction"></span>
                                            <span class="done-action" v-else-if="!fM.status.hasAction && fM.status.hasPassive && fM.actionStatus"></span>
                                            <span @click="showInfo(fM)" class="passive" v-if="fM.status.hasPassive && !fM.status.hasAction"></span>
                                            <span @click="showInfo(fM)" :class="{'pending-action': !fM.actionStatus && fM.status.hasAction, 'done-action': fM.actionStatus}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Citizen Table in Dashboard -->
                            <div class="table citizen-table">
                                <table>
                                    <tr>
                                        <th>{{$t('common.Role')}}</th>
                                        <th>{{$t('common.Player')}}</th>
                                        <th v-if="dashboard.day == true">{{$t('common.Vote')}}</th>
                                        <th v-if="dashboard.day == false">{{$t('common.Status')}}</th>
                                        <th v-if="dashboard.day == false">{{$t('common.Action')}}</th>
                                    </tr>
                                    <tr v-for="(fC, index) in finalCitizens" :key="index" :class="characterClasses(fC)">
                                        <td>
                                            <a @click="showInfo(fC)" href="javascript:void(0)">
                                                <img :src="getImgUrl($t(fC.icon))" :alt="$t(fC.alt)" /> {{$t(fC.name)}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fC.player}}</span></td>
                                        <td class="vote-counter" v-if="dashboard.day == true"><input type="tel" :name="`vote_count_${index}`" placeholder="0" :maxlength="'2'" :tabindex="index+20" /></td>
                                        <td v-if="dashboard.day == false"><a href="javascript:void(0)" @click="deadOrAlive(fC)" :class="{'killer': fC.status.dead == false, 'angel':fC.status.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="disabled" v-if="!fC.status.hasPassive && !fC.status.hasAction"></span>
                                            <span class="done-action" v-else-if="!fC.status.hasAction && fC.status.hasPassive && fC.actionStatus"></span>
                                            <span @click="showInfo(fC)" class="passive" v-if="fC.status.hasPassive && !fC.status.hasAction"></span>
                                            <span @click="showInfo(fC)" :class="{'pending-action': !fC.actionStatus && fC.status.hasAction, 'done-action': fC.actionStatus}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Log Actions in Last Night -->

                            <div class="log-table" v-if="historyLog.length > 0 && dashboard.day" :class="{'result': historyLog.length > 0 && dashboard.day}">
                                <span class="table-title">{{$t('god.whatHappened')}}</span>
                                <table>
                                    <tr v-for="(log, index) in historyLog" :key="index">
                                        <td>
                                            <img :src="getActionImgUrl($t(log.actionIcon))" :alt="$t('god.actionIconAlt')" v-if="!log.passiveLog" />
                                            <img :src="getImgUrl($t(log.passiveIcon))" :alt="log.target" v-else />
                                        </td>
                                        <td>
                                            <log-events v-if="readyToLog" :log="log"></log-events>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    </div>
                </transition-group>
            </div>
        </div>

        <!-- Log Buttons -->

        <transition name="fade">
            <div class="log-bttn" v-if="dashboard.god">
                <app-button @click.native="logHistory = true" class="awesome"><span>{{$t('god.historyLogButton')}} <i>{{totalHistory.length}}</i></span></app-button>
            </div>
        </transition>

        <!-- Dashboard Game Hint -->

        <div class="step-box only-box" v-if="dashboard.god">
            <ul class="dashboard-hint">
                <li v-for="(hint, index) in $t('god.dashboardHint')" :key="index">
                    <span :class="hint.name">{{hint.hint}}</span>
                </li>
            </ul>
        </div>

        <!-- Restart or Reset Game -->

        <app-button class="active has-xsmall-bottom-margin" @click.native="overlay = true,  totRestart = false" v-if="dashboard.god">{{$t('god.rgwRoles')}}</app-button>
        <app-button class="purple has-bottom-margin" v-if="dashboard.god" @click.native="overlay = true, totRestart = true">{{$t('god.resetGame')}}</app-button>

        <overlay :class="{'active': overlay,'dialog': true}">
            <img class="has-xsmall-bottom-margin" :src="require(`@/assets/images/icons/warning.png`)" :alt="$t('general.warningIcon')" />
            <template v-if="!totRestart">
                <p>{{$t('god.resetText')}}</p>
                <app-button @click.native="rgwRoles()" class="green "><span>{{$t('god.restartButton')}}</span></app-button>
                <app-button @click.native="overlay = false" class="danger"><span>{{$t('god.cancelButton')}}</span></app-button>
            </template>
            <template v-else>
                <p>{{$t('god.resetTotalText')}}</p>
                <app-button @click.native="resetGame()" class="green "><span>{{$t('god.restartButton')}}</span></app-button>
                <app-button @click.native="overlay = false" class="danger"><span>{{$t('god.cancelButton')}}</span></app-button>
            </template>
        </overlay>
        
    </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import InfoBox from '@/components/InfoBox.vue';
import Log from '@/components/Log.vue';
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
            alertBox: false,
            logAction: false,
            logHistory: false,
            logActionDone: false,
            readyToLog: false,
            lastNightBox: false,
            totRestart: false,
            targetHacked: false,
            targetDead: false,
            targetRevived: false,
            killer: false,
            multipleMafia: false,
            confirmAction: false,
            info: {
                id: 0,
                show: false,
                player: "replacingRoles.loading.name",
                damageReturned: false,
                action: "replacingRoles.loading.name",
                passive: "none",
                ability: {},
                status: {},
                name2: "replacingRoles.loading.name",
                icon: "replacingRoles.loading.icon",
                icon2: "replacingRoles.loading.icon",
                description: "replacingRoles.loading.description",
                actionIcon: "replacingRoles.loading.icon",
                mafia: false,
                target: this.$t("replacingRoles.preTarget.name"),
                targetInfo: {},
                targetRole: "replacingRoles.preTarget.role",
                targetStatus: null,
                targetPassive: 'none',
                targetID: 0,
                targetMafia: null,
                targetIcon: "replacingRoles.preTarget.icon",
            },
        }
    },
    created(){
        this.fMafias = this.finalPlayers.filter(x => x.mafia == true);
        this.fCitizens = this.finalPlayers.filter(x => x.mafia == false);
    },
    computed:{
        ...mapGetters([
            'Dashboard',
            'Numbers',
            'SavedRoles',
            'SelectedRoles',
            'Actions',
        ]),
        dashboard:{
            get: function(){
                return this.Dashboard;
            },
            set: function(newValue){
                this.Dashboard = newValue;
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
                    passive: "none",
                    ability: null,
                    status: null,
                    godLog: false,
                    passiveIcon: "replacingRoles.loading.icon",
                    attacker: null,
                    target: null,
                    targetRole: "replacingRoles.preTarget.role",
                    targetPassive: 'none',
                    targetID: 0,
                    target2: null,
                    actionIcon: "replacingRoles.loading.icon",
                    mafia: false,
                    targetMafia: false,
                },
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
        lastNight: {
            get: function(){
                return this.Dashboard.lastNightLog;
            },
            set: function(newValue){
                this.Dashboard.lastNightLog = newValue;
            }
        },
        log: {
            get: function(){
                return this.Dashboard.log;
            },
            set: function(newValue){
                this.Dashboard.log = newValue;
            }
        },
        progress(){
            return (this.dashboard.currentAction / this.sortByPriority.length) * 100
        },
        savedRoles(){
            let $savedRoles = JSON.parse(JSON.stringify(this.SavedRoles));
            return $savedRoles;
        },
        sortByPriority(){
            return this.Actions;
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
            'setGameReset',
            'setActions',
        ]),
        // Change Day and Night
        changePhase(phase){
            this.confirmAction = false;
            if(!phase){
                this.dashboard.day = true;
                this.finalPlayers.forEach(element => {
                    // Reset One Night Actions
                    element.status.roleChecked = false;
                    element.status.identityChecked = false;
                    element.status.hacked = false;
                    element.status.silenced = false;
                    element.status.healed = false;
                    // One Time Actions of Yakuza - Cupid - Bomb - Bulletproof
                    if(element.ability.playerSwaper || element.ability.binder || element.ability.detonator || element.ability.hasShield){
                        if(!element.action.oneTime){
                            element.actionStatus = true;
                        }
                    } else{
                        element.actionStatus = false;
                    }
                });
                this.totalHistory.push(this.historyLog);
                let getTarget = this.finalPlayers.forEach(element => {
                    this.historyLog.forEach(item => {
                        if(element.player == item.target && element.status.recentlyDead && !element.status.recentlyRevived
                        || element.player == item.target2 && element.status.recentlyDead && !element.status.recentlyRevived
                        || element.player == item.attacker && element.status.recentlyDead && !element.status.recentlyRevived){
                            let logNote = `<span class='last-log red-bg dead-icon'><i>${element.player}</i> ${this.$t('god.logDeadText')}</span>`;
                            element.status.recentlyDead = false;
                            this.lastNight.push(logNote);
                        }
                        if(element.player == item.target && element.status.recentlyRevived && !element.status.recentlyDead){
                            let logNote = `<span class='last-log green-bg revived-icon'><i>${element.player}</i> ${this.$t('god.logRevivedText')}</span>`;
                            element.status.recentlyRevived = false;
                            this.lastNight.push(logNote);
                        }
                        if(element.player == item.target && element.status.recentlySilenced){
                            let logNote = `<span class='last-log blue-bg silenced-icon'><i>${element.player}</i> ${this.$t('god.logSilencedText')}</span>`;
                            element.status.recentlySilenced = false;
                            this.lastNight.push(logNote);
                        }
                    });
                });
                if(this.lastNight.length > 0){
                    this.lastNightBox = true;
                }
                this.historyLog = [];
            } else{
                this.dashboard.lastPhaseAction = true;
                if(this.dashboard.round >= 1){
                    this.lastNight = [];
                }
                this.chooseKiller();
                this.dashboard.round++;
                this.dashboard.currentAction = 0;
                this.setActionsByPriority();
                this.dashboard.day = false;
            }
        },
        // Classes for Characters
        characterClasses(char){
            return {
                'dead': char.status.dead == true, 
                'ninja': char.status.playerSwapped == true,
                'love-bind': char.status.linked == true,
                'silenced': char.status.silenced == true,
                'healed': char.status.healed == true,
                'shield': char.status.shield == true && !char.status.hacked, // Active if not hacked
                'invisible': char.status.invisible == true && !char.status.hacked, // Active if not hacked
                'hacked': char.status.hacked == true,
                'skeleton': char.status.revived == true
            }
        },
        // Select Options for Action
        checkGroup(player){
                // Last Day Vote
                if(player == 'lastDay'){
                    return this.finalPlayers.filter(x => x.status.dead == false);
                }
                // Night King Target
                else if(player.ability.reviver){
                    return this.finalPlayers.filter(x => x.player != player.player && x.status.dead == true);
                } 
                // Yakuza Target
                else if(player.ability.playerSwapper){
                    return this.finalPlayers.filter(x => x.mafia != player.mafia && x.status.dead == false);
                }
                // Doctor & Ruspy & Cupid Target
                else if(player.ability.healer || player.ability.silencer || player.ability.binder){
                    return this.finalPlayers.filter(x => x.status.dead == false);
                }
                // Default Target
                else{
                    return this.finalPlayers.filter(x => x.player != player.player && x.status.dead == false); 
                }
        },
        // Second Select Options for Action
        checkSecondGroup(player){
            // Cupid Target
            if(player.ability.binder){
               return this.finalPlayers.filter(x => x.player != player.player && x.player != player.target && x.status.dead == false);
            } 
        },
        checkReadyActions(attacker, index){
            if(index == this.dashboard.currentAction){
                if(this.checkGroup(attacker).length <= 0){
                    this.dashboard.currentAction++;
                }
                if(attacker.status.hacked){
                    this.targetHacked = true;
                } else{
                    this.targetHacked = false;
                }
                if(attacker.status.dead){
                    this.targetDead = true;
                } else{
                    this.targetDead = false;
                }
                if(attacker.status.revived){
                    this.targetRevived = true;
                } else{
                    this.targetRevived = false;
                }
                return true;
            } else{
                return false;
            }
        },
        chooseKiller(){
            let mafiaNumbers = this.SelectedRoles.filter(item => item.id == 1);
            this.SelectedRoles.forEach(element => {
                if(element.ability.killer && !element.status.mafia){
                    this.killer = true;
                }
                if(element.status.mafia && this.killer){
                    element.status.hasAction = false;
                }
                if(element.status.mafia && mafiaNumbers.length > 1){
                    element.status.hasAction = false;
                    this.multipleMafia = true;
                }
            });
            for (let i = 0; i < this.SelectedRoles.length; i++) {
                if(this.SelectedRoles[i].id == 1 && this.multipleMafia){
                    this.SelectedRoles[i].ability.killer = true;
                    this.SelectedRoles[i].status.hasAction = true;
                    this.SelectedRoles[i].action.action = "common.Kill";
                    break;
                }
            }
        },
        // Kill or Heal Character Manually
        deadOrAlive(player){
            this.log.attacker = "god.name";
            this.log.target = player.player;
            this.log.targetMafia = player.mafia;
            this.log.godLog = true;
            // Check Alive People and People Don't Have Heal Buff = Kill them with filters
            if(!player.status.healed){
                if(player.status.dead == false){
                    // Log god when kills
                    this.log.action = "god.killAction";
                    this.log.actionIcon = "god.killIcon";
                    // Cupid Targets
                    if(player.status.linked){
                        this.finalPlayers.forEach(element => {
                            if(element.status.linked){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                            }
                        });
                    }
                    // Bomb Targets
                    if(player.ability.detonator){
                        this.finalPlayers.forEach(element => {
                            if(element.player == player.player){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                                this.passiveCalc(element);
                            }
                        });
                    }
                    // Bulletproof Targets
                    if(player.ability.hasShield){
                        this.finalPlayers.forEach(element => {
                            if(element.player == player.player){
                                if(element.status.shield){
                                    element.status.dead = true;
                                    element.status.recentlyDead = true;
                                    element.status.shield = false;
                                }
                            }
                        });
                    }
                    // Night King Targets
                    if(player.ability.reviver){
                        this.finalPlayers.forEach(element => {
                            if(element.player == player.player){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                            }
                            if(element.status.revived){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                            }
                        });
                    }
                    // Default Target
                    else{
                        this.finalPlayers.forEach(element => {
                            if(element.player == player.player){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                            }
                        });
                    }
                // Check Dead People = Revive them with filters
                } else{
                    // Log god when revive
                    this.log.action = "god.reviveAction";
                    this.log.actionIcon = "god.reviveIcon";
                    
                    this.finalPlayers.forEach(element => {
                        if(element.player == player.player){
                            // Revive Cupid Targets
                            if(element.status.linked && element.status.dead){
                                element.status.linked = false;
                            }
                            // Revive
                            element.status.dead = false;
                            element.status.recentlyRevived = true;
                        }
                    });
                }         
                this.historyLog.push({...this.log});
            }
            this.log.attacker = null;
            this.log.target = null;
            this.log.targetMafia = null;
            this.log.godLog = false;
        },
        // Do Action
        executeAction(info){
            if(this.log.target != null && Object.keys(info.targetInfo).length > 0){
                let attacker = info.ability;
                let attackerID = info.id;
                let attackerStatus = info.status;
                let defender = info.targetInfo;
                let defenderAbility = defender.ability;
                let defenderID = defender.id;
                let linked = defender.status.linked;
                let healed = defender.status.healed;
                let shield = defender.status.shield;
                let hacked = defender.status.hacked;
                let damageReturned = defender.status.damageReturned;
                // Check not being cupid and second selectmenu is turned off
                if(!(attacker.binder && this.log.target2 == null)){
                    this.log.id = this.info.id;
                    this.log.attacker = this.info.player;
                    this.log.action = this.info.action;
                    this.log.passive = this.info.passive;
                    this.log.ability = this.info.ability;
                    this.log.status = this.info.status;
                    this.log.actionIcon = this.info.actionIcon;
                    this.log.mafia = this.info.mafia;
                    this.log.targetRole = this.info.targetRole;
                    this.log.targetMafia = this.info.targetMafia;
                    this.log.targetPassive = this.info.targetPassive;
                    this.log.targetID = this.info.targetID;
                    
                    setTimeout(() => {
                        this.historyLog.push({...this.log});  
                    }, 3450);

                    this.finalPlayers.forEach((element, index) => {
                        if(element.player == this.log.attacker){
                            element.actionStatus = true;
                            // Yakuza Attacker
                            if(attacker.playerSwapper && !element.status.healed){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                                element.action.oneTime = false;
                            }
                            // Cupid Attacker
                            if(attacker.binder){
                                element.action.oneTime = false;
                            }
                            // Grandma Attacker Check if not Hacked ; Attacker not being Cupid or Hacker or Night King ; 
                            if(defenderAbility.returner && !hacked && !attacker.binder && !attacker.reviver && !attacker.hacker && element.id == attackerID){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                            }
                        }
                        // Yakuza Target ; Check if damageReturned ; Check if Hacked
                        if(element.player == this.log.target && attacker.playerSwapper && !damageReturned || element.player == this.log.target && attacker.playerSwapper && damageReturned && hacked){
                            element.status.playerSwapped = true;
                            element.status.damageReturned = false;
                            element.status.shield = false;
                            element.name = "replacingRoles.miniYakuza.name";
                            element.icon = "replacingRoles.miniYakuza.icon";
                            element.description = "replacingRoles.miniYakuza.description";
                            element.actionStatus = false;
                            element.status.hasAction = false;
                            element.status.hasPassive = false;
                            element.action.action = "common.None";
                            element.action.passive = "common.None";
                        }
                        // Cupid Targets
                        if(attacker.binder){
                            if(element.player == this.log.target){
                                element.status.linked = true;
                            }
                            if(element.player == this.log.target2){
                                element.status.linked = true;
                            }
                        }
                        // Night King
                        if(attacker.reviver && element.player == this.log.target){
                            // Revive Cupid Targets
                            if(element.status.linked && element.status.dead){
                                element.status.linked = false;
                            }
                            // Revive
                            element.name = "replacingRoles.skeleton.name";
                            element.icon = "replacingRoles.skeleton.icon";
                            element.description = "replacingRoles.skeleton.description";
                            element.actionStatus = false;
                            element.status.hasAction = false;
                            element.status.hasPassive = false;
                            element.action.action = "common.None";
                            element.action.passive = "common.None";
                            element.status.invisible = false;
                            element.status.dead = false;
                            element.status.revived = true;
                            element.status.recentlyRevived = true;
                        }
                        // Police
                        if(attacker.playerChecker && element.id == defenderID){
                            element.status.identityChecked = true;
                        }
                        // Chef
                        if(attacker.roleChecker && element.id == defenderID){
                            element.status.roleChecked = true;
                        }
                        // Hacker Target
                        if(attacker.hacker && element.id == defenderID){
                            element.status.hacked = true;
                        }
                        // Grandma Being Target Check if not Hacked ; Attacker not being Cupid or Hacker ; 
                        if(defenderAbility.returner && element.id == defenderID && !attacker.binder && !attacker.hacker){
                            if(attackerStatus.linked){
                                this.finalPlayers.forEach(element => {
                                    if(element.status.linked){
                                        element.status.dead = true;
                                        element.status.recentlyDead = true;
                                    }
                                });
                            }
                            this.passiveCalc(element, attackerStatus);
                        }
                        // Godfather and Mafia Targets -- Kill if not Healed
                        if(attacker.killer && !healed){
                            // Check not damageReturned
                            if(!damageReturned || damageReturned && hacked){
                                if(element.player == this.log.target){
                                    // Bulletproof; Check Has shield ; Check if not Hacked
                                    if(shield && !hacked){
                                        this.passiveCalc(element);
                                        element.status.shield = false;
                                    } else{
                                        element.status.dead = true;
                                        element.status.recentlyDead = true;
                                    }
                                }
                                // Night King Targets
                                if(defenderAbility.reviver && element.id == defenderID){
                                    this.finalPlayers.forEach(element => {
                                        if(element.status.revived){
                                            element.status.dead = true;
                                            element.status.recentlyDead = true;
                                        }
                                    });
                                }
                                // Bomb Targets | Passive
                                if(defenderAbility.detonator && element.id == defenderID){
                                    this.passiveCalc(element);
                                }
                                // Cupid Targets | Status
                                if(linked && !element.status.healed && element.id == defenderID){
                                    element.status.dead = true;
                                    element.status.recentlyDead = true;
                                    this.finalPlayers.forEach(element => {
                                        if(element.status.linked){
                                            element.status.dead = true;
                                            element.status.recentlyDead = true;
                                        }
                                    });
                                }
                            }
                            
                        }
                        // Ruspy Targets ; Check not damageReturned
                        if(attacker.silencer && !damageReturned || attacker.silencer && damageReturned && hacked){
                            if(element.player == this.log.target){
                                element.status.silenced = true;
                                element.status.recentlySilenced = true;
                            }
                        }
                        // Doctor Targets ; Check not damageReturned
                        if(attacker.healer && !damageReturned || attacker.healer && damageReturned && hacked){
                            if(element.player == this.log.target){
                                element.status.healed = true;
                            }
                        }
                    });
                    this.nextAction(3000,500);
                }
            }
        },
        // Get Action Target Info
        findTarget(target){
            this.finalPlayers.forEach(element => {
                if(element.player == target){
                    this.info.targetInfo = element;
                    this.info.targetRole = element.name;
                    this.info.targetPassive = element.action.passive;
                    this.info.targetMafia = element.mafia;
                    this.info.targetIcon = element.icon;
                    this.info.targetID = element.id;
                    this.info.status = element.status;
                    this.info.damageReturned = element.status.damageReturned;
                }
            });
            this.info.target = target;
        },
        // Add Action stats for current target
        fireAction(player){
            if(player.actionStatus == false){
                this.info.id = player.id;
                this.info.name2 = player.name;
                this.info.player = player.player;
                this.info.icon2 = player.icon;
                this.info.action = player.action.action;
                this.info.passive = player.action.passive;
                this.info.ability = player.ability;
                this.info.status = player.status;
                this.info.actionIcon = player.actionIcon;
                this.info.mafia = player.mafia;
                this.readyToLog = true;
            }
        },
        // Get Action Image
        getActionImgUrl(pic) {
            return require(`@/assets/images/actions/${pic}`);
        },
        // Get Role Image
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        // Kill Last Phase Target
        killByVote(target){
            this.SelectedRoles.forEach(element => {
                if(target == element.player){
                    element.status.dead = true;
                    this.dashboard.lastPhaseAction = false;
                    // Cupid Targets on Vote Kill
                    if(element.status.linked){
                        this.SelectedRoles.forEach(element => {
                            if(element.status.linked){
                                element.status.dead = true;
                            }
                        });
                    }
                    // Necromancer Targets on Vote Kill
                    if(element.ability.reviver){
                        this.SelectedRoles.forEach(element => {
                            if(element.status.revived){
                                element.status.dead = true;
                            }
                        });
                    }
                }
            });
        },
        // Next Action
        nextAction(time1, time2){
            this.logAction = true;
            setTimeout(() => {
                this.logAction = false;
                this.logActionDone = true;
                setTimeout(() => {
                    this.dashboard.currentAction++;
                    this.logActionDone = false;
                    this.info.target = this.$t("replacingRoles.preTarget.name");
                    this.info.targetRole = "replacingRoles.preTarget.role";
                    this.info.targetID = 0;
                    this.info.targetMafia = null;
                    this.info.targetIcon = "replacingRoles.preTarget.icon";
                    this.log.target = null;
                    this.log.targetRole = "replacingRoles.preTarget.role";
                    this.log.targetPassive = "common.None";
                }, time2);
            }, time1);
        },
        // Calculate Passive and Log to History Log
        passiveCalc(element){
            // Bomb Activate Passive ; Check Detonated ; Check One Time ; Check Not Hacked
            setTimeout(() => {
               if(element.ability.detonator && !element.status.detonated && element.action.oneTime && !element.status.hacked){
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
            // Grandma Activate Passive ; Check Not Hacked
            else if(element.ability.returner && !element.status.hacked && !element.status.revived){
                this.log.target = element.player;
                this.log.passiveLog = true;
                this.log.passive = element.action.passive;
                this.log.passiveIcon = element.icon;
                this.historyLog.push({...this.log});
                this.log.passiveLog = false;
            }
            // Bulletproof Activate Passive ; Check Detonated ; Check One Time ; Check Not Hacked
            else if(element.ability.hasShield && element.status.shield && element.action.oneTime && !element.status.hacked){
                this.log.target = element.player;
                this.log.passiveLog = true;
                this.log.passive = element.action.passive;
                this.log.passiveIcon = element.icon;
                element.status.shield = false;
                element.actionStatus = true;
                element.action.oneTime = false;
                this.historyLog.push({...this.log});
                this.log.passiveLog = false;
            } 
            }, 3500);
        },
        // Reset Game From Start
        resetGame(){
            this.$router.push({name:'home'});
            setTimeout(() => {
                this.$router.go();
            }, 444);
        },
        // Reset Game with Same Roles and Names
        rgwRoles(){
            this.getRoles(this.savedRoles);
            this.setGameReset(true);
            this.$emit('ready', false);
            this.$emit('personNumb', 1);
            this.controlDashboard(this.defaultDashboard);
            this.setStep(1);
        },
        // Set Actions by Priority
        setActionsByPriority(){
            let filteredActions = this.finalPlayers.filter(x => x.status.hasAction && !x.actionStatus);
            let sorted = filteredActions.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
            this.setActions(sorted);
        },
        // Show Information of roles
        showInfo(role){
            this.info.name = role.name;
            this.info.icon = role.icon;
            this.info.description = role.description;
            this.info.mafia = role.mafia;
            this.info.show == false ? this.info.show = true : this.info.show = false;
        },
        // Show $t('god Dashboard
        showPlay(){
            this.dashboard.god = true;
        },
        // Skip Action
        skipAction(){
            this.alertBox = false;
            this.nextAction(0,0);
        }
    },
    components: {
        overlay: Overlay,
        infoBox: InfoBox,
        logEvents: Log,
    },
}

</script>

<style lang="scss" scoped>

    .step-box.display{padding:110px 15px 15px 15px;}

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
                    padding:4px 0;
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
        img{width:35px;}
    }

</style>
