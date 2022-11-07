<template>
  <div
    class="roles"
  >
    <InfoBox
      :role="roleInfo"
      :show="showInfo"
      @hideInfo="hideInfoBox()"
    />
    <ul
      class="has-clear-fix"
    >
      <li
        v-for="(role, index) in getRoles"
        :key="index"
        :class="{
          'mafia': role.mafia,
          'solo': role.solo
        }"
      >
        <input
          @change="checkRoles(role, index)"
          type="checkbox"
          name="roles"
          :id="`role_${index + 1}`"
          :class="{
            'active': role.selected
          }"
          :value="role"
          v-model="gameSettings.selectedRoles"
        >
        <label
          :for="`role_${index + 1}`"
        >
          <div
            class="inner-label"
          >
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
              :alt="role.info[currentLang].name"
            >
            <img
              v-if="role.rarity"
              class="rarity-icon"
              :src="getImg('/icons', role.rarity + '.svg')"
              :alt="$t('rolesInfo.'+role.rarity)"
            >
            <strong>{{ role.info[currentLang].name }} <span
              v-if="checkNumbers(role)"
            >x<i>{{ role.status.mafia ? gameSettings.multipleRoles.normalMafia : gameSettings.multipleRoles.normalCitizen }}</i></span></strong>
          </div>
        </label>
        <CharacterPower
          :mafia="role.mafia"
          :solo="role.solo"
          :power="role.power"
        />
        <transition
          name="scale"
        >
          <div
            v-if="checkNumbers(role)"
            class="number-control"
          >
            <span
              @click="decrNumber(role)"
            >-</span>
            <span
              @click="incrNumber(role)"
            >+</span>
          </div>
        </transition>
        <a
          @click="openInfoBox(role)"
          class="info"
          href="javascript:void(0)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import CharacterPower from '@/components/CharacterPower.vue';
import InfoBox from '@/components/InfoBox.vue';
import sortedRoles from '@/mixins/sortedRoles';

export default {
  mixins: [sortedRoles],
  data() {
    return {
      showInfo: false,
      roleInfo: {}
    }
  },
  components: {
    CharacterPower,
    InfoBox
  },
  computed: {
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
    }
  },
  methods: {
    calcPower () {
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
      })
      if ($powerControl.power >= 95) {
        $powerControl.power = 95
      } else if ($powerControl.power <= -95) {
        $powerControl.power = -95
      }
      this.gameSettings.selectedMafia = this.gameSettings.selectedRoles.filter(element => element.mafia).length
      this.gameSettings.selectedCitizen = this.gameSettings.selectedRoles.filter(element => !element.mafia).length
    },
    checkNumbers (role) {
      if (this.gameSettings.multipleRoles.normalMafia > 0 && role.status.mafia) {
        return true
      } if (this.gameSettings.multipleRoles.normalCitizen > 0 && role.status.citizen) {
        return true
      }
      return false
    },
    checkRoles (role) {
      this.getRoles.forEach((element) => {
        if (element.id == role.id) {
          element.selected == false ? element.selected = true : element.selected = false
        }
      });
      if (role.status.mafia && this.gameSettings.multipleRoles.normalMafia == 0) {
        this.gameSettings.multipleRoles.normalMafia = 1
      } else if (role.status.mafia && this.gameSettings.multipleRoles.normalMafia >= 1) {
        this.gameSettings.multipleRoles.normalMafia = 0
        this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != role.id)
      } else if (role.status.citizen && this.gameSettings.multipleRoles.normalCitizen == 0) {
        this.gameSettings.multipleRoles.normalCitizen = 1
      } else if (role.status.citizen && this.gameSettings.multipleRoles.normalCitizen >= 1) {
        this.gameSettings.multipleRoles.normalCitizen = 0
        this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != role.id)
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    decrNumber (role) {
      const $roles = this.gameSettings.selectedRoles
      if (role.status.mafia) {
        if (this.gameSettings.multipleRoles.normalMafia > 1) {
          for (const el of $roles) {
            if (el.id == role.id) {
              $roles.splice($roles.indexOf(el), 1)
              break
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
              break
            }
          }
        } else {
          this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != role.id)
          this.getRoles.forEach((element) => {
            if (element.id == role.id) {
              element.selected = false
            }
          })
        }
        this.gameSettings.multipleRoles.normalCitizen--
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    incrNumber (role) {
      let targetRole
      if (role.status.mafia) {
        targetRole = JSON.parse(JSON.stringify(role))
        this.gameSettings.selectedRoles.push(targetRole)
        this.gameSettings.multipleRoles.normalMafia++
      } else if (role.status.citizen) {
        targetRole = JSON.parse(JSON.stringify(role))
        this.gameSettings.selectedRoles.push(targetRole)
        this.gameSettings.multipleRoles.normalCitizen++
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    openInfoBox (role) {
      this.roleInfo = role
      this.showInfo = !this.showInfo
    },
    hideInfoBox () {
      this.showInfo = false
    }
  }
}
</script>
