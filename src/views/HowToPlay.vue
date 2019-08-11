<template>
    <div class="how-to-play">
        <div class="dashboard-header">
            <div class="title">
                <h2 v-html="$t('pages.howToPlay.title')"></h2>
                <p v-html="$t('pages.howToPlay.subtitle')"></p>
            </div>
        </div>
        <div class="step-box only-box" v-for="(step, index) in $t('pages.howToPlay.steps')" :key="index">
            <img :src="getHTPImgUrl(step.icon)" alt="How to Play Step Icon" />
            <h3 v-html="step.titl1"></h3>
            <p v-html="step.desc1"></p>
            <div v-if="step.roles">
                <div class="info-box static" v-for="(info, index) in $t('roles')" :key="index">
                    <img :src="getImgUrl(info.icon)" alt="" />
                    <h2>{{info.name}}</h2>
                    <div class="mafia-status">
                        <strong class="mafia-role" v-if="info.mafia">{{$t('common.Mafia')}}</strong>
                        <strong class="citizen-role" v-else>{{$t('common.Citizen')}}</strong>
                    </div>
                    <p>{{info.description}}</p>
                </div>
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
            title : `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`,
            meta: [
                {
                    vmid: 'description',
                    name : 'description',
                    content : `${this.$t('meta.howtoplay.description')}`
                },
                {
                    vmid: 'title',
                    name : 'og:title',
                    content : `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`
                },
                {
                    vmid: 'ogdescription',
                    name : 'og:description',
                    content : `${this.$t('meta.howtoplay.description')}`
                },
                {
                    vmid: 'ogurl',
                    name : 'og:url',
                    content : `${this.$t('general.url')}/${this.pageId}/${this.$t('meta.howtoplay.url')}`
                }
            ]
        }
    },
    methods:{
        // Get Role Image
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        // Get How To Play Image
        getHTPImgUrl(pic) {
            return require(`@/assets/images/howtoplay/${pic}`);
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