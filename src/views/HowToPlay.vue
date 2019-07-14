<template>
    <div class="how-to-play">
        <div class="dashboard-header">
            <div class="title">
                <h2 v-html="HowToPlay.title"></h2>
                <p v-html="HowToPlay.subtitle"></p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters([
            'HowToPlay',
        ]),
    }
}
</script>

<style lang="scss" scoped>


</style>