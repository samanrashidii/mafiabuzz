<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <div class="title">
                <h2><strong>Game</strong> Dash<span>board</span></h2>
            </div>
            <div class="has-clear-fix" v-if="step == 1">
                <a class="dashboard-bttn" href="javascript:void(0)" @click="setGame(false)">Change Role Settings</a>
                <router-link class="dashboard-bttn active" :to="{name : 'home'}">Change Game Mode</router-link>
            </div>
        </div>
        <overlay :class="{'active': overlay}">
            <template>
                <img class="has-bottom-margin" :src="require(`@/assets/images/icons/not-valid.png`)" alt="Not Valid Icon" />
                <ul class="error-bullet">
                    <li>
                        You haven't selected any role, Please go back to "Creator" page and start a new game
                    </li>
                </ul>
                <app-button @click.native="goToPage({name: 'creator'})" class="settings-bttn"><span>Create new game</span></app-button>
            </template>
        </overlay>
        <transition name="fade" mode="out-in">
            <div class="step-box" v-if="step == 1">
                <span class="step-number">1</span>
                <label for="quantity">Please write the name of each person:</label>
                <template v-for="(roleInput, index) in SelectedRoles">
                    <input type="text" @focus="$event.target.select()" class="has-xsmall-bottom-margin" :key="index" v-model="players[index]" />
                </template>
                <app-button @click.native.once="assignRoles()">Assign Roles</app-button>
            </div>
            <div class="step-box display" v-if="step == 2">
                <div class="inner-display">
                    <p>Please pass mobile to</p>
                        <transition-group name="fade" mode="out-in" tag="div">
                        <div v-for="(role, index) in gameRoles" :key="index">
                            <div v-if="(index+1) == personNumb">
                                <strong :class="showrole == true ? {'mafia-color': role.mafia == true, 'citizen-color': role.mafia == false} : ''">{{role.player}}</strong>
                                <transition name="fade" mode="out-in">
                                    <app-button @click.native="showrole = true" v-if="!showrole">Show me my role !</app-button>
                                    <div class="role-info-wrapper" v-if="showrole">
                                        <div class="role-info" :class="{'citizen': role.mafia == false}">
                                            <img :src="getImgUrl(role.icon)" :alt="role.alt" />
                                            <h4>{{role.name}}</h4>
                                        </div>
                                        <app-button @click.native.once="nextPerson()">Ok got it</app-button>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="step-box" v-if="step == 3">
                <div class="center-aligned">
                    <img :src="require(`@/assets/images/icons/game.png`)" alt="Game Icon" />
                    <h3 class="different-colors">Okay<i>.</i><i>.</i><i>.</i> Let the game begin!</h3>
                    <app-button @click.native="showPlay()" v-if="!showPlayers">I'm God! it's fine to show me player's role</app-button>
                    <div class="players-role has-top-margin" v-else>
                        <div class="table mafia-table">
                            <table>
                                <tr v-for="(fM, index) in finalMafias" :key="index">
                                    <td><img :src="getImgUrl(fM.icon)" :alt="fM.alt" /> {{fM.name}}</td>
                                    <td><span class="character-player">{{fM.player}}</span></td>
                                </tr>
                            </table>
                        </div>
                        <div class="table citizen-table">
                            <table>
                                <tr v-for="(fC, index) in finalCitizens" :key="index">
                                    <td><img :src="getImgUrl(fC.icon)" :alt="fC.alt" /> {{fC.name}}</td>
                                    <td><span class="character-player">{{fC.player}}</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
export default {
  data(){
      return {
          players : [],
          step: 1,
          showrole : false,
          personNumb : 1,
          showPlayers : false,
          fMafias: [],
          fCitizens: []
      }
  },
  created(){
    this.SelectedRoles.forEach((element,index) => {
        this.players.push(`Player ${index+1}`);
    })
  },
  computed:{
    ...mapGetters([
        'SelectedRoles',
        'gameStatus',
    ]),
    gameRoles(){
        return [...this.SelectedRoles];
    },
    overlay(){
        if(this.SelectedRoles.length == 0){
            return true;
        }
    },
    finalMafias(){
        return this.fMafias.sort((a, b) => (a.name > b.name) ? 1 : -1);
    },
    finalCitizens(){
        return this.fCitizens.sort((a, b) =>  (a.name > b.name) ? 1 : -1);
    }
  },
  methods:{
    ...mapActions([
        'setGame',
    ]),
    assignRoles(){
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
        this.step = 2;
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
            this.step = 3;
        } else{
            this.personNumb++;
        }
    },
    showPlay(){
        this.showPlayers = true;
        this.fMafias = this.gameRoles.filter(x => x.mafia == true);
        this.fCitizens = this.gameRoles.filter(x => x.mafia == false);
    }
  },
  components:{
      overlay: Overlay,
  }
}
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
