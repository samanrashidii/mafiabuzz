<template>
    <div class="player">
        <div class="dashboard-header">
            <change-game-mode />
            <page-title :checkMode="checkGameMode()" />
        </div>
    </div>
</template>

<script>
import ChangeGameMode from '@/components/ChangeGameMode.vue';
import PageTitle from '@/components/PageTitle.vue';
import checkGameMode from '@/mixins/checkGameMode';
export default {
    data(){
        return {
            pageId : this.$route.params.id
        }
    },
    components:{
        changeGameMode: ChangeGameMode,
        pageTitle: PageTitle,
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
    mixins: [checkGameMode],
    watch:{
        $route(to, from){
            this.pageId = to.params.id;
        }
    }
}
</script>
