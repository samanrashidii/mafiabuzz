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
        :power="calcPower"
        :mafia="calcDifference(gameSettings.mafia, gameValdiation.selectedMafia)"
        :citizen="calcDifference(gameSettings.citizens, gameValdiation.selectedCitizen)"
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
      fMafias: [],
      fCitizens: [],
      gameSettings: {
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
        selectedCitizen: 0,
      },
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
    calcPower() {
      const $power = {
        average: this.gameSettings.power,
        mafia: this.gameSettings.mafiaPower,
        citizen: this.gameSettings.citizenPower,
      };
      const $mafiaPower = this.gameSettings.mafiaPower;
      const $citizenPower = this.gameSettings.citizenPower;
      this.gameSettings.roles.forEach((element) => {
        $power.average += element.power;
        if (element.mafia) {
          $power.mafia += Math.abs(element.power);
        } else {
          $power.citizen += element.power;
        }
      });
      if ($power.average >= 95) {
        $power.average = 95;
      } else if ($power.average <= -95) {
        $power.average = -95;
      }
      return $power;
    },
    finalMafias() {
      return this.fMafias.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    },
    finalCitizens() {
      return this.fCitizens.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    },
    isValid() {
      this.gameValdiation.selectedMafia = this.gameSettings.roles.filter(x => x.mafia == true).length;
      this.gameValdiation.selectedCitizen = this.gameSettings.roles.filter(x => x.mafia == false).length;
      if (this.gameValdiation.selectedMafia != this.gameSettings.mafia) {
        this.error.mafia = true;
      } else {
        this.error.mafia = false;
      }
      if (this.gameValdiation.selectedCitizen != this.gameSettings.citizens) {
        this.error.citizens = true;
      } else {
        this.error.citizens = false;
      }
      if (this.gameValdiation.selectedMafia == this.gameSettings.mafia && this.gameValdiation.selectedCitizen == this.gameSettings.citizens) {
        return false;
      }
      return true;
    },
  },
  created() {
    if (this.Numbers !== null) {
      this.gameSettings.unit = this.Numbers.unit;
      this.gameSettings.mafia = this.Numbers.mafia;
    }
  },
  methods: {
    ...mapActions([
      'setGame',
      'setNumbers',
      'setSavedRoles',
    ]),
    calcDifference(main, side) {
      return main - side;
    },
    checkGame() {
      this.overlay = true;
      this.fMafias = this.gameSettings.roles.filter(x => x.mafia == true);
      this.fCitizens = this.gameSettings.roles.filter(x => x.mafia == false);
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
