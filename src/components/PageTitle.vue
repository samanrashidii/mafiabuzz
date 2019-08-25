<template>
    <div class="title">
        <template v-if="checkMode.status">
            <h2 v-html="$t(`pages.${checkMode.name}.title`)"></h2>
            <p v-html="$t(`pages.${checkMode.name}.subtitle`)"></p>
        </template>
        <under-construction v-else />
    </div>
</template>

<script>
import UnderConstruction from '@/components/UnderConstruction.vue';

export default {
  components: {
    underConstruction: UnderConstruction,
  },
  props: {
    checkMode: Object,
  },
};
</script>
