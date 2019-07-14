<template>
    <div class="about">
        <div class="dashboard-header">
            <div class="title">
                <h2 v-html="About.title"></h2>
                <p v-html="About.subtitle"></p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters([
            'About',
        ]),
    }
}
</script>

<style lang="scss" scoped>



</style>
