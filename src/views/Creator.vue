<template>
    <div class="creator">
        <transition name="slide" mode="out-in">
            <create-game v-if="!gameStatus" />
            <game-dashboard v-else />
        </transition>
    </div>
</template>

<script>
import Create from '@/components/Create.vue';
import Dashboard from '@/components/Dashboard.vue';
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
            pageId : this.$route.params.id
        }
    },
    computed:{
        ...mapGetters([
            'gameStatus',
        ]),
    },
    components:{
        createGame : Create,
        gameDashboard : Dashboard
    },
    metaInfo() {
        return {
            title : `MafiaBuzz * Creator`,
            meta: [
                {
                name : 'description',
                content : `You can setup your game and choose roles as Creator to start a Game`
                },
                {
                name : 'og:title',
                content : `MafiaBuzz * Creator`
                },
                {
                name : 'og:description',
                content : `You can setup your game and choose roles as Creator to start a Game`
                },
                {
                name : 'og:url',
                content : `http://www.mafiabuzz.com/${this.pageId}/creator`
                }
            ]
        }
    },
    watch:{
        $route(to, from){
            this.pageId = to.params.id;
        }
    }
}
</script>
