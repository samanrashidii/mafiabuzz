<template>
    <div class="about">
        <app-navigation />
        <div class="title">
            <h2><strong>Game</strong> Dash<span>board</span></h2>
            <p>Now let's handle the game ;)</p>
            <overlay :class="{'active': overlay}">
                <template>
                    <img class="has-bottom-margin" :src="require(`@/assets/images/icons/not-valid.png`)" alt="Not Valid Icon" />
                    <ul class="error-bullet">
                        <li>
                            You haven't selected any role, Please go back to "Creator" page and start a new game</i>
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
                        <input type="text" class="has-xsmall-bottom-margin" :key="index" :placeholder="`Player ${index+1}`" v-model="players[index]" />
                    </template>
                    <app-button @click.native.once="assignRoles()">Assign Roles</app-button>
                </div>
                <div class="step-box display" v-if="step == 2">
                    <div class="inner-display">
                        <p>Please pass mobile phone to</p>
                         <transition-group name="fade" mode="out-in" tag="div">
                            <div v-for="(role, index) in gameRoles" :key="index">
                                <div v-if="(index+1) == personNumb">
                                    <strong>{{role.player}}</strong>
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
                        <h3>Okay... Let the game begin!</h3>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import {mapGetters} from 'vuex';
export default {
  data(){
      return {
          players : [],
          step: 1,
          gameRoles : [],
          showrole : false,
          personNumb : 1
      }
  },
  computed:{
    ...mapGetters([
        'SelectedRoles'
    ]),
    overlay(){
        if(this.SelectedRoles.length == 0){
            return true;
        }
    },
  },
  methods:{
    assignRoles(){
        this.gameRoles = this.SelectedRoles;
        for (let i = this.players.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
            this.gameRoles[i].player = this.players[i];
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

.title h2 span{color:$creator_color;}
.title h2 strong{color:$hint_color;}

</style>
