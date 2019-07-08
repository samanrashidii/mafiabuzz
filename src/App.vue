<template>
  <div id="app">
    <transition-group name="slide" mode="out-in" tag="div">
      <router-view name="external-nav" class="external" key="main-nav"></router-view>
      <router-view key="main-display"></router-view>
      <router-view name="internal-nav" class="internal" key="top-nav"></router-view>
    </transition-group>
  </div>
</template>

<script>
// ! before gameStatus in Creator
// Change Step in store to 1
// Added fucntion call at Created in Dashboard
// Remove Role Samples in store
// Add Dead and Action and Action Status objects to main Database
</script>
