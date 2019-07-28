<template>
    <div class="about">
        <div class="dashboard-header">
            <div class="title">
                <h2 v-html="About.title"></h2>
                <p v-html="About.subtitle"></p>
            </div>
        </div>
        <div class="creators">
            <ul>
                <li v-for="(creator, index) in About.creators" :key="index">
                    <a :href="creator.url" target="_blank" :class="[creator.classes]">
                        <strong>{{creator.name}}</strong>
                        <span>{{creator.title}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="step-box only-box contact-box">
            <div class="contact">
                <p v-html="About.contactText"></p>
                <a :href="`mailto:${About.contactEmail}`">{{About.contactEmail}}</a>
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
            'About',
        ]),
    },
    metaInfo() {
        return {
            title : `Mafioso * Abous us`,
            meta: [
                {
                name : 'description',
                content : `We are some random gamers who wants to help other gamers to play and enjoy party games`
                },
                {
                name : 'og:title',
                content : `Mafioso * Abous us`
                },
                {
                name : 'og:description',
                content : `We are some random gamers who wants to help other gamers to play and enjoy party games`
                },
                {
                name : 'og:url',
                content : `http://www.mafiosoapp.com/${this.pageId}/about`
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

<style lang="scss" scoped>

   .contact-box{
       text-align: center;
       p:first-child{padding:0 0 15px 0;}
       a{
           display: inline-block;
           font-size: $font_size_8;
           color:$green_color;
           margin:10px 0;
        }
   }

</style>
