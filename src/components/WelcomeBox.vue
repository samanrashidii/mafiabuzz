<template>
    <div class="welcome">
        <img :src="require(`@/assets/images/${$t('pages.creator.welcome.image')}`)" :alt="$t('general.alt')">
        <h3 v-html="$t('pages.creator.welcome.text')"></h3>
    </div>
</template>

<script>
export default {
    
}
</script>