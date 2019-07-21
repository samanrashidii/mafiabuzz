<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <div class="title">
                <h2 class="has-xsmall-bottom-margin" v-html="Creator.dashboardTitle"></h2>
            </div>
            <div v-if="StepCounter != 3 && !GameReset">
                <app-button @click.native="resetGame()" class="settings-bttn danger"><span>{{Creator.changeSettings}}</span></app-button>
            </div>
            <div v-else-if="StepCounter != 3 && GameReset">
                <app-button @click.native="restartGame()" class="danger"><span>{{Creator.restartGame}}</span></app-button>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div class="step-box has-top-padding" v-if="StepCounter == 1" key="step1">
                <span class="step-number">1</span>
                <a class="predefined" href="javascript:void(0)" :class="{'active': showPredefined}" @click="handlePredefine()">
                    <span>Fill names as defualt</span>
                </a>
                <label for="quantity">{{Creator.chooseNameHint}}</label>
                <template v-for="(roleInput, index) in SelectedRoles">
                    <input type="text" @keyup.enter="$event.target.nextElementSibling.focus();" class="has-xsmall-bottom-margin" :key="index" v-model="players[index]" />
                </template>
                <app-button @click.native="assignRoles()" class="active assign-bttn"><span>{{Creator.assign}}</span></app-button>
            </div>
            <div class="step-box display autoheight" v-if="StepCounter == 2" key="step2">
                <div class="inner-display">
                    <p>{{Creator.passMobile}}</p>
                    <div v-for="(role, index) in gameRoles" :key="index">
                        <div v-if="(index+1) == personNumb">
                            <strong :class="showrole == true ? {'mafia-color': role.mafia == true, 'citizen-color': role.mafia == false} : ''">{{role.player}}</strong>
                            <transition name="fade" mode="out-in">
                                <app-button class="yellow" @click.native="showrole = true" v-if="!showrole" key="showButton">{{Creator.beforeShowButton}}</app-button>
                                <div class="role-info-wrapper" v-else>
                                    <div class="role-info" :class="{'citizen': role.mafia == false}">
                                        <img :src="getImgUrl(role.icon)" :alt="role.alt" />
                                        <h4>{{role.name}}</h4>
                                    </div>
                                    <app-button class="green" @click.native.once="nextPerson()">{{Creator.afterShowButton}}</app-button>
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
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
export default {
  data(){
      return {
            personNumb : 1,
            players : [],
            ready: false,
            showPredefined: false,
            showrole : false,
        }
   },
  computed:{
    ...mapGetters([
        'Creator',
        'SelectedRoles',
        'gameStatus',
        'Numbers',
        'StepCounter',
        'GameReset'
    ]),
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
        if(pL.length == gR.length){
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
        } else{
            this.players = [];
            this.showPredefined = false;
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
        let confirmFinish = confirm("are you sure? Your selected roles and players will reset");
        if(confirmFinish){
            this.$router.push({name:'home'});
            setTimeout(() => {
                this.$router.go();
            }, 250);
        }
    }
  },
  components:{
      god : God,
  }
}
</script>
