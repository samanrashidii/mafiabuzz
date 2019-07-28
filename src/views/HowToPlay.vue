<template>
    <div class="how-to-play">
        <div class="dashboard-header">
            <div class="title">
                <h2 v-html="HowToPlay.title"></h2>
                <p v-html="HowToPlay.subtitle"></p>
            </div>
        </div>
        <div class="step-box only-box" v-for="(step, index) in HowToPlay.steps" :key="index">
            <img :src="getHTPImgUrl(step.icon)" alt="How to Play Steps Icon" />
            <h3 v-html="step.titl1"></h3>
            <p v-html="step.desc1"></p>
            <div v-if="step.roles">
                <div class="info-box static" v-for="(info, index) in Roles" :key="index">
                    <img :src="getImgUrl(info.icon)" alt="" />
                    <h2>{{info.name}}</h2>
                    <div class="mafia-status">
                        <strong class="mafia-role" v-if="info.mafia">mafia</strong>
                        <strong class="citizen-role" v-else>citizen</strong>
                    </div>
                    <p>{{info.description}}</p>
                </div>
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
            'HowToPlay',
            'Roles',
        ]),
    },
    metaInfo() {
        return {
            title : `Mafioso * How To Play`,
            meta: [
                {
                name : 'description',
                content : `We explained everything you need to know to play Mafioso Party Game`
                },
                {
                name : 'og:title',
                content : `Mafioso * How To Play`
                },
                {
                name : 'og:description',
                content : `We explained everything you need to know to play Mafioso Party Game`
                },
                {
                name : 'og:url',
                content : `http://www.mafiosoapp.com/${this.pageId}/how-to-play`
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