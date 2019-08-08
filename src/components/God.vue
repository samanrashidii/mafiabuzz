<template>
    <div>

        <!-- Dashboard Buttons -->

        <div class="button-holder" v-if="dashboard.god">
            <transition name="fade" mode="out-in">
                <app-button :class="{'day':dashboard.day, 'night':!dashboard.day, 'swap-bttn':true}" @click.native="changePhase(dashboard.day)">
                    <span v-if="dashboard.day">{{God.nightText}}</span>
                    <span v-else>{{God.dayText}}</span>
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
                                    <img :src="getImgUrl(God.voteIcon)" alt="Dead Icon" />
                                    <p>{{God.lastPhaseText}}</p>
                                    <select name="action_target" v-model="log.target">
                                        <option :value="null" disabled>{{God.selectPlaceholder}}</option>
                                        <option v-for="(person, index) in checkGroup('none')" :key="index">{{person.player}}</option>
                                    </select>
                                    <app-button @click.native="killByVote(log.target)">{{God.confirmButton}}</app-button>
                                    <app-button class="danger" @click.native="dashboard.lastPhaseAction = false">{{God.skipButton}}</app-button>
                                </template>
                                <!-- Last Phase Action -->
                                <template v-else-if="dashboard.mafiaParty && dashboard.round == 1">
                                    <img :src="getImgUrl(God.mafiaPartyIcon)" alt="Mafia Party Icon" />
                                    <p class="site-color">{{God.mafiaPartyText}}</p>
                                    <ul class="error-bullet type-2">
                                        <li v-for="(mp, index) in God.mafiaPartyException" :key="index" v-html="mp"></li>
                                    </ul>
                                    <app-button class="has-small-top-margin" @click.native="dashboard.mafiaParty = false">{{God.mafiaPartyButton}}</app-button>
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

                        <transition name="fade">
                            <!-- Hacked Target Action -->
                            <div class="action-overlay hacked-overlay" v-if="targetHacked" key="hackedTarget">
                                <div class="table-display">
                                    <div class="table-cell-display">
                                        <img :src="getImgUrl(God.hackedIcon)" alt="Hacked Icon" />
                                        <p><span :class="{'mafia-role': info.mafia, 'citizen-role': !info.mafia}">{{info.name2}}</span> is <span class="hack-color">Hacked</span>...!!! Just wake him up but he is unable to perform an action</p>
                                        <app-button class="purple" @click.native="skipAction()">{{God.skipButton3}}</app-button>
                                    </div>
                                </div>
                            </div>
                            <!-- Dead Target Action -->
                            <div class="action-overlay dead-overlay" v-if="targetDead" key="deadTarget">
                                <div class="table-display">
                                    <div class="table-cell-display">
                                        <img :src="getImgUrl(God.deadIcon)" alt="Dead Icon" />
                                        <p><span :class="{'mafia-role': info.mafia, 'citizen-role': !info.mafia}">{{info.name2}}</span> is <span class="dead-color">Dead</span>...!!! You can just call role to balance the game for remaining players</p>
                                        <app-button class="black" @click.native="skipAction()">{{God.skipButton3}}</app-button>
                                    </div>
                                </div>
                            </div>
                        </transition>

                        <p>Ask <span :class="{'mafia-role': info.mafia, 'citizen-role': !info.mafia}">{{info.name2}}</span> to wake up and tell you the target for <strong>{{info.action}}</strong> ?</p>
                        <div class="player-box-holder has-small-bottom-margin">
                            <div class="player-box">
                                <img :src="getImgUrl(info.icon2)" alt="Character Icon"  />
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
                        <select @change="findTarget(log.target, log.targetID)" name="action_target" v-model="log.target">
                            <option :value="null" disabled>{{God.selectPlaceholder}}</option>
                            <option v-for="(person, index) in checkGroup(info)" :key="index">{{person.player}}</option>
                        </select>
                        <template v-if="info.id == 11 && log.target != null">
                            <label for="action_target_2">{{God.actionHintText2}}</label>
                            <select name="action_target_2" v-model="log.target2">
                                <option :value="null" disabled>{{God.selectPlaceholder}}</option>
                                <option v-for="(person, index) in checkSecondGroup(info)" :key="index">{{person.player}}</option>
                            </select>
                        </template>
                    </div>
                </template>

                <!-- Action Buttons -->
                <app-button @click.native="executeAction(info)">{{God.confirmButton}}</app-button>
                <app-button class="danger" @click.native="alertBox = true">{{God.skipButton}}</app-button>

                <!-- Log Actions During Night -->
                <overlay :class="{'active': logAction, 'log': true, 'done': logActionDone}">
                    <div class="log-action">
                        <img :src="getActionImgUrl(log.actionIcon)" alt="Action Icon" v-if="!log.passiveLog" />
                        <img :src="getImgUrl(log.passiveIcon)" :alt="log.target" v-else />
                        <template v-if="!log.passiveLog && !log.godLog">
                            <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> used
                            " <span class="action-color">{{log.action}}</span> " on 
                            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
                            <!-- Police Check Result (Normal and Invisible) -->
                            <i v-if="log.targetID == 2 && log.action == 'Check Identity' || log.targetID == 5 && log.action == 'Check Identity'"> but result is <span :class="{'citizen-role':log.targetMafia}">Citizen</span> because of " <span :class="{'site-color':true}">{{log.targetPassive}}</span> "</i>
                            <i v-else-if="log.targetID != 2 && log.action == 'Check Identity'"> and result is <span :class="{'mafia-role':log.targetMafia, 'citizen-role':!log.targetMafia}"><span>{{log.targetMafia ? 'Mafia' : 'Citizen'}}</span></span></i>
                            <!-- Chef Check Result -->
                            <i v-if="log.id == 6 && log.action == 'Check Role'"> and result is " <span :class="{'site-color':true}">{{log.targetRole}}</span> "</i>
                            <!-- Cupid Link Result -->
                            <i v-if="log.action == 'Bind'"> and <span :class="{'binded': log.target2 != null}">{{log.target2}}</span></i>
                        </template>
                        <template v-else-if="log.godLog">
                            <span class="creator-color">{{log.attacker}}</span> has 
                            " <span class="action-color">{{log.action}}</span> " 
                            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
                        </template>
                        <template v-else>
                            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia}">{{log.target}}</span>'s passive activated : 
                            <br />
                            " <span :class="{'site-color':true}">{{log.passive}}</span> "
                        </template>
                    </div>
                </overlay>
            </div>
        </transition>

        <!-- Alert Box -->

        <overlay :class="{'active': alertBox,'dialog': true}">
            <img class="has-xsmall-bottom-margin" :src="require(`@/assets/images/icons/warning.png`)" alt="Warning Icon" />
            <template>
                <p>{{God.skipText}}</p>
                <app-button @click.native="skipAction()" class="green"><span>{{God.skipButton2}}</span></app-button>
                <app-button @click.native="alertBox = false" class="danger"><span>{{God.cancelButton}}</span></app-button>
            </template>
        </overlay>

        <!-- Night Log -->

        <overlay :class="{'active': logShow}">
            <div class="log-table" v-if="historyLog.length > 0">
                <table>
                    <tr v-for="(log, index) in historyLog" :key="index">
                        <td>{{index+1}}</td>
                        <td>
                            <img :src="getActionImgUrl(log.actionIcon)" alt="Action Icon" v-if="!log.passiveLog" />
                            <img :src="getImgUrl(log.passiveIcon)" :alt="log.target" v-else />
                        </td>
                        <td>
                            <template v-if="!log.passiveLog && !log.godLog">
                                <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> used
                                " <span class="action-color">{{log.action}}</span> " on 
                                <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
                                <!-- Police Check Result (Normal and Invisible) -->
                                <i v-if="log.targetID == 2 && log.action == 'Check Identity' || log.targetID == 5 && log.action == 'Check Identity'"> but result is <span :class="{'citizen-role':log.targetMafia}">Citizen</span> because of " <span :class="{'site-color':true}">{{log.targetPassive}}</span> "</i>
                                <i v-else-if="log.targetID != 2 && log.action == 'Check Identity'"> and result is <span :class="{'mafia-role':log.targetMafia, 'citizen-role':!log.targetMafia}"><span>{{log.targetMafia ? 'Mafia' : 'Citizen'}}</span></span></i>
                                <!-- Chef Check Result -->
                                <i v-if="log.id == 6 && log.action == 'Check Role'"> and result is " <span :class="{'site-color':true}">{{log.targetRole}}</span> "</i>
                                <!-- Cupid Link Result -->
                                <i v-if="log.action == 'Bind'"> and <span :class="{'binded': log.target2 != null}">{{log.target2}}</span></i>
                            </template>
                            <template v-else-if="log.godLog">
                                <span class="creator-color">{{log.attacker}}</span> has 
                                " <span class="action-color">{{log.action}}</span> " 
                                <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
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
            <div v-else>
                <h2>{{God.noLog}}</h2>
            </div>
            <app-button @click.native="logShow = false" class="active has-small-top-margin"><span>{{God.logCloseButton}}</span></app-button>
        </overlay>

        <!-- Log History -->

        <overlay :class="{'active': logHistory, 'log-history': true}">
            <template v-for="(totLog, index) in totalHistory">
                <div class="log-table" :key="index" v-if="totLog.length > 0">
                    <span class="counter">{{Common.Night}} {{index+1}}</span>
                    <table>
                        <tr v-for="(log, index) in totLog" :key="index">
                            <td>{{index+1}}</td>
                            <td>
                                <img :src="getActionImgUrl(log.actionIcon)" alt="Action Icon" v-if="!log.passiveLog" />
                                <img :src="getImgUrl(log.passiveIcon)" :alt="log.target" v-else />
                            </td>
                            <td>
                                <template v-if="!log.passiveLog && !log.godLog">
                                    <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> used
                                    " <span class="action-color">{{log.action}}</span> " on 
                                    <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
                                    <!-- Police Check Result (Normal and Invisible) -->
                                    <i v-if="log.targetID == 2 && log.action == 'Check Identity' || log.targetID == 5 && log.action == 'Check Identity'"> but result is <span :class="{'citizen-role':log.targetMafia}">Citizen</span> because of " <span :class="{'site-color':true}">{{log.targetPassive}}</span> "</i>
                                    <i v-else-if="log.targetID != 2 && log.action == 'Check Identity'"> and result is <span :class="{'mafia-role':log.targetMafia, 'citizen-role':!log.targetMafia}"><span>{{log.targetMafia ? 'Mafia' : 'Citizen'}}</span></span></i>
                                    <!-- Chef Check Result -->
                                    <i v-if="log.id == 6 && log.action == 'Check Role'"> and result is " <span :class="{'site-color':true}">{{log.targetRole}}</span> "</i>
                                    <!-- Cupid Link Result -->
                                    <i v-if="log.action == 'Bind'"> and <span :class="{'binded': log.target2 != null}">{{log.target2}}</span></i>
                                </template>
                                <template v-else-if="log.godLog">
                                    <span class="creator-color">{{log.attacker}}</span> has 
                                    " <span class="action-color">{{log.action}}</span> " 
                                    <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
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
             </template>
            <div v-if="totalHistory == 0">
                <h2>{{God.noLog}}</h2>
            </div>
            <app-button @click.native="logHistory = false" class="active has-small-top-margin"><span>{{God.logCloseButton}}</span></app-button>
        </overlay>

        <!-- Last Night Log -->

        <overlay :class="{'active': lastNightBox, 'dialog': true, 'last-night': true}">
            <h2>Tell people what happened last night</h2>
            <ul>
                <li v-for="(nL, index) in lastNight" :key="index" v-html="nL"></li>
            </ul>
            <app-button @click.native="lastNightBox = false" class="active"><span>{{God.logCloseButton}}</span></app-button>
        </overlay>

        <!-- Day & Night Dashboard -->

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
                        <div class="players-role">

                            <info-box :info="info"></info-box>

                            <!-- Mafia Table in Dashboard -->

                            <div class="table mafia-table">
                                <table>
                                    <tr>
                                        <th>{{Common.Role}}</th>
                                        <th>{{Common.Player}}</th>
                                        <th v-if="dashboard.day == true">{{Common.Vote}}</th>
                                        <th v-if="dashboard.day == false">{{Common.Status}}</th>
                                        <th v-if="dashboard.day == false">{{Common.Action}}</th>
                                    </tr>
                                    <tr v-for="(fM, index) in finalMafias" :key="index" :class="characterClasses(fM)">
                                        <td>
                                            <a @click="showInfo(fM)" href="javascript:void(0)">
                                                <img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fM.player}}</span></td>
                                        <td class="vote-counter" v-if="dashboard.day == true"><input type="tel" :name="`vote_count_${index}`" placeholder="0" :maxlength="'2'" :tabindex="index+10" /></td>
                                        <td v-if="dashboard.day == false"><a href="javascript:void(0)" @click="deadOrAlive(fM)" :class="{'killer': fM.status.dead == false, 'angel': fM.status.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="disabled" v-if="fM.action.passive == null && fM.action.action == null"></span>
                                            <span class="done-action" v-else-if="fM.action.action == null && fM.action.passive != null && fM.actionStatus == true"></span>
                                            <span @click="showInfo(fM)" class="passive" v-if="fM.action.passive != null && fM.action.action == null"></span>
                                            <span @click="showInfo(fM)" :class="{'pending-action': fM.actionStatus == false && fM.action.action != null, 'done-action': fM.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Citizen Table in Dashboard -->
                            
                            <div class="table citizen-table">
                                <table>
                                    <tr>
                                        <th>{{Common.Role}}</th>
                                        <th>{{Common.Player}}</th>
                                        <th v-if="dashboard.day == true">{{Common.Vote}}</th>
                                        <th v-if="dashboard.day == false">{{Common.Status}}</th>
                                        <th v-if="dashboard.day == false">{{Common.Action}}</th>
                                    </tr>
                                    <tr v-for="(fC, index) in finalCitizens" :key="index" :class="characterClasses(fC)">
                                        <td>
                                            <a @click="showInfo(fC)" href="javascript:void(0)">
                                                <img :src="getImgUrl(fC.icon)" :alt="fC.alt" /> {{fC.name}}
                                            </a>
                                        </td>
                                        <td><span class="character-player">{{fC.player}}</span></td>
                                        <td class="vote-counter" v-if="dashboard.day == true"><input type="tel" :name="`vote_count_${index}`" placeholder="0" :maxlength="'2'" :tabindex="index+20" /></td>
                                        <td v-if="dashboard.day == false"><a href="javascript:void(0)" @click="deadOrAlive(fC)" :class="{'killer': fC.status.dead == false, 'angel':fC.status.dead == true}"></a></td>
                                        <td v-if="dashboard.day == false">
                                            <span class="disabled" v-if="fC.action.passive == null && fC.action.action == null"></span>
                                            <span class="done-action" v-else-if="fC.action.action == null && fC.action.passive != null && fC.actionStatus == true"></span>
                                            <span @click="showInfo(fC)" class="passive" v-else-if="fC.action.passive != null && fC.action.action == null"></span>
                                            <span @click="showInfo(fC)" :class="{'pending-action': fC.actionStatus == false, 'done-action': fC.actionStatus == true}" v-else></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Log Actions in Last Night -->

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
                                                <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> used
                                                " <span class="action-color">{{log.action}}</span> " on 
                                                <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
                                                <!-- Police Check Result (Normal and Invisible) -->
                                                <i v-if="log.targetID == 2 && log.action == 'Check Identity' || log.targetID == 5 && log.action == 'Check Identity'"> but result is <span :class="{'citizen-role':log.targetMafia}">Citizen</span> because of " <span :class="{'site-color':true}">{{log.targetPassive}}</span> "</i>
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

        <!-- Log Buttons -->

        <div class="log-bttn" v-if="!dashboard.day">
            <app-button @click.native="logShow = true" class="awesome"><span>{{God.nightLogButton}} <i>{{historyLog.length}}</i></span></app-button>
        </div>
        <div class="log-bttn" v-else-if="dashboard.god && dashboard.day">
            <app-button @click.native="logHistory = true" class="awesome2"><span>{{God.historyLogButton}} <i>{{totalHistory.length}}</i></span></app-button>
        </div>

        <!-- Dashboard Game Hint -->

        <div class="step-box only-box" v-if="dashboard.god">
            <ul class="dashboard-hint">
                <li v-for="(hint, index) in God.dashboardHint" :key="index">
                    <span :class="hint.name">{{hint.hint}}</span>
                </li>
            </ul>
        </div>

        <!-- Restart or Reset Game -->

        <app-button class="active has-xsmall-bottom-margin" @click.native="overlay = true,  totRestart = false" v-if="dashboard.god">{{God.rgwRoles}}</app-button>
        <app-button class="purple has-bottom-margin" v-if="dashboard.god" @click.native="overlay = true, totRestart = true">{{God.resetGame}}</app-button>

        <overlay :class="{'active': overlay,'dialog': true}">
            <img class="has-xsmall-bottom-margin" :src="require(`@/assets/images/icons/warning.png`)" alt="Warning Icon" />
            <template v-if="!totRestart">
                <p>{{God.resetText}}</p>
                <app-button @click.native="rgwRoles()" class="green "><span>{{God.restartButton}}</span></app-button>
                <app-button @click.native="overlay = false" class="danger"><span>{{God.cancelButton}}</span></app-button>
            </template>
            <template v-else>
                <p>{{God.resetTotalText}}</p>
                <app-button @click.native="resetGame()" class="green "><span>{{God.restartButton}}</span></app-button>
                <app-button @click.native="overlay = false" class="danger"><span>{{God.cancelButton}}</span></app-button>
            </template>
        </overlay>
        
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
            alertBox: false,
            logShow: false,
            logAction: false,
            logHistory: false,
            logActionDone: false,
            lastNightBox: false,
            totRestart: false,
            targetHacked: false,
            targetDead: false,
            defaultTime: 0,
            killer: false,
            multipleMafia: false,
            confirmAction: false,
            info: {
                id: 0,
                show: false,
                player: "Loading",
                linked: false,
                healed: false,
                shield: false,
                hacked: false,
                damageReturned: false,
                action: "Loading Action",
                passive: "Passive",
                name2: "Default",
                icon: "loader.svg",
                icon2: "loader.svg",
                description: "...",
                actionIcon: "loader.svg",
                mafia: false,
                target: 'Person ?',
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
            'Common',
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
                    godLog: false,
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
        log(){
            return this.Dashboard.log;
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
            if(phase == false){
                this.dashboard.day = true;
                this.finalPlayers.forEach(element => {
                    // Reset One Night Actions
                    element.status.roleChecked = false;
                    element.status.identityChecked = false;
                    element.status.hacked = false;
                    // One Time Actions of Yakuza - Bomb - Cupid - Bulletproof
                    if(element.id == 7 || element.id == 11 || element.id == 12 || element.id == 14){
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
                        if(element.player == item.target && element.status.recentlyDead == true || element.player == item.target2 && element.status.recentlyDead == true){
                            let logNote = `<span class='hint-color'>${element.player}</span> has been killed !!!`;
                            element.status.recentlyDead = false;
                            this.lastNight.push(logNote);
                        }
                        if(element.player == item.target && element.status.recentlySilenced == true){
                            let logNote = `<span class='site-color'>${element.player}</span> has been silenced !!!`;
                            element.status.recentlySilenced = false;
                            this.lastNight.push(logNote);
                        }
                        // if(element.player == item.target && element.status.dead == true && !element.status.healed && element.status.detonated){
                        //     let deadNote = `${element.player} has got killed last night and detonated!!! The ${element.player}'s siblings will die as well`;
                        //     this.lastNight.push(deadNote);
                        // }
                    });
                });
                if(this.lastNight.length > 0){
                    this.lastNightBox = true;
                }
            } else{
                this.dayTime = this.defaultTime;
                this.lastPhaseAction = true;
                this.finalPlayers.forEach(element => {
                    // Reset One Night Actions
                    element.status.silenced = false;
                    element.status.healed = false;
                });
                if(this.dashboard.round >= 1){
                    this.historyLog = [];
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
                'ninja': char.status.stolen == true,
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
        // Second Select Options for Action
        checkSecondGroup(player){
            // Cupid Target
            if(player.id == 11){
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
                return true;
            } else{
                return false;
            }
        },
        chooseKiller(){
            let mafiaNumbers = this.SelectedRoles.filter(item => item.id == 1);
            this.SelectedRoles.forEach(element => {
                if(element.id == 2){
                    this.killer = true;
                }
                if(element.id == 1 && this.killer){
                    element.action.action = null;
                }
                if(element.id == 1 && mafiaNumbers.length > 1){
                    element.action.action = null;
                    this.multipleMafia = true;
                }
            });
            for (let i = 0; i < this.SelectedRoles.length; i++) {
                if(this.SelectedRoles[i].id == 1 && this.multipleMafia){
                    this.SelectedRoles[i].action.action = 'Kill';
                    break;
                }
            }
        },
        // Kill or Heal Character Manually
        deadOrAlive(player){
            this.log.attacker = this.God.name;
            this.log.target = player.player;
            this.log.targetMafia = player.mafia;
            this.log.godLog = true;
            // Check Alive People and People Don't Have Heal Buff = Kill them with filters
            if(!player.status.healed){
                if(player.status.dead == false){
                    // Log God when kills
                    this.log.action = this.God.killAction;
                    this.log.actionIcon = this.God.killIcon;
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
                    if(player.id == 12){
                        this.finalPlayers.forEach(element => {
                            if(element.player == player.player){
                                element.status.dead = true;
                                element.status.recentlyDead = true;
                                this.passiveCalc(element);
                            }
                        });
                    }
                    // Bulletproof Targets
                    if(player.id == 14){
                        this.finalPlayers.forEach(element => {
                            if(element.player == player.player){
                                element.status.dead = true;
                                element.status.shield = false;
                                element.status.recentlyDead = true;
                            }
                        });
                    }
                    // Necromancer Targets
                    if(player.id == 15){
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
                    // Log God when revive
                    this.log.action = this.God.reviveAction;
                    this.log.actionIcon = this.God.reviveIcon;
                    
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
                this.historyLog.push({...this.log});
                this.log.godLog = false;
            }
        },
        // Do Action
        executeAction(targetInfo){
            let attacker = targetInfo.id;
            let defender = targetInfo.targetID;
            let linked = targetInfo.linked;
            let healed = targetInfo.healed;
            let shield = targetInfo.shield;
            let hacked = targetInfo.hacked;
            let damageReturned = targetInfo.damageReturned;
            
            if(this.log.target != null ){
                if(!(attacker == 11 && this.log.target2 == null)){
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
                    
                    setTimeout(() => {
                        this.historyLog.push({...this.log});  
                    }, 3450);

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
                            // Grandma Attacker Check if not Hacked ; Attacker not being Cupid or Hacker or Necromancer ; 
                            if(attacker != 11 && attacker != 15 && attacker != 16 && defender == 13 && element.id == attacker && !hacked){
                                element.status.dead = true;
                            }
                        }
                        // Yakuza Target ; Check if damageReturned ; Check if Hacked
                        if(attacker == 7 && element.player == this.log.target && !damageReturned || attacker == 7 && element.player == this.log.target && damageReturned && hacked){
                            element.status.stolen = true;
                            element.status.damageReturned = false;
                            element.status.shield = false;
                            element.name = this.ReplacingRole.miniYakuza.name;
                            element.icon = this.ReplacingRole.miniYakuza.icon;
                            element.description = this.ReplacingRole.miniYakuza.description;
                            element.actionStatus = false;
                            element.action.action = null;
                            element.action.passive = null;
                            element.action.secondaryAction = null;
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
                        // Necromancer
                        if(attacker == 15 && element.id == defender){
                            // Revive Cupid Targets
                            if(element.status.linked && element.status.dead){
                                element.status.linked = false;
                            }
                            // Revive
                            element.name = this.ReplacingRole.skeleton.name;
                            element.icon = this.ReplacingRole.skeleton.icon;
                            element.description = this.ReplacingRole.skeleton.description;
                            element.actionStatus = false;
                            element.action.action = null;
                            element.action.passive = null;
                            element.action.secondaryAction = null;
                            element.status.invisible = false;
                            element.status.dead = false;
                            element.status.revived = true;
                        }
                        // Police
                        if(attacker == 9 && element.id == defender){
                            element.status.identityChecked = true;
                        }
                        // Chef
                        if(attacker == 6 && element.id == defender){
                            element.status.roleChecked = true;
                        }
                        // Hacker Target
                        if(attacker == 16 && element.id == defender){
                            element.status.hacked = true;
                        }
                        // Grandma Being Target Check if not Hacked ; Attacker not being Cupid or Hacker ; 
                        if(defender == 13 && element.id == defender){
                            this.passiveCalc(element);
                        }
                        // Godfather and Mafia Targets -- Kill if not Healed
                        if(attacker == 2 && !healed || attacker == 1 && !healed){
                            // Check not damageReturned
                            if(!damageReturned || damageReturned && hacked){
                                if(element.player == this.log.target){
                                    // Bulletproof; Check Has shield ; Check if not Hacked
                                    if(shield && !hacked){
                                        this.passiveCalc(element);
                                    } else{
                                        element.status.dead = true;
                                        element.status.recentlyDead = true;
                                        element.status.shield = false;
                                        element.actionStatus = true;
                                    }
                                }
                                // Bomb Targets | Passive
                                if(element.id == defender){
                                    this.passiveCalc(element);
                                }
                                // Cupid Targets | Status
                                if(linked && element.status.linked && !element.status.healed){
                                    element.status.dead = true;
                                    element.status.recentlyDead = true;
                                }
                            }
                            
                        }
                        // Ruspy Targets ; Check not damageReturned
                        if(attacker == 3 && !damageReturned || attacker == 3 && damageReturned && hacked){
                            if(element.player == this.log.target){
                                element.status.silenced = true;
                                element.status.recentlySilenced = true;
                            }
                        }
                        // Doctor Targets ; Check not damageReturned
                        if(attacker == 10 && !damageReturned || attacker == 10 && damageReturned && hacked){
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
                    this.info.targetRole = element.name;
                    this.info.targetPassive = element.action.passive;
                    this.info.targetMafia = element.mafia;
                    this.info.targetIcon = element.icon;
                    this.info.targetID = element.id;
                    this.info.linked = element.status.linked;
                    this.info.healed = element.status.healed;
                    this.info.shield = element.status.shield;
                    this.info.hacked = element.status.hacked;
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
                this.info.actionIcon = player.actionIcon;
                this.info.mafia = player.mafia;
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
                    this.info.target = 'Player?';
                    this.info.targetRole = 'Default';
                    this.info.targetID = 0;
                    this.info.targetMafia = null;
                    this.info.targetIcon = 'default.png';
                    this.log.target = null;
                    this.log.targetRole = null;
                    this.log.targetPassive = null;
                }, time2);
            }, time1);
        },
        // Calculate Passive and Log to History Log
        passiveCalc(element){
            // Bomb Activate Passive ; Check Detonated ; Check One Time ; Check Not Hacked
            setTimeout(() => {
               if(element.id == 12 && !element.status.detonated && element.action.oneTime && !element.status.hacked){
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
            else if(element.id == 13 && !element.status.hacked && !element.status.revived){
                this.log.target = element.player;
                this.log.passiveLog = true;
                this.log.passive = element.action.passive;
                this.log.passiveIcon = element.icon;
                this.historyLog.push({...this.log});
                this.log.passiveLog = false;
            }
            // Bulletproof Activate Passive ; Check Detonated ; Check One Time ; Check Not Hacked
            else if(element.id == 14 && element.status.shield && element.action.oneTime && !element.status.hacked){
                element.status.shield = false;
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
            let filteredActions = this.finalPlayers.filter(x => x.action.action != null && !x.actionStatus);
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
        // Show God Dashboard
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
        countdown: Countdown,
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

    .action-color{color:$day}

</style>
