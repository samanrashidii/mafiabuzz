<template>
    <div class="about">
        <div class="dashboard-header">
            <change-game-mode />
            <page-title :checkMode="checkGameMode()" />
        </div>
        <div class="creators">
            <ul>
                <li v-for="(creator, index) in $t('pages.about.creators')" :key="index">
                    <a :href="creator.url" target="_blank" :class="[creator.classes]">
                        <strong>{{creator.name}}</strong>
                        <span>{{creator.title}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="step-box only-box contact-box">
            <div class="contact">
                <p v-html="$t('pages.about.contactText')"></p>
                <a :href="`mailto:${$t('pages.about.contactEmail')}`">{{$t('pages.about.contactEmail')}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import checkGameMode from '@/mixins/checkGameMode';
import ChangeGameMode from '@/components/ChangeGameMode.vue';
import PageTitle from '@/components/PageTitle.vue';
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
            title : `${this.$t('general.name')} * ${this.$t('meta.about.title')}`,
            meta: [
                {
                    vmid: 'description',
                    name : 'description',
                    content : `${this.$t('meta.about.description')}`
                },
                {
                    vmid: 'title',
                    name : 'og:title',
                    content : `${this.$t('general.name')} * ${this.$t('meta.about.title')}`
                },
                {
                    vmid: 'ogdescription',
                    name : 'og:description',
                    content : `${this.$t('meta.about.description')}`
                },
                {
                    vmid: 'ogurl',
                    name : 'og:url',
                    content : `${this.$t('general.url')}/${this.pageId}/${this.$t('meta.about.url')}`
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
