<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <div class="title">
                <h2 class="has-xsmall-bottom-margin" v-html="$t('pages.creator.dashboardTitle')"></h2>
            </div>
            <div v-if="StepCounter != 3 && !GameReset">
                <app-button @click.native="alertBox = true, totRestart = false" class="settings-bttn danger"><span>{{$t('pages.creator.changeSettings')}}</span></app-button>
            </div>
            <div v-else-if="StepCounter != 3 && GameReset">
                <app-button @click.native="alertBox = true, totRestart = true" class="danger"><span>{{$t('pages.creator.restartGame')}}</span></app-button>
            </div>
        </div>
        
        <overlay :class="{'active': alertBox,'dialog': true}">
            <img class="has-xsmall-bottom-margin" :src="require(`@/assets/images/icons/warning.png`)" alt="Warning Icon" />
            <template v-if="!totRestart">
                <p>{{$t('pages.creator.changeSettingsText')}}</p>
                <app-button @click.native="resetGame()" class="green "><span>{{$t('pages.creator.confirmButton')}}</span></app-button>
                <app-button @click.native="alertBox = false" class="danger"><span>{{$t('pages.creator.cancelButton')}}</span></app-button>
            </template>
            <template v-else>
                <p>{{$t('pages.creator.resetTotalText')}}</p>
                <app-button @click.native="restartGame()" class="green "><span>{{$t('pages.creator.restartButton')}}</span></app-button>
                <app-button @click.native="alertBox = false" class="danger"><span>{{$t('pages.creator.cancelButton')}}</span></app-button>
            </template>
        </overlay>

        <transition name="slide" mode="out-in">
            <div class="step-box has-top-padding" v-if="StepCounter == 1" key="step1">
                <a class="predefined type-2" href="javascript:void(0)" v-if="checkLocalStorage" :class="{'active': showSavedNames}" @click="handleSavedNames()">
                    <span>{{$t('pages.creator.lastNames')}}</span>
                </a>
                <a class="predefined" href="javascript:void(0)" v-else :class="{'active': showPredefined}" @click="handlePredefine()">
                    <span>{{$t('pages.creator.defaultNames')}}</span>
                </a>
                <label for="quantity">{{$t('pages.creator.chooseNameHint')}}</label>
                <template v-for="(roleInput, index) in SelectedRoles">
                    <input type="text" @keyup.enter="$event.target.nextElementSibling.focus();" class="has-xsmall-bottom-margin" :key="index" v-model="players[index]" />
                </template>
                <app-button @click.native="assignRoles()" class="active assign-bttn"><span>{{$t('pages.creator.assign')}}</span></app-button>
            </div>
            <div class="step-box display autoheight" v-if="StepCounter == 2" key="step2">
                <div class="inner-display">
                    <p>{{$t('pages.creator.passMobile')}}</p>
                    <div v-for="(role, index) in gameRoles" :key="index">
                        <div v-if="(index+1) == personNumb">
                            <strong :class="showrole == true ? {'mafia-color': role.mafia == true, 'citizen-color': role.mafia == false} : ''">{{role.player}}</strong>
                            <transition name="fade" mode="out-in">
                                <app-button class="yellow" @click.native="showrole = true" v-if="!showrole" key="showButton">{{$t('pages.creator.beforeShowButton')}}</app-button>
                                <div class="role-info-wrapper" v-else>
                                    <div class="role-info" :class="{'citizen': role.mafia == false}">
                                        <img :src="getImgUrl(role.icon)" :alt="role.alt" />
                                        <h4>{{role.name}}</h4>
                                    </div>
                                    <app-button class="green" @click.native.once="nextPerson()">{{$t('pages.creator.afterShowButton')}}</app-button>
                                </div> 
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <god :finalPlayers="gameRoles" @personNumb="personNumb = $event" @ready="ready = $event" v-if="StepCounter == 3" key="step3"/>
        </transition>
    </div>
</template>

<script>
import God from '@/components/God.vue';
import Overlay from '@/components/Overlay.vue';
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
export default {
  data(){
      return {
            personNumb : 1,
            players : [],
            ready: false,
            showPredefined: false,
            showSavedNames: false,
            showrole : false,
            alertBox: false,
            totRestart: false,
        }
   },
  computed:{
    ...mapGetters([
        'SelectedRoles',
        'gameStatus',
        'Numbers',
        'StepCounter',
        'GameReset'
    ]),
    checkLocalStorage(){
        if(localStorage.savedPlayers && localStorage.savedPlayers.length > 0){
            return true;
        } else{
            return false;
        }
    },
    gameRoles(){
        return this.SelectedRoles;
    },
  },
  methods:{
    ...mapActions([
        'setGame',
        'setStep',
    ]),
    assignRoles(){
        let gR = this.gameRoles;
        let pL = this.players;
        let checkPlayersInput = pL.filter(function(item, index){
            return pL.indexOf(item) >= index;
        });
        if(pL.length == gR.length && checkPlayersInput.length == pL.length){
            for (let i = 0; i < pL.length; i++) {
                if(pL[i].length < 1){
                    this.ready = false;
                    break;
                } else{
                    this.ready = true;
                }
            }   
        }

        if(this.ready){
            let tg = this.gameRoles;
            let tp = this.players;
            this.randomFunc(tg);
            for (let i = tg.length - 1; i >= 0; i--) {
                tg[i].player = tp[i];
            }
            this.setStep(2);
        }
        localStorage.savedPlayers = pL;
    },
    getImgUrl(pic) {
        return require(`@/assets/images/roles/${pic}`);
    },
    goToPage(obj){
        this.$router.push(obj);
    },
    handlePredefine(){
        if(this.showPredefined == false){
            this.preDefined();
            this.showPredefined = true;
            this.showSavedNames = false;
        } else{
            this.players = [];
            this.showPredefined = false;
            this.showSavedNames = true;
        }
    },
    handleSavedNames(){
        if(this.showSavedNames == false){
            let $savedPlayers = localStorage.savedPlayers.split(",");
            this.players = $savedPlayers;
            if(this.SelectedRoles.length < this.players.length){
                this.players.length = this.SelectedRoles.length;
            }
            this.showPredefined = false;
            this.showSavedNames = true;
        } else{
            this.players = [];
            this.showPredefined = true;
            this.showSavedNames = false;
        }
    },
    nextPerson(){
        this.showrole = false;
        if(this.personNumb == this.gameRoles.length){
            this.setStep(3);
        } else{
            this.personNumb++;
        }
    },
    preDefined(){
        this.SelectedRoles.forEach((element,index) => {
            this.players.push(`Player ${index+1}`);
        });
    },
    randomFunc(tg){
        tg.forEach(element => {
            for (let i = tg.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tg[i], tg[j]] = [tg[j], tg[i]];
                [tg[j], tg[i]] = [tg[i], tg[j]];
                [tg[i], tg[j]] = [tg[j], tg[i]];
            }
        });
        return tg;
    },
    resetGame(){
        this.setGame(false);
        this.setStep(1);
    },
    restartGame(){
        this.$router.push({name:'home'});
        setTimeout(() => {
            this.$router.go();
        }, 150);
    }
  },
  components:{
      god : God,
      overlay: Overlay,
  }
}
</script>
