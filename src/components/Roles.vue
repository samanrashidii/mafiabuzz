<template>
    <div class="roles">
        <info-box :info="info"></info-box>
        <ul class="has-clear-fix">
            <li v-for="(role, index) in getRoles" :key="index" :class="{'mafia': role.mafia}">
                <input @change="checkRoles(role.id, index), emitRoles()" type="checkbox" name="roles" :id="`role_${index+1}`" :class="{'active': role.selected}" :value="role" v-model="selectedRoles" />
                <label :for="`role_${index+1}`">
                    <div class="inner-label">
                        <img :src="getImgUrl('/roles', $t(role.icon))" :alt="$t(role.alt)" />
                        <strong>{{$t(role.name)}} <span v-if="checkNumbers(role.id)">x<i>{{role.id == 1 ? normalMafia : normalCitizen}}</i></span></strong>
                    </div>
                </label>
                <div class="character-power" :class="{'mafia-pw': role.mafia}"><span :class="{'mafia': role.mafia, 'citizen': !role.mafia}" :style="{width: `${Math.abs(role.power)*2}%`}"><i>{{Math.abs(role.power)}}</i></span></div>
                <transition name="scale">
                    <div class="number-control" v-if="checkNumbers(role.id)">
                        <span @click="decrNumber(role)">-</span>
                        <span @click="incrNumber(role)">+</span>
                    </div>
                </transition>
                <a @click="showInfo(role)" class="info" href="javascript:void(0)"></a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InfoBox from '@/components/InfoBox.vue';
import getImg from '@/mixins/getImg';


export default {
  data() {
    return {
      normalMafia: 0,
      normalCitizen: 0,
      info: {
        show: false,
        mafia: false,
        name: 'replacingRoles.loading.name',
        icon: 'replacingRoles.loading.icon',
        alt: 'replacingRoles.loading.alt',
        description: 'replacingRoles.loading.description',
      },
      selectedRoles: [],
    };
  },
  components: {
    infoBox: InfoBox,
  },
  computed: {
    ...mapGetters([
      'Roles',
      'SelectedRoles',
    ]),
    getRoles() {
      return JSON.parse(JSON.stringify(this.Roles));
    },
  },
  created() {
    this.cacheRoles();
  },
  methods: {
    cacheRoles() {
      if (this.SelectedRoles.length > 0) {
        this.selectedRoles = this.SelectedRoles;
        let normalMafia = 0;
        let normalCitizen = 0;
        this.selectedRoles.forEach((element) => {
          if (element.id == 1) {
            normalMafia++;
          } else if (element.id == 8) {
            normalCitizen++;
          }
        });
        this.normalMafia = normalMafia;
        this.normalCitizen = normalCitizen;
        this.emitRoles();
      }
    },
    checkNumbers(role) {
      if (this.normalMafia > 0 && role == 1) {
        return true;
      } if (this.normalCitizen > 0 && role == 8) {
        return true;
      }
      return false;
    },
    checkRoles(id, index) {
      this.getRoles.forEach((element) => {
        if (element.id == id) {
          element.selected == false ? element.selected = true : element.selected = false;
        }
      });
      if (id == 1 && this.normalMafia == 0) {
        this.normalMafia = 1;
      } else if (id == 1 && this.normalMafia >= 1) {
        this.normalMafia = 0;
        this.selectedRoles = this.selectedRoles.filter(value => value.id != id);
      } else if (id == 8 && this.normalCitizen == 0) {
        this.normalCitizen = 1;
      } else if (id == 8 && this.normalCitizen >= 1) {
        this.normalCitizen = 0;
        this.selectedRoles = this.selectedRoles.filter(value => value.id != id);
      }
    },
    decrNumber(role) {
      const $roles = this.selectedRoles;
      if (role.status.mafia) {
        if (this.normalMafia > 1) {
          for (const el of $roles) {
            if (el.id == role.id) {
              $roles.splice($roles.indexOf(el), 1);
              break;
            }
          }
        } else {
          this.selectedRoles = this.selectedRoles.filter(value => value.id != role.id);
          this.getRoles.forEach((element) => {
            if (element.id == role.id) {
              element.selected = false;
            }
          });
        }
        this.normalMafia--;
      }
      if (role.status.citizen) {
        if (this.normalCitizen > 1) {
          for (const el of $roles) {
            if (el.id == role.id) {
              $roles.splice($roles.indexOf(el), 1);
              break;
            }
          }
        } else {
          this.selectedRoles = this.selectedRoles.filter(value => value.id != role.id);
          this.getRoles.forEach((element) => {
            if (element.id == role.id) {
              element.selected = false;
            }
          });
        }
        this.normalCitizen--;
      }
      this.emitRoles();
    },
    emitRoles() {
      this.$emit('selectedRoles', this.selectedRoles);
    },
    incrNumber(role) {
      let targetRole;
      if (role.id == 1) {
        if (this.normalMafia < 10) {
          this.normalMafia++;
          targetRole = JSON.parse(JSON.stringify(role));
          this.selectedRoles.push(targetRole);
        }
      } else if (role.id == 8) {
        if (this.normalCitizen < 20) {
          this.normalCitizen++;
          targetRole = JSON.parse(JSON.stringify(role));
          this.selectedRoles.push(targetRole);
        }
      }
    },
    showInfo(role) {
      this.info.name = role.name;
      this.info.icon = role.icon;
      this.info.alt = role.alt;
      this.info.description = role.description;
      this.info.mafia = role.mafia;
      this.info.show == false ? this.info.show = true : this.info.show = false;
    },
  },
  mixins: [getImg],
};
</script>

