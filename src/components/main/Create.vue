<template>
  <div class="create">
    <div class="dashboard-header">
      <WelcomeBox />
      <PageTitle :check-route="checkRoute()" />
    </div>
    <template>
      <div class="steps">
        <StepBox
          :index="1"
          :value="CreateSettings.maxPlayers"
          :margin="CreateSettings.playerMargin"
          :default="gameSettings.unit"
          @selectVal="gameSettings.unit = $event"
        />
        <StepBox
          :index="2"
          :value="calcMafia"
          :margin="0"
          :default="gameSettings.mafia"
          @selectVal="gameSettings.mafia = $event"
        />
      </div>
      <Roles />
      <AppButton
        @click.native="checkGame()"
        class="active
            start-bttn"
      >
        <span>{{ $t('pages.creator.start') }}</span>
      </AppButton>
      <Overlay :class="{'active': overlay,'dialog': isValid}">
        <template v-if="isValid">
          <ErrorBox
            :error-status="error"
            :mafia-numbers="gameSettings.mafia"
            :citizen-numbers="gameSettings.citizens"
          />
          <AppButton
            @click.native="overlay = false"
            class="settings-bttn
                    danger"
          >
            <span>{{ $t('pages.creator.changeSettings') }}</span>
          </AppButton>
        </template>
        <template v-else>
          <NoteBox />
          <Table
            class="mafia-table"
            :table-data="finalMafias"
          />
          <Table
            class="citizen-table"
            :table-data="finalCitizens"
          />
          <AppButton
            @click.native="startGame()"
            class="start-bttn green
                    "
          >
            <span>{{ $t('pages.creator.start') }}</span>
          </AppButton>
          <AppButton
            @click.native="overlay = false"
            class="settings-bttn
                    danger"
          >
            <span>{{ $t('pages.creator.changeSettings') }}</span>
          </AppButton>
        </template>
      </Overlay>
      <PowerMeter
        :powerControl="gameSettings.powerControl"
        :mafia="calcDifference(gameSettings.mafia, gameSettings.selectedMafia)"
        :citizen="calcDifference(gameSettings.citizens, gameSettings.selectedCitizen)"
        :class="{'active': !isValid}"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ErrorBox from '@/components/ErrorBox.vue';
import NoteBox from '@/components/NoteBox.vue';
import Overlay from '@/components/Overlay.vue';
import PageTitle from '@/components/PageTitle.vue';
import PowerMeter from '@/components/PowerMeter.vue';
import Roles from '@/components/Roles.vue';
import StepBox from '@/components/StepBox.vue';
import Table from '@/components/Table.vue';
import WelcomeBox from '@/components/WelcomeBox.vue';
import checkRoute from '@/mixins/checkRoute';

export default {
  data() {
    return {
      error: {
        mafia: false,
        citizens: false,
      },
      gameSettings: {},
      overlay: false,
    };
  },
  components: {
    ErrorBox,
    NoteBox,
    Overlay,
    PageTitle,
    PowerMeter,
    Roles,
    StepBox,
    Table,
    WelcomeBox,
  },
  computed: {
    ...mapGetters({
      CreateSettings: 'createBoard/CreateSettings',
      GameSettings: 'gameStatus/GameSettings',
    }),
    calcMafia() {
      const mafiaNumbers = Math.floor(this.gameSettings.unit / 2) - 1;
      this.gameSettings.citizens = this.gameSettings.unit - this.gameSettings.mafia;
      return mafiaNumbers;
    },
    finalMafias() {
      return this.gameSettings.fMafias.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    },
    finalCitizens() {
      return this.gameSettings.fCitizens.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    },
    isValid() {
      this.gameSettings.selectedMafia = this.gameSettings.selectedRoles.filter(x => x.mafia == true).length;
      this.gameSettings.selectedCitizen = this.gameSettings.selectedRoles.filter(x => x.mafia == false).length;
      if (this.gameSettings.selectedMafia != this.gameSettings.mafia) {
        this.error.mafia = true;
      } else {
        this.error.mafia = false;
      }
      if (this.gameSettings.selectedCitizen != this.gameSettings.citizens) {
        this.error.citizens = true;
      } else {
        this.error.citizens = false;
      }
      if (this.gameSettings.selectedMafia == this.gameSettings.mafia && this.gameSettings.selectedCitizen == this.gameSettings.citizens) {
        return false;
      }
      return true;
    },
  },
  created(){
    this.gameSettings = JSON.parse(JSON.stringify(this.GameSettings));
  },
  methods: {
    ...mapActions([
      'setGame',
      'setNumbers',
      'setSavedRoles',
    ]),
    calcDifference(a, b) {
      return a - b;
    },
    checkGame() {
      this.overlay = true;
      this.gameSettings.fMafias = this.gameSettings.selectedRoles.filter(x => x.mafia == true);
      this.gameSettings.fCitizens = this.gameSettings.selectedRoles.filter(x => x.mafia == false);
    },
    startGame() {
      const numb = {
        unit: this.gameSettings.unit,
        mafia: this.gameSettings.mafia,
      };
      const $savedRoles = JSON.parse(JSON.stringify(this.gameSettings.roles));
      this.setSavedRoles($savedRoles);
      this.setNumbers(numb);
      this.setGame(true);
    },
  },
  mixins: [checkRoute],
};
</script>

<style lang="scss" scoped>

.create{padding-bottom: $meter_height;}
button{background-color:$creator_color;}

</style>
