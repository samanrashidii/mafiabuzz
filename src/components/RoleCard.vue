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
                @click="selectItem(index)" 
                v-for="(item, index) in localSelectedRoles" 
                :key="item.id"
             >
                <img
                    v-if="selectedIndex === index"
                    :src="getImg('/roles', item.icon)" alt="sadra" 
                 >
                <p
                    v-if="selectedIndex === index"
                >
                    {{ item.info.en.name }}
                </p>
            <p 
                v-else
            >
                Select Role
            </p>
            </li>
            <button 
                @click="nextPerson()"
                v-if="roleShow"
             >
                Next Person
            </button>

        </ul>
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
                this.personNumber++;    
                this.localSelectedRoles.splice(this.selectedIndex, 1);  
            }
            this.roleShow = false;
            this.selectedIndex = -1;
        },
        selectItem (index) {
            const selectedRoles = this.gameSettings.selectedRoles;
            this.roleShow = true
            this.selectedIndex = index
            selectedRoles[index].player = this.players[this.personNumber - 1];  
        },
        

    }
}
</script>
