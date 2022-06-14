<template>
  <div class="roles">
    <InfoBox :info="info" />
    <ul class="has-clear-fix">
      <li
        v-for="(role, index) in getRoles"
        :key="index"
        :class="{'mafia': role.mafia, 'solo': role.solo}"
      >
        <input
          @change="checkRoles(role, index)"
          type="checkbox"
          name="roles"
          :id="`role_${index+1}`"
          :class="{'active': role.selected}"
          :value="role"
          v-model="gameSettings.selectedRoles"
        >
        <label
          :for="`role_${index+1}`"
        >
          <div class="inner-label">
            <img
              v-if="role.new"
              class="new-character"
              src="@/assets/images/icons/new.svg"
              :alt="$t('common.newAlt')"
            >
            <img
              v-if="role.hot"
              class="hot"
              src="@/assets/images/icons/hot.svg"
              :alt="$t('common.hotAlt')"
            >
            <img
              :src="getImg('/roles', role.icon)"
              :alt="$t(role.alt)"
            >
            <img
              v-if="role.rarity"
              class="rarity-icon"
              :src="getImg('/icons', role.rarity + '.svg')"
              :alt="$t('rolesInfo.'+role.rarity)"
            >
            <strong>{{ $t(role.name) }} <span
              v-if="checkNumbers(role)"
            >x<i>{{ role.status.mafia ? gameSettings.multipleRoles.normalMafia : gameSettings.multipleRoles.normalCitizen }}</i></span></strong>
          </div>
        </label>
        <CharacterPower
          :mafia="role.mafia"
          :solo="role.solo"
          :power="role.power"
        />
        <transition name="scale">
          <div
            class="number-control"
            v-if="checkNumbers(role)"
          >
            <span @click="decrNumber(role)">-</span>
            <span @click="incrNumber(role)">+</span>
          </div>
        </transition>
        <a
          @click="showInfo(role)"
          class="info"
          href="javascript:void(0)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CharacterPower from '@/components/CharacterPower.vue';
import InfoBox from '@/components/InfoBox.vue';
import sortedRoles from '@/mixins/sortedRoles';

