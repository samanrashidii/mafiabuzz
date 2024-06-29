<template>
    <div class="main-container">
        <div class="name-container">
        <div 
            class="player-names" 
            v-for="(item, index) in players" 
            v-bind:key="item"
        >
        <p 
            v-if="(index + 1) === personNumber"
        >
            {{ item }}
        </p>
        </div>
        </div>
        <ul class='player-cards'>
            <li
                class="single-player"
                :class="{'mafia':item.mafia && selectedIndex == index  ,
                         'solo': item.solo && selectedIndex == index ,
                         'citizen': roleShow && !item.solo && !item.mafia && selectedIndex == index 
                }"
                @click="selectItem(index, item.id)"
                v-for="(item, index) in shuffle(localSelectedRoles)" 
                :key="item.id"
             >
             <div
             class="text-image"
            :class="{
            'mafia': item.mafia,
            'solo': item.solo,
            }">
                <img
                    v-if="selectedIndex === index"
                    :src="getImg('/roles', item.icon)" alt="sadra" 
                 >
                    <div
                        v-if="selectedIndex === index"
                    >
                        <strong>{{ item.info[currentLang].name }}</strong>
                    </div>
                <p 
                    v-else
                >
                {{$t('pages.home.showCharacter')}}
                </p>
             </div>
             <p>{{ index }}</p>
            </li>
        </ul>
        <BaseButton class="green" 
                @clicked="nextPerson()"
                v-if="roleShow"
             >
                {{$t('pages.home.passMobile')}}
            </BaseButton>
        
    </div>
</template>



<script>
export default {
    name: 'PlayerCard',
    props: {
    players: {
      type: Array,
      default: () => []
    },
    selectedRoles: {
        type: Array,
        default: () => []
    }
  }, //created & mounted hooks
    data () {
        return {
        activeIndex: null,
        personNumber: 1,
        roleShow: false,
        selectedIndex: -1,
        localSelectedRoles: [],
        random: [],
        }
    },
    mounted() {
        this.localSelectedRoles = [...this.gameSettings.selectedRoles]
    },
    methods: {
        nextPerson() {
            if(this.personNumber == this.gameSettings.selectedRoles.length || this.localSelectedRoles.length == 0) {
                this.gameSettings.stepCounter = 3 //last step - 1
                this.SetGameSettings(this.gameSettings) //last step 
            }else {
                this.personNumber++   
                this.localSelectedRoles.splice(this.selectedIndex, 1)  
            }
            this.roleShow = false
            this.selectedIndex = -1
        },
        selectItem (index, id) {
            if (this.selectedIndex == -1) {
                this.roleShow = true
                this.selectedIndex = index
                const selectedRole = this.gameSettings.selectedRoles.find(role => role.id === id) 
                if(selectedRole) {
                    selectedRole.player = this.players[this.personNumber - 1]
                }
            }   
        },
    },
}
</script>
