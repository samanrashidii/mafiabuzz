<template>
  <div class="create">
    <div class="dashboard-header">
      <WelcomeBox />
      <PageTitle :check-route="checkRoute()" />
    </div>
    <template>
      <div class="steps">
        <StepBox :type="'totalUnit'" />
        <StepBox :type="'totalMafia'" />
      </div>
      <Roles />
      <AppButton @click.native="checkGame()" class="active start-bttn">
        <span>{{ $t('pages.creator.start') }}</span>
      </AppButton>
      <Overlay :class="{'active': overlay,'dialog': isValid}">
        <template v-if="isValid">
          <ErrorBox
            :error-status="error"
            :mafia-numbers="gameSettings.mafia"
            :citizen-numbers="gameSettings.citizen"
          />
          <AppButton @click.native="overlay = false" class="settings-bttn danger">
            <span>{{ $t('pages.creator.changeSettings') }}</span>
          </AppButton>
        </template>
        <template v-else>
          <NoteBox />
          <Table class="mafia-table" :table-data="gameSettings.fMafias" />
          <Table class="citizen-table" :table-data="gameSettings.fCitizens" />
          <AppButton @click.native="startGame()" class="start-bttn green">
            <span>{{ $t('pages.creator.start') }}</span>
          </AppButton>
          <AppButton @click.native="overlay = false" class="settings-bttn danger">
            <span>{{ $t('pages.creator.changeSettings') }}</span>
          </AppButton>
        </template>
      </Overlay>
      <PowerMeter :class="{'active': !isValid}" />
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
    createSettings(){
      return JSON.parse(JSON.stringify(this.CreateSettings));
    },
    gameSettings(){
      return JSON.parse(JSON.stringify(this.GameSettings));
    },
    finalMafias() {
      return this.gameSettings.fMafias.slice().sort((a, b) => ((a.name > b.name) ? 1 : -1));
    },
    finalCitizens() {
      return this.gameSettings.fCitizens.slice().sort((a, b) => ((a.name > b.name) ? 1 : -1));
    },
    isValid() {
      if (this.gameSettings.selectedMafia != this.gameSettings.mafia) {
        this.error.mafia = true;
      } else {
        this.error.mafia = false;
      }
      if (this.gameSettings.selectedCitizen != this.gameSettings.citizen) {
        this.error.citizens = true;
      } else {
        this.error.citizens = false;
      }
      if (this.gameSettings.selectedMafia == this.gameSettings.mafia && this.gameSettings.selectedCitizen == this.gameSettings.citizen) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions({
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    checkGame() {
      this.overlay = true;
      this.gameSettings.fMafias = this.gameSettings.selectedRoles.filter(x => x.mafia == true);
      this.gameSettings.fCitizens = this.gameSettings.selectedRoles.filter(x => x.mafia == false);
    },
    startGame() {
      // Start Engine
    },
  },
  mixins: [checkRoute],
};
</script>

<style lang="scss" scoped>

.create{padding-bottom: $meter_height;}
button{background-color:$creator_color;}

</style>