export default {
  mixins: [sortedRoles],
  data() {
    return {
      normalMafia: 0,
      normalCitizen: 0,
      info: {
        show: false,
        mafia: false,
        action: {},
        name: 'replacingRoles.loading.name',
        icon: 'default.png',
        alt: 'replacingRoles.loading.alt',
        description: 'replacingRoles.loading.description',
        status: {},
      },
    };
  },
  components: {
    CharacterPower,
    InfoBox,
  },
  computed: {
    ...mapGetters({
      Roles: 'roles/Roles',
      GameSettings: 'gameStatus/GameSettings',
    }),
    getRoles() {
      const rarityOrder = ['uncommon', 'rare', 'epic', 'legendary']
      let roles = JSON.parse(JSON.stringify(this.Roles))
      roles = roles.sort(function(a, b) {
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
      })
      const sortedRoles = []
      roles.forEach((element) => {
        if (element.mafia) {
          sortedRoles.push(element)
        }
      })
      roles.forEach((element) => {
        if (!element.mafia && !element.solo) {
          sortedRoles.push(element)
        }
      })
      roles.forEach((element) => {
        if (!element.mafia && element.solo) {
          sortedRoles.push(element)
        }
      })
      return sortedRoles
    },
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings))
    },
  },
  methods: {
    ...mapActions({
      SetRoles: 'roles/SetRoles',
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    calcPower() {
      const $powerControl = this.gameSettings.powerControl
      $powerControl.power = 0
      $powerControl.mafiaPower = 0
      $powerControl.citizenPower = 0
      this.gameSettings.selectedRoles.forEach((element) => {
        $powerControl.power += element.power
        if (element.mafia) {
          $powerControl.mafiaPower += Math.abs(element.power)
        } else {
          $powerControl.citizenPower += element.power
        }
      });
      if ($powerControl.power >= 95) {
        $powerControl.power = 95
      } else if ($powerControl.power <= -95) {
        $powerControl.power = -95
      }
      this.gameSettings.selectedMafia = this.gameSettings.selectedRoles.filter(element => element.mafia).length
      this.gameSettings.selectedCitizen = this.gameSettings.selectedRoles.filter(element => !element.mafia).length
    },
    checkNumbers(role) {
      if (this.gameSettings.multipleRoles.normalMafia > 0 && role.status.mafia) {
        return true
      } if (this.gameSettings.multipleRoles.normalCitizen > 0 && role.status.citizen) {
        return true
      }
      return false
    },
    checkRoles(role, index) {
      this.getRoles.forEach((element) => {
        if (element.id == role.id) {
          element.selected == false ? element.selected = true : element.selected = false
        }
      });
      if (role.status.mafia && this.gameSettings.multipleRoles.normalMafia == 0) {
        this.gameSettings.multipleRoles.normalMafia = 1
      } else if (role.status.mafia && this.gameSettings.multipleRoles.normalMafia >= 1) {
        this.gameSettings.multipleRoles.normalMafia = 0
        this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != role.id);
      } else if (role.status.citizen && this.gameSettings.multipleRoles.normalCitizen == 0) {
        this.gameSettings.multipleRoles.normalCitizen = 1
      } else if (role.status.citizen && this.gameSettings.multipleRoles.normalCitizen >= 1) {
        this.gameSettings.multipleRoles.normalCitizen = 0
        this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != role.id);
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    decrNumber(role) {
      const $roles = this.gameSettings.selectedRoles
      if (role.status.mafia) {
        if (this.gameSettings.multipleRoles.normalMafia > 1) {
          for (const el of $roles) {
            if (el.id == role.id) {
              $roles.splice($roles.indexOf(el), 1)
              break;
            }
          }
        } else {
          this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != role.id)
          this.getRoles.forEach((element) => {
            if (element.id == role.id) {
              element.selected = false
            }
          });
        }
        this.gameSettings.multipleRoles.normalMafia--
      }
      if (role.status.citizen) {
        if (this.gameSettings.multipleRoles.normalCitizen > 1) {
          for (const el of $roles) {
            if (el.id == role.id) {
              $roles.splice($roles.indexOf(el), 1)
              break;
            }
          }
        } else {
          this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != role.id)
          this.getRoles.forEach((element) => {
            if (element.id == role.id) {
              element.selected = false
            }
          });
        }
        this.gameSettings.multipleRoles.normalCitizen--
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    incrNumber(role) {
      let targetRole
      if (role.status.mafia) {
        if (this.gameSettings.multipleRoles.normalMafia < this.gameSettings.mafia) {
          this.gameSettings.multipleRoles.normalMafia++
          targetRole = JSON.parse(JSON.stringify(role))
          this.gameSettings.selectedRoles.push(targetRole)
        }
      } else if (role.status.citizen) {
        if (this.gameSettings.multipleRoles.normalCitizen < this.gameSettings.citizen) {
          this.gameSettings.multipleRoles.normalCitizen++
          targetRole = JSON.parse(JSON.stringify(role))
          this.gameSettings.selectedRoles.push(targetRole)
        }
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    showInfo(role) {
      this.info.name = role.name
      this.info.icon = role.icon
      this.info.alt = role.alt
      this.info.description = role.description
      this.info.mafia = role.mafia
      this.info.solo = role.solo
      this.info.rarity = role.rarity
      this.info.action = role.action
      this.info.actionIcon = role.actionIcon
      this.info.passiveIcon = role.passiveIcon
      this.info.status.hasAction = role.status.hasAction
      this.info.status.hasPassive = role.status.hasPassive
      this.info.power = role.power
      this.info.show === false ? this.info.show = true : this.info.show = false
    }
  }
}
</script>
