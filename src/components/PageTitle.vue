<template>
  <div class="title">
    <template>
      <div v-if="!dashboardTitle">
        <h2 v-html="$t(`pages.${checkRoute}.title`)" />
        <p v-html="$t(`pages.${checkRoute}.subtitle`)" />
      </div>
      <div v-else>
        <h2 v-html="$t(`pages.${checkRoute}.dashboardTitle`)" />
      </div>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    checkRoute: String,
    dashboardTitle: Boolean,
  },
};
</script>
