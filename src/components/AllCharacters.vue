<template>
  <div
    class="roles all-characters"
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
          v-model="gameSettings.selectedRoles"
          type="checkbox"
          name="roles"
          :id="`role_${index + 1}`"
          :class="{
            'active': role.selected
          }"
          :value="role"
          @change="checkRoles(role, index)"
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
              :title="$t('common.new')"
            >
            <img
              v-if="role.hot"
              class="hot"
              src="@/assets/images/icons/hot.svg"
              :alt="$t('common.hotAlt')"
              :title="$t('common.mostUsed')"
            >
            <img
              :src="getImg('/roles', role.icon)"
              :alt="role.info[currentLang].name"
              :title="role.info[currentLang].name"
            >
            <img
              v-if="role.rarity"
              class="rarity-icon"
              :src="getImg('/icons', role.rarity + '.svg')"
              :alt="$t('rolesInfo.' + role.rarity)"
              :title="$t('rolesInfo.' + role.rarity)"
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

export default {
  name: 'AllCharacters',
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
      roles.forEach((role) => {
        if (role.mafia) {
          sortedRoles.push(role)
        }
      })
      roles.forEach((role) => {
        if (!role.mafia && !role.solo) {
          sortedRoles.push(role)
        }
      })
      roles.forEach((role) => {
        if (!role.mafia && role.solo) {
          sortedRoles.push(role)
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
      this.gameSettings.selectedRoles.forEach((role) => {
        $powerControl.power += role.power
        if (role.mafia) {
          $powerControl.mafiaPower += Math.abs(role.power)
        } else {
          $powerControl.citizenPower += role.power
        }
      })
      if ($powerControl.power >= 95) {
        $powerControl.power = 95
      } else if ($powerControl.power <= -95) {
        $powerControl.power = -95
      }
      this.gameSettings.selectedMafia = this.gameSettings.selectedRoles.filter(role => role.mafia).length
      this.gameSettings.selectedCitizen = this.gameSettings.selectedRoles.filter(role => !role.mafia).length
    },
    checkNumbers (selectedRole) {
      if (this.gameSettings.multipleRoles.normalMafia > 0 && selectedRole.status.mafia) {
        return true
      } if (this.gameSettings.multipleRoles.normalCitizen > 0 && selectedRole.status.citizen) {
        return true
      }
      return false
    },
    checkRoles (selectedRole) {
      this.getRoles.forEach((role) => {
        if (role.id == selectedRole.id) {
          role.selected == false ? role.selected = true : role.selected = false
        }
      })
      if (selectedRole.status.mafia && this.gameSettings.multipleRoles.normalMafia == 0) {
        this.gameSettings.multipleRoles.normalMafia = 1
      } else if (selectedRole.status.mafia && this.gameSettings.multipleRoles.normalMafia >= 1) {
        this.gameSettings.multipleRoles.normalMafia = 0
        this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != selectedRole.id)
      } else if (selectedRole.status.citizen && this.gameSettings.multipleRoles.normalCitizen == 0) {
        this.gameSettings.multipleRoles.normalCitizen = 1
      } else if (selectedRole.status.citizen && this.gameSettings.multipleRoles.normalCitizen >= 1) {
        this.gameSettings.multipleRoles.normalCitizen = 0
        this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != selectedRole.id)
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    decrNumber (selectedRole) {
      const $roles = this.gameSettings.selectedRoles
      if (selectedRole.status.mafia) {
        if (this.gameSettings.multipleRoles.normalMafia > 1) {
          for (const el of $roles) {
            if (el.id == selectedRole.id) {
              $roles.splice($roles.indexOf(el), 1)
              break
            }
          }
        } else {
          this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != selectedRole.id)
          this.getRoles.forEach((role) => {
            if (role.id == selectedRole.id) {
              role.selected = false
            }
          })
        }
        this.gameSettings.multipleRoles.normalMafia--
      }
      if (selectedRole.status.citizen) {
        if (this.gameSettings.multipleRoles.normalCitizen > 1) {
          for (const el of $roles) {
            if (el.id == selectedRole.id) {
              $roles.splice($roles.indexOf(el), 1)
              break
            }
          }
        } else {
          this.gameSettings.selectedRoles = this.gameSettings.selectedRoles.filter(value => value.id != selectedRole.id)
          this.getRoles.forEach((role) => {
            if (role.id == selectedRole.id) {
              role.selected = false
            }
          })
        }
        this.gameSettings.multipleRoles.normalCitizen--
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    incrNumber (selectedRole) {
      let targetRole
      if (selectedRole.status.mafia) {
        targetRole = JSON.parse(JSON.stringify(selectedRole))
        this.gameSettings.selectedRoles.push(targetRole)
        this.gameSettings.multipleRoles.normalMafia++
      } else if (selectedRole.status.citizen) {
        targetRole = JSON.parse(JSON.stringify(selectedRole))
        this.gameSettings.selectedRoles.push(targetRole)
        this.gameSettings.multipleRoles.normalCitizen++
      }
      this.calcPower()
      this.SetRoles(this.getRoles)
      this.SetGameSettings(this.gameSettings)
    },
    openInfoBox (selectedRole) {
      this.roleInfo = selectedRole
      this.showInfo = !this.showInfo
    },
    hideInfoBox () {
      this.showInfo = false
    }
  }
}
</script>
