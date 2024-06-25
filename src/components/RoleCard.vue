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
                v-for="(item, index) in this.gameSettings.selectedRoles" 
                :key="item.id"
             >
                <img
                    v-if="selectedIndex === index"
                    :src="getImg('/roles',item.icon)" alt="sadra" 
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
            <div>
                {{ selectedRolesByPlayers }} 
            </div>
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
  },
    data () {
        return {
        activeIndex: null,
        personNumber: 1,
        roleShow: false,
        selectedIndex: -1,
        selectedRolesByPlayers: [],
        }
    },
    methods: {
        nextPerson() {
            if(this.personNumber == this.gameSettings.selectedRoles.length) {
                this.gameSettings.stepCounter = 3
                this.SetGameSettings(this.gameSettings)
                this.roleShow = false;
                this.selectedIndex = -1;
            }else {
                this.personNumber++;
                
            }
            this.roleShow = false;
            this.selectedIndex = -1;

        },
        selectItem(index) {
            const selectedRoles = this.gameSettings.selectedRoles;
            this.roleShow = true;
            this.selectedIndex = index;
            if(!this.selectedRolesByPlayers.includes(index)) {
                this.selectedRolesByPlayers.push(index);
            } 
            selectedRoles[index].player = this.players[this.personNumber - 1];

        },
        isSelected(){
            if(this.selectedRolesByPlayers.includes(index)){
                this.specificRoleShow = false;
            }else {
                this.specificRoleShow = true;
            }
        }
    }
}
</script>
