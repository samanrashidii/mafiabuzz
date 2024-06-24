<template>
    <div class="main-container">
        <div class="player-names" v-for="item in savedPlayers" v-bind:key="item">
            <p>{{ item }}</p>
        </div>
        <ul class='player-cards'>
            <li :class="['single-player', {active: activeIndex === index}]" @click="toggleHidden(index)" v-for="(item, index) in this.gameSettings.selectedRoles" :key="item.id">
                <img src="@/assets/images/roles/cupid.svg" alt="sadra">
                <p>{{ item.info.en.name }}</p>
            </li>
        </ul>
    </div>
</template>



<script>
export default {
    name: 'PlayerCard',
    props: {
        
    },
    data() {
        return {
        savedPlayers : [],
        selectedRoles : [],
        activeIndex: null
        }
    },
    components: {

    },
    methods: {
        toggleHidden(index) {
            this.activeIndex = index;
        }
    }
}
</script>
