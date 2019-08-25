<template>
    <div class="under-construction">
        <img :src="require(`@/assets/images/under-construction.png`)" :alt="$t('common.underConstructionAlt')" />
        <h2 v-html="$t('common.UnderConstructionTitle')"></h2>
        <p v-html="$t('common.UnderConstructionText')"></p>
    </div>
</template>

<script>
export default {
    
}
</script>
