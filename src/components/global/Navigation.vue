<template>
  <div class="navigation">
    <nav>
      <ul>
        <li><router-link :to="{name: 'creator'}">I'm the Creator</router-link></li>
        <li><router-link :to="{name: 'player'}">I'm a Player</router-link></li>
        <li><router-link :to="{name: 'howtoplay'}">How to play?</router-link></li>
        <li><router-link :to="{name: 'about'}">More about us</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  
};
</script>