<style lang="scss" scoped>

.roles{
    margin-top:15px;
    li{
        position: relative;
        float: left;
        width:48%;
        margin:4% 0 0 4%;
        &:nth-child(2n+1){
            margin-left:0;
        }
        input{display: none;}
        label{
            display: table;
            width: 100%;
            height: 158px;
            font-family: $font_mafia;
            font-size: $font_size_big;
            color:$color_1;
            text-align: center;
            padding:5px 7px;
            cursor: pointer;
            background-color: $background_color_citizen;
            border:3px solid $black_color;
            border-radius: 7px;
            transition:all .3s ease-in-out;
            > div{
                display: table-cell;
                vertical-align: middle;
                strong{
                    display: block;
                    margin-top:5px;
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        font-family: $font_normal;
                        font-size: $font_size_6;
                        color:$color_1;
                        margin-left: 5px;
                        transition:all .3s ease-in-out;
                        i{font-size: $font_size_8;}
                    }
                }
            }
        }
        &.mafia label{background-color:$background_color_mafia;}
        .number-control span{
            position:absolute;
            bottom:-5px;
            left:-5px;
            display: block;
            width:30px;
            height: 30px;
            line-height: 26px;
            font-family: $font_normal;
            font-size: 24px;
            color:$black_color;
            text-align: center;
            transition:all .2s;
            cursor: pointer;
            background-color: $color_1;
            border-radius: 50%;
            z-index: 99;
            &:active{
                transform: scale(.6,.6);
                border-color:$black_color;
            }
            &:last-child{
                left:auto;
                right:-5px;
            }
        }
        .character-power{
            position: absolute;
            left: 10px;
            bottom: 12px;
            width: calc(100% - 20px);
            transition:all .2s ease-in-out;
            background-color: $background_color_2;
            &.mafia-pw{
                background-color: $background_color_middle;
            }
        }
        input.active ~ .character-power{
            visibility: hidden;
            opacity: 0;
        }
        @media #{$breakpoint_tablet} {
            width:31%;
            margin:3.5% 0 0 3.5% !important;
            &:nth-child(3n+1){
                margin-left:0 !important;
            }
        }
    }
}

</style>
