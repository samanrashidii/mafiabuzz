<template>
    <div class="title">
        <template v-if="checkMode.status">
            <div v-if="!dashboardTitle">
              <h2 v-html="$t(`pages.${checkMode.name}.title`)"></h2>
              <p v-html="$t(`pages.${checkMode.name}.subtitle`)"></p>
            </div>
            <div v-else>
              <h2 v-html="$t(`pages.${checkMode.name}.dashboardTitle`)"></h2>
            </div>
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
    dashboardTitle: Boolean
  },
};
</script>
