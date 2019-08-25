<template>
    <div class="title">
        <template>
            <div v-if="!dashboardTitle">
              <h2 v-html="$t(`pages.${checkRoute}.title`)"></h2>
              <p v-html="$t(`pages.${checkRoute}.subtitle`)"></p>
            </div>
            <div v-else>
              <h2 v-html="$t(`pages.${checkRoute}.dashboardTitle`)"></h2>
            </div>
        </template>
    </div>
</template>

<script>

export default {
  props: {
    checkRoute: String,
    dashboardTitle: Boolean
  },
};
</script>
