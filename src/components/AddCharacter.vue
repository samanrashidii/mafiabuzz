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
      {{ $t('common.addCharacter') }}
    </h2>
    <p
      class="center-aligned"
    >
      {{ $t('common.addCharacterDescription') }}
    </p>
    <fieldset>
      <legend>
        {{ $t('common.chooseGroup') }}
      </legend>
      <select
        v-model="selectedGroup"
        name="select-group"
        id="select-group"
      >
        <option
          value="null"
          disabled
        >
          {{ $t('common.chooseGroupPlaceholder') }}
        </option>
        <option
          v-for="(team, index) in availableTeams"
          :value="team"
          :key="index"
        >
          {{ $t(`common.${team.name}`) }}
        </option>
      </select>
    </fieldset>
    <fieldset>
      <legend>
        {{ $t('common.characterName') }}
      </legend>
      <input
        v-model="characterName"
        type="text"
        maxlength="13"
      >
    </fieldset>
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
        {{ $t('common.chooseIcon') }}
      </legend>
    </fieldset>
    <BaseButton
      class="submit-btn primary has-top-margin has-bottom-margin"
      @clicked="addCharacter()"
    >
      <span>
        {{ $t('common.addCharacter') }}
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
      characterName: '',
      selectedGroup: {},
      characterIcon: 'coffee.svg',
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
      icons: ['coffee.svg', 'glasses.svg', 'swords.svg', 'chess.svg', 'deviant.svg', 'pistol.svg', 'weed.svg', 'badge.svg', 'rpg.svg', 'moustache.svg', 'chainsaw.svg', 'umbrella.svg', 'pipe.svg', 'drug.svg', 'gas.svg', 'nail-gun.svg', 'zombie.svg', 'robocop.svg', 'tool.svg', 'blood-knife.svg']
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
        rarity: 'legendary',
        vote: 0,
        power: 20,
        icon: this.characterIcon,
        actionIcon: 'no-sign.svg',
        passiveIcon: 'no-sign.svg',
        selected: false,
        info: {
            en: {
                name: characterName,
                description: "",
                passive: "None",
                action: "None"
            },
            fa: {
                name: characterName,
                description: "",
                passive: "ندارد",
                action: "ندارد"
            }
        },
        ability: {},
        status: {}
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
              console.log(container)
              this.$scrollTo(container, 200, {
                offset: -13
              })
            }, 500)
          })
      }
    }
  }
}
</script>
