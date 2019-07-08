<template>
    <div class="creator">
        <transition name="slide" mode="out-in" tag="div">
            <create-game v-if="gameStatus" key="createGame" />
            <game-dashboard v-else key="handleGame" />
        </transition>
    </div>
</template>

<script>
import Create from '@/components/Create.vue';
import Dashboard from '@/components/Dashboard.vue';
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters([
            'gameStatus',
        ]),
    },
    components:{
        createGame : Create,
        gameDashboard : Dashboard
    }
}
</script>
