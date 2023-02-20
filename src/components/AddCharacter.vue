<template>
  <div
    class="info-box"
    :class="{
      'active': show
    }"
    @click.self="hideInfo()"
  >
    <a
      href="javascript:void(0)"
      @click="hideInfo()"
    />
    <h2
      class="center-aligned has-top-margin"
    >
      {{ $t('addCharacter.addCharacter') }}
    </h2>
    <p
      class="center-aligned"
    >
      {{ $t('addCharacter.addCharacterDescription') }}
    </p>
    <!-- Select Mafia or Normal Group -->
    <fieldset>
      <legend>
        {{ $t('addCharacter.chooseGroup') }}
      </legend>
      <select
        v-model="selectedGroup"
        name="select-group"
        id="select-group"
      >
        <option
          v-for="(team, index) in availableTeams"
          :value="team"
          :key="index"
        >
          {{ $t(`common.${team.name}`) }}
        </option>
      </select>
    </fieldset>
    <!-- Character name written by user -->
    <fieldset>
      <legend>
        {{ $t('addCharacter.characterName') }}
      </legend>
      <input
        v-model="characterName"
        type="text"
        maxlength="13"
      >
    </fieldset>
    <!-- Choose character icon -->
    <fieldset>
      <div
        class="character-icons"
      >
        <img
          v-for="(icon, index) in icons"
          :src="getImg('/roles', icon)"
          :key="index"
          :class="{
            'active': icon === characterIcon
          }"
          @click="characterIcon = icon"
        >
      </div>
      <legend>
        {{ $t('addCharacter.chooseIcon') }}
      </legend>
    </fieldset>
    <!-- Description -->
    <fieldset>
      <legend>
        {{ $t('addCharacter.description') }}
      </legend>
      <textarea
        v-model="description"
      ></textarea> 
    </fieldset>
    <!-- Choose Ability -->
    <fieldset>
      <legend>
        {{ $t('addCharacter.chooseAbility') }}
      </legend>
      <select
        v-model="selectedAbility"
        name="select-group"
        id="select-group"
      >
        <option
          value="null"
          disabled
        >
          {{ $t('common.NotHave') }}
        </option>
        <option
          v-for="(ability, index) in abilities"
          :value="ability"
          :key="index"
        >
          {{ $t(`ability.${ability.name}`) }}
        </option>
      </select>
    </fieldset>
    <!-- Choose Ability Count -->
    <fieldset
      v-if="selectedAbility"
    >
      <legend>
        {{ $t('addCharacter.chooseAbilityCount') }}
      </legend>
      <select
        v-model="abilityCount"
        name="select-group"
        id="select-group"
      >
        <option
          v-for="number in numberOfAbilites"
          :value="number"
          :key="number"
        >
          {{ number }}
        </option>
      </select>
    </fieldset>
    <!-- Choose Passive -->
    <fieldset>
      <legend>
        {{ $t('addCharacter.choosePassive') }}
      </legend>
      <select
        v-model="selectedPassive"
        name="select-group"
        id="select-group"
      >
        <option
          value="null"
          disabled
        >
          {{ $t('common.NotHave') }}
        </option>
        <option
          v-for="(item, index) in passive"
          :value="item"
          :key="index"
        >
          {{ $t(`passive.${item.name}`) }}
        </option>
      </select>
    </fieldset>
    <BaseButton
      class="submit-btn primary has-top-margin has-bottom-margin"
      @clicked="addCharacter()"
    >
      <span>
        {{ $t('addCharacter.addCharacter') }}
      </span>
    </BaseButton>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedGroup: {
        name: 'mafia',
        mafia: true,
        solo: false
      },
      characterName: '',
      characterIcon: 'coffee.svg',
      description: '',
      selectedAbility: null,
      selectedPassive: null,
      abilityCount: '*',
      power: 20,
      abilities: [
        {
          name: 'kill',
          value: 'killer'
        },
        {
          name: 'heal',
          value: 'healer'
        },
        {
          name: 'silence',
          value: 'silencer'
        },
        {
          name: 'antiSilence',
          value: 'antiSilencer'
        },
        {
          name: 'checkIdentity',
          value: 'identityChecker'
        },
        {
          name: 'revive',
          value: 'reviver'
        },
        {
          name: 'hack',
          value: 'hacker'
        },
        {
          name: 'revenge',
          value: 'revenge'
        }
      ],
      passive: [
        {
          name: 'immortal',
          value: 'immortal'
        },
        {
          name: 'fakeIdentity',
          value: 'fakeIdentity'
        },
        {
          name: 'antiHack',
          value: 'antiHack'
        },
        {
          name: 'bomb',
          value: 'readyToDetonate'
        }
      ],
      numberOfAbilites: ['*', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      availableTeams: [
        {
          name: 'mafia',
          mafia: true,
          solo: false
        },
        {
          name: 'citizen',
          mafia: false,
          solo: false
        },
        {
          name: 'solo',
          mafia: false,
          solo: true
        }
      ],
      icons: ['coffee.svg', 'glasses.svg', 'swords.svg', 'chess.svg', 'deviant.svg', 'pistol.svg', 'weed.svg', 'badge.svg', 'rpg.svg', 'moustache.svg', 'chainsaw.svg', 'umbrella.svg', 'drug.svg', 'gas.svg', 'nail-gun.svg', 'zombie.svg', 'robocop.svg', 'tool.svg', 'blood-knife.svg']
    }
  },
  computed: {
    character () {
      const characterName = this.characterName
      const randomId = Math.floor(Math.random() * 1000000)
      const output = {
        id: randomId,
        slug: characterName,
        mafia: this.selectedGroup.mafia,
        solo: this.selectedGroup.solo,
        rarity: 'mythical',
        vote: 0,
        power: this.power,
        icon: this.characterIcon,
        actionIcon: 'no-sign.svg',
        passiveIcon: 'no-sign.svg',
        selected: false,
        info: {
            en: {
                name: characterName,
                description: this.description,
                passive: '',
                action: '',
            },
            fa: {
                name: characterName,
                description: this.description,
                passive: '',
                action: '',
            }
        },
        ability: {},
        status: {},
        actionLimit: this.abilityCount
      }
      if (this.selectedAbility) {
        output.ability[this.selectedAbility.value] = true
        output.actionIcon = this.selectedAbility.name + '.svg'
        output.info.en.action = this.$t(`ability.${this.selectedAbility.name}`)
        output.info.fa.action = this.$t(`ability.${this.selectedAbility.name}`)
        output.status.hasAction = true
        output.priority = 21
      }
      if (this.selectedPassive) {
        output.status[this.selectedPassive.value] = true
        output.passiveIcon = this.selectedPassive.name + '.svg'
        output.info.en.passive = this.$t(`passive.${this.selectedPassive.name}`)
        output.info.fa.passive = this.$t(`passive.${this.selectedPassive.name}`)
        output.status.hasPassive = true
      }
      return output
    }
  },
  methods: {
    hideInfo () {
      this.$emit('hideInfo')
    },
    addCharacter () {
      if (this.characterName && this.selectedGroup.name) {
        const roles = JSON.parse(JSON.stringify(this.Roles))
        roles.push(this.character)
        this.SetRoles(roles)
          .then(() => {
            this.hideInfo()
            setTimeout(() => {
              const container = document.getElementById('character_' + this.character.id)
              this.$scrollTo(container, 200, {
                offset: -13
              })
              // reset data after add character
              this.characterName = ''
              this.selectedGroup = {}
              this.characterIcon = 'coffee.svg'
            }, 500)
          })
      }
    }
  }
}
</script>
