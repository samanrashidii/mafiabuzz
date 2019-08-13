<template>
    <div class="create">
        <div class="dashboard-header">
            <change-game-mode />
            <welcome-box />
            <page-title :checkMode="checkGameMode()" />
        </div>
        <template v-if="checkGameMode().status">
            <div class="steps">
                <step-box 
                    :value="gameSettings.maxPlayers" 
                    :margin="gameSettings.playerMargin"
                    :default="gameSettings.unit"
                    @selectVal="gameSettings.unit = $event"
                />
                <step-box 
                    :value="calcMafia"
                    :margin="0"
                    :default="gameSettings.mafia"
                    @selectVal="gameSettings.mafia = $event"
                />
            </div>
            <roles @selectedRoles="gameSettings.roles = $event"></roles>
            <app-button @click.native="checkGame()" class="active start-bttn"><span>{{$t('pages.creator.start')}}</span></app-button>
            <overlay :class="{'active': overlay,'dialog': isValid}">
                <template v-if="isValid">
                    <error-box
                        :errorStatus="error"
                        :mafiaNumbers="gameSettings.mafia"
                        :citizenNumbers="gameSettings.citizens"
                    />
                    <app-button @click.native="overlay = false" class="settings-bttn danger"><span>{{$t('pages.creator.changeSettings')}}</span></app-button>
                </template>
                <template v-else>
                    <note-box />
                    <app-table class="mafia-table" :tableData="finalMafias" />
                    <app-table class="citizen-table" :tableData="finalCitizens" />
                    <app-button @click.native="startGame()" class="start-bttn green "><span>{{$t('pages.creator.start')}}</span></app-button>
                    <app-button @click.native="overlay = false" class="settings-bttn danger"><span>{{$t('pages.creator.changeSettings')}}</span></app-button>
                </template>
            </overlay>
            <power-meter :power="calcPower" :mafia="calcDifference(gameSettings.mafia, gameValdiation.selectedMafia)" :citizen="calcDifference(gameSettings.citizens, gameValdiation.selectedCitizen)" :class="{'active': !isValid}"></power-meter>
        </template>
    </div>
</template>

<script>
import checkGameMode from '@/mixins/checkGameMode';
import ChangeGameMode from '@/components/ChangeGameMode.vue';
import ErrorBox from '@/components/ErrorBox.vue';
import NoteBox from '@/components/NoteBox.vue';
import Overlay from '@/components/Overlay.vue';
import PageTitle from '@/components/PageTitle.vue';
import PowerMeter from '@/components/PowerMeter.vue';
import Roles from '@/components/Roles.vue';
import StepBox from '@/components/StepBox.vue';
import Table from '@/components/Table.vue';
import WelcomeBox from '@/components/WelcomeBox.vue';
import {mapGetters, mapActions} from 'vuex';
export default {
    data(){
        return {
            error:{
                mafia: false,
                citizens: false
            },
            fMafias: [],
            fCitizens: [],
            gameSettings: {
                maxPlayers: 25,
                playerMargin: 5,
                unit: 6,
                mafia: 2,
                citizens: 4,
                roles: [],
                power: 0,
                mafiaPower: 0,
                citizenPower: 0,
            },
            gameValdiation: {
                selectedMafia: 0,
                selectedCitizen: 0
            },
            overlay: false,
        }
    },
    components:{
        changeGameMode: ChangeGameMode,
        errorBox: ErrorBox,
        noteBox: NoteBox,
        overlay: Overlay,
        pageTitle: PageTitle,
        powerMeter: PowerMeter,
        roles: Roles,
        stepBox: StepBox,
        appTable: Table,
        welcomeBox: WelcomeBox,
    },
    computed:{
        ...mapGetters([
            'Numbers',
        ]),
        calcMafia(){
            let mafiaNumbers = Math.floor(this.gameSettings.unit / 2) -1;
            this.gameSettings.citizens = this.gameSettings.unit - this.gameSettings.mafia;
            return mafiaNumbers;
        },
        calcPower(){
            let $power = {
                average: this.gameSettings.power,
                mafia: this.gameSettings.mafiaPower,
                citizen: this.gameSettings.citizenPower,
            }
            let $mafiaPower = this.gameSettings.mafiaPower;
            let $citizenPower = this.gameSettings.citizenPower;
            this.gameSettings.roles.forEach(element => {
                $power.average += element.power;
                if(element.mafia){
                    $power.mafia += Math.abs(element.power);
                } else{
                    $power.citizen += element.power;
                }
            });
            if($power.average >= 95){
                $power.average = 95;
            } else if($power.average <= -95){
                $power.average = -95;
            }
            return $power;
        },
        finalMafias(){
            return this.fMafias.sort((a, b) => (a.name > b.name) ? 1 : -1);
        },
        finalCitizens(){
            return this.fCitizens.sort((a, b) =>  (a.name > b.name) ? 1 : -1);
        },
        isValid(){
            this.gameValdiation.selectedMafia = this.gameSettings.roles.filter(x => x.mafia == true).length;
            this.gameValdiation.selectedCitizen = this.gameSettings.roles.filter(x => x.mafia == false).length;
            if(this.gameValdiation.selectedMafia != this.gameSettings.mafia){
                this.error.mafia = true
            } else{
                this.error.mafia = false
            }
            if(this.gameValdiation.selectedCitizen != this.gameSettings.citizens){
                this.error.citizens = true
            } else{
                this.error.citizens = false
            }
            if(this.gameValdiation.selectedMafia == this.gameSettings.mafia && this.gameValdiation.selectedCitizen == this.gameSettings.citizens){
                return false;
            } else{
                return true;
            }
        }
    },
    created(){
        if(this.Numbers !== null){
            this.gameSettings.unit = this.Numbers.unit;
            this.gameSettings.mafia = this.Numbers.mafia;
        }
    },
    methods:{
        ...mapActions([
            'getRoles',
            'setGame',
            'setNumbers',
            'setSavedRoles'
        ]),
        calcDifference(main,side){
            return main - side;
        },
        checkGame(){
            this.overlay = true;
            this.fMafias = this.gameSettings.roles.filter(x => x.mafia == true);
            this.fCitizens = this.gameSettings.roles.filter(x => x.mafia == false);
        },
        startGame(){
            let numb = {
                unit : this.gameSettings.unit,
                mafia : this.gameSettings.mafia,
            }
            let $savedRoles = JSON.parse(JSON.stringify(this.gameSettings.roles));
            this.getRoles(this.gameSettings.roles);
            this.setSavedRoles($savedRoles);
            this.setNumbers(numb);
            this.setGame(true);
        }
    },
    mixins: [checkGameMode]
}
</script>

<style lang="scss" scoped>

        .create{padding-bottom: $meter_height;}
button{background-color:$creator_color;}

</style>


