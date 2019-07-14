<template>
    <div class="player">
        <div class="dashboard-header">
            <div>
                <router-link class="site-bttn game-mode" :to="{name : 'home'}"><span>{{Creator.gameModeButton}}</span></router-link>
            </div>
            <div class="title">
                <template v-if="checkGameMode()">
                    <h2 v-html="Player.title"></h2>
                    <p v-html="Player.subtitle"></p>
                </template>
                <!-- Under Construction -->
                <template v-else>
                    <img :src="require(`@/assets/images/under-construction.png`)" alt="Under Construction Icon" />
                    <h2>We are <span>Sorry</span></h2>
                    <p>This mode is under construction ...!!!</p>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters([
            'Creator',
            'Player',
        ]),
    },
    methods:{
        checkGameMode(){
            if(this.$route.params.id == 'single-device'){
                return true;
            }
        },
    }
}
</script>

<style lang="scss" scoped>



</style>