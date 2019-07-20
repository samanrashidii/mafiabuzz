<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <div class="title">
                <h2 v-html="Creator.dashboardTitle"></h2>
            </div>
            <div class="has-clear-fix" v-if="StepCounter != 3">
                <app-button @click.native="resetGame()" class="settings-bttn danger"><span>{{Creator.changeSettings}}</span></app-button>
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
            <god :finalPlayers="gameRoles" v-if="StepCounter == 3" key="step3"/>
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
          players : [],
          showrole : false,
          personNumb : 1,
          showPredefined: false,
          ready: false,
      }
  },
  computed:{
    ...mapGetters([
        'Creator',
        'SelectedRoles',
        'gameStatus',
        'Numbers',
        'StepCounter'
    ]),
    gameRoles(){
        return [...this.SelectedRoles];
    },
    saveGameRoles(){
        return [...this.SelectedRoles];
    }
  },
  methods:{
    ...mapActions([
        'setGame',
        'setStep',
    ]),
    preDefined(){
        this.SelectedRoles.forEach((element,index) => {
            this.players.push(`Player ${index+1}`);
        });
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
            for (let i = tp.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tp[i], tp[j]] = [tp[j], tp[i]];
                tg[i].player = tp[i];
            }
            for (let i = tg.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tg[i], tg[j]] = [tg[j], tg[i]];
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
    nextPerson(){
        this.showrole = false;
        if(this.personNumb == this.gameRoles.length){
            this.setStep(3);
        } else{
            this.personNumb++;
        }
    },
    resetGame(){
        this.gameRoles = this.saveGameRoles;
        this.setGame(false);
        this.setStep(1);
    }
  },
  components:{
      god : God,
  }
}
</script>
