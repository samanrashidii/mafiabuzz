<template>
    <div class="player">
        <div class="dashboard-header">
            <div>
                <router-link class="site-bttn game-mode" :to="{name : 'home'}"><span>{{$t('pages.player.gameModeButton')}}</span></router-link>
            </div>
            <div class="title">
                <template v-if="checkGameMode()">
                    <h2 v-html="$t('pages.player.title')"></h2>
                    <p v-html="$t('pages.player.subtitle')"></p>
                </template>
                <!-- Under Construction -->
                <template v-else>
                    <img :src="require(`@/assets/images/under-construction.png`)" alt="Under Construction Icon" />
                    <h2 v-html="$t('common.UnderConstructionTitle')"></h2>
                    <p v-html="$t('common.UnderConstructionText')"></p>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageId : this.$route.params.id
        }
    },
    metaInfo() {
        return {
            title : `${this.$t('general.name')} * ${this.$t('meta.player.title')}`,
            meta: [
                {
                    vmid: 'description',
                    name : 'description',
                    content : `${this.$t('meta.player.description')}`
                },
                {
                    vmid: 'title',
                    name : 'og:title',
                    content : `${this.$t('general.name')} * ${this.$t('meta.player.title')}`
                },
                {
                    vmid: 'ogdescription',
                    name : 'og:description',
                    content : `${this.$t('meta.player.description')}`
                },
                {
                    vmid: 'ogurl',
                    name : 'og:url',
                    content : `${this.$t('general.url')}/${this.pageId}/${this.$t('meta.player.url')}`
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