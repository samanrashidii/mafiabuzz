<template>
    <div class="not-found center-aligned">
        <img :src="require(`@/assets/images/error-404.png`)" alt="404 Page Icon" />
        <h2 class="has-top-margin" v-html="Common.page404"></h2>
        <router-link class="bttn has-top-margin" :to="{name: 'home'}">{{Common.homeButton}}</router-link>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters([
            'Common',
        ]),
    },
    metaInfo() {
        return {
            title : `MafiaBuzz * Page Not Found - Error 404`,
            meta: [
                {
                name : 'description',
                content : `Page requested was not found - Error 404`
                },
                {
                name : 'og:title',
                content : `MafiaBuzz * Page Not Found - Error 404`
                },
                {
                name : 'og:description',
                content : `Page requested was not found - Error 404`
                },
                {
                name : 'og:url',
                content : `http://www.mafiabuzz.com/error-404`
                }
            ]
        }
    }
}
</script>

