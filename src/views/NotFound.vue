<template>
    <div class="not-found center-aligned">
        <img :src="require(`@/assets/images/error-404.png`)" alt="404 Page Icon" />
        <h2 class="has-top-margin" v-html="$t('common.page404')"></h2>
        <router-link class="bttn has-top-margin" :to="{name: 'home'}">{{$t('common.homeButton')}}</router-link>
    </div>
</template>

<script>
export default {
    metaInfo() {
        return {
            title : `${this.$t('general.name')} * ${this.$t('meta.notfound.title')}`,
            meta: [
                {
                    vmid: 'description',
                    name : 'description',
                    content : `${this.$t('meta.notfound.description')}`
                },
                {
                    vmid: 'ogtitle',
                    name : 'og:title',
                    content : `${this.$t('general.name')} * ${this.$t('meta.notfound.title')}`
                },
                {
                    vmid: 'ogdescription',
                    name : 'og:description',
                    content : `${this.$t('meta.notfound.description')}`
                },
                {
                    vmid: 'ogurl',
                    name : 'og:url',
                    content : `${this.$t('general.url')}/${this.$t('meta.notfound.url')}`
                }
            ]
        }
    }
}
</script>
