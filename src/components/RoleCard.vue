<template>
    <div class="">
        <div class="player-names" v-for="item in savedPlayers" v-bind:key="item">
            <p>{{ item }}</p>
        </div>
        <div class="grid-container"  v-for="item in selectedRoles" v-bind:key="item.id">
            <div class="role-card"><p>{{ item.info.en.name }}</p></div>
            <button @clicked="() => action(item)">Delete</button>
        </div>
        <button @clicked="() => action(item)">Delete</button>

    </div>
</template>



<script>
export default {
    name: 'PlayerCard',
    props: {
        
    },
    data() {
        return {
        savedPlayers : JSON.parse(localStorage.getItem('latest-players')),
        selectedRoles : this.gameSettings.selectedRoles,
        }
    },
    components: {

    },
    methods: {
        action(object) {
            const index = this.selectedRoles.findIndex(item => item.id == object.id);
            this.selectedRoles.splice(index, 1);
        }
    }
}
</script>
