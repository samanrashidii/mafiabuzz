<template>
    <div class="player">
        <div class="dashboard-header">
            <div>
                <router-link class="site-bttn game-mode" :to="{name : 'home'}"><span>{{Player.gameModeButton}}</span></router-link>
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
    data(){
        return {
            pageId : this.$route.params.id
        }
    },
    computed:{
        ...mapGetters([
            'Player',
        ]),
    },
    metaInfo() {
        return {
            title : `MafiaBuzz * Player`,
            meta: [
                {
                name : 'description',
                content : `As player you can join Creator's game by entering it's unique code and play game as a party`
                },
                {
                name : 'og:title',
                content : `MafiaBuzz * Player`
                },
                {
                name : 'og:description',
                content : `As player you can join Creator's game by entering it's unique code and play game as a party`
                },
                {
                name : 'og:url',
                content : `http://www.mafiabuzz.com/${this.pageId}/player`
                }
            ]
        }
    },
    methods:{
        checkGameMode(){
            if(this.$route.params.id == 'single-device'){
                return true;
            }
        },
    },
    watch:{
        $route(to, from){
            this.pageId = to.params.id;
        }
    }
}
</script>

<style lang="scss" scoped>



</style>