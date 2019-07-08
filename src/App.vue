<template>
  <div id="app">
    <transition-group name="slide" mode="out-in" tag="div">
      <router-view name="external-nav" class="external" key="main-nav"></router-view>
      <router-view key="main-display"></router-view>
      <router-view name="internal-nav" class="internal" key="top-nav"></router-view>
    </transition-group>
  </div>
</template>
