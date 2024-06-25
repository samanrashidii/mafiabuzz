<template>
    <div class="main-container">
        <div class="name-container">
        <div 
            class="player-names" 
            v-for="(item, index) in savedPlayers" 
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
        </ul>
    </div>
</template>



<script>
export default {
    name: 'PlayerCard',
    data () {
        return {
        savedPlayers : JSON.parse(localStorage.getItem('latest-players')),
        activeIndex: null,
        personNumber: 1,
        roleShow: false,
        selectedIndex: -1,
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
            this.roleShow = true;
            this.selectedIndex = index;
        }
    }
}
</script>
