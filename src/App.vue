<template>
  <div id="app">
    <transition-group name="slide" mode="out-in" tag="div">
      <router-view name="external-nav" class="external" key="main-nav"></router-view>
      <router-view key="main-display"></router-view>
      <router-view name="internal-nav" class="internal" key="top-nav"></router-view>
    </transition-group>
  </div>
</template>

<style>

.slide-enter-active{
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active{
  animation: slide-out 200ms ease-out;
}

@keyframes slide-in {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

@keyframes slide-out {
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
}
</style>
