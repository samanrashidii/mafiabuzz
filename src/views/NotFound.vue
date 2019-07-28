<template>
    <div class="not-found center-aligned">
        <img :src="require(`@/assets/images/error-404.png`)" alt="404 Page Icon" />
        <h2 class="has-top-margin">I think <strong class="mafia-role">Mafia</strong> has destoryed this page <span class="citizen-role">404</span> times !!!</h2>
        <router-link class="bttn has-top-margin" :to="{name: 'home'}">Navigate to Home</router-link>
    </div>
</template>

<script>
export default {
    metaInfo() {
        return {
            title : `Mafioso * Page Not Found - Error 404`,
            meta: [
                {
                name : 'description',
                content : `Page requested was not found - Error 404`
                },
                {
                name : 'og:title',
                content : `Mafioso * Page Not Found - Error 404`
                },
                {
                name : 'og:description',
                content : `Page requested was not found - Error 404`
                },
                {
                name : 'og:url',
                content : `http://www.mafiosoapp.com/error-404`
                }
            ]
        }
    }
}
</script>

